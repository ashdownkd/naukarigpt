from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# ---------------------------------------------------------------------------
# Job listings — real CRUD backed by MongoDB
# ---------------------------------------------------------------------------

class JobPost(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    category: str
    title: str
    org: str
    location: str = "All India"
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    lastDate: Optional[datetime] = None
    excerpt: str = ""
    content: str = ""
    applyLink: str = "#"
    applyLinkLabel: str = "Apply Online"
    tags: List[str] = []
    vacancies: int = 0
    eligibility: str = ""
    fee: str = ""
    ageLimit: str = ""
    featured: bool = False

class JobPostCreate(BaseModel):
    slug: str
    category: str
    title: str
    org: str
    location: str = "All India"
    lastDate: Optional[datetime] = None
    excerpt: str = ""
    content: str = ""
    applyLink: str = "#"
    applyLinkLabel: str = "Apply Online"
    tags: List[str] = []
    vacancies: int = 0
    eligibility: str = ""
    fee: str = ""
    ageLimit: str = ""
    featured: bool = False

class JobPostUpdate(BaseModel):
    slug: Optional[str] = None
    category: Optional[str] = None
    title: Optional[str] = None
    org: Optional[str] = None
    location: Optional[str] = None
    lastDate: Optional[datetime] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    applyLink: Optional[str] = None
    applyLinkLabel: Optional[str] = None
    tags: Optional[List[str]] = None
    vacancies: Optional[int] = None
    eligibility: Optional[str] = None
    fee: Optional[str] = None
    ageLimit: Optional[str] = None
    featured: Optional[bool] = None


def _serialize_job(doc: dict) -> dict:
    """Convert stored ISO date strings back to datetime for the response model."""
    for key in ("date", "lastDate"):
        if isinstance(doc.get(key), str):
            doc[key] = datetime.fromisoformat(doc[key])
    return doc


@api_router.post("/jobs", response_model=JobPost)
async def create_job(input: JobPostCreate):
    existing = await db.jobs.find_one({"slug": input.slug}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="A job with this slug already exists")

    job = JobPost(**input.model_dump())
    doc = job.model_dump()
    doc["date"] = doc["date"].isoformat()
    if doc["lastDate"]:
        doc["lastDate"] = doc["lastDate"].isoformat()

    await db.jobs.insert_one(doc)
    return job


@api_router.get("/jobs", response_model=List[JobPost])
async def list_jobs(category: Optional[str] = None, limit: int = 100):
    query = {"category": category} if category else {}
    jobs = await db.jobs.find(query, {"_id": 0}).sort("date", -1).to_list(limit)
    return [_serialize_job(j) for j in jobs]


@api_router.get("/jobs/{job_id}", response_model=JobPost)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return _serialize_job(job)


@api_router.put("/jobs/{job_id}", response_model=JobPost)
async def update_job(job_id: str, input: JobPostUpdate):
    existing = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Job not found")

    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    if "lastDate" in updates and isinstance(updates["lastDate"], datetime):
        updates["lastDate"] = updates["lastDate"].isoformat()

    if updates:
        await db.jobs.update_one({"id": job_id}, {"$set": updates})

    updated = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    return _serialize_job(updated)


@api_router.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    result = await db.jobs.delete_one({"id": job_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"deleted": True, "id": job_id}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
