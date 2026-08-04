from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


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


# ---------------------------------------------------------------------------
# Status check (kept from the original boilerplate — harmless health check)
# ---------------------------------------------------------------------------

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------------------------------------------------------------------------
# Job / post listings — real CRUD backed by MongoDB, matching the site's
# article template exactly (eligibility box, important-dates table, and the
# Overview / How to Apply / Important Note content sections).
# ---------------------------------------------------------------------------

# Same tag -> department mapping used on the frontend, so filters stay consistent
DEPT_MAP = [
    ("ssc", "SSC"), ("upsc", "UPSC"), ("railway", "Railway"), ("banking", "Banking"),
    ("insurance", "Insurance"), ("police", "Police / Defence"), ("defence", "Police / Defence"),
    ("teaching", "Teaching"), ("medical", "Medical"), ("engineering", "Engineering"),
    ("isro", "Science & Research"), ("science", "Science & Research"), ("mba", "Management"),
    ("law", "Law"), ("it", "Private / IT"), ("private", "Private / IT"),
    ("loan", "Finance / Loans"), ("school", "School"),
]

def infer_department(tags: List[str]) -> str:
    for tag, label in DEPT_MAP:
        if tag in tags:
            return label
    return "General"

def infer_qualification(eligibility: str, tags: List[str]) -> str:
    e = (eligibility or "").lower()
    if re.search(r"post\s*graduate|master|m\.?tech|m\.?sc|mba|pg", e) or "pg" in tags:
        return "Post Graduate"
    if re.search(r"10\+2|12th|intermediate|higher secondary|senior secondary", e):
        return "12th Pass"
    if re.search(r"10th|matric|matriculation", e):
        return "10th Pass"
    if re.search(r"diploma|iti", e):
        return "Diploma / ITI"
    if re.search(r"graduate|bachelor|b\.?tech|b\.?sc|b\.?a|b\.?com|degree", e):
        return "Graduate"
    return "Any"

def default_excerpt(org: str, title: str) -> str:
    return (
        f"{org} has officially released the {title} notification. Read eligibility, "
        f"important dates, application fee, selection process and apply online before the last date."
    )

def default_content(org, title, category, location, overview_items, how_to_apply, important_note) -> str:
    items = overview_items or [f"Organization: {org}", f"Location: {location}", f"Category: {category}"]
    items_html = "".join(f"<li>{i}</li>" for i in items)
    how = how_to_apply or (
        "Visit the official portal, register with a valid email & mobile number, fill the "
        "application form, upload documents and pay the application fee before the last date."
    )
    note = important_note or (
        "NaukariGPT provides curated links only. Please verify all details on the official "
        "website before applying."
    )
    return (
        f"<p><strong>{org}</strong> has officially released the notification for <strong>{title}</strong>. "
        f"Interested and eligible candidates can go through the complete notification below and submit "
        f"their online application form before the last date.</p>"
        f"<p>Below are the key highlights of this notification — please read the official PDF carefully "
        f"before submitting your application.</p>"
        f"<h3>Overview</h3><ul>{items_html}</ul>"
        f"<h3>How to Apply</h3><p>{how}</p>"
        f"<h3>Important Note</h3><p>{note}</p>"
    )

def default_important_dates(date: datetime, last_date: datetime) -> List[dict]:
    release = date
    apply_start = date + timedelta(days=1)
    apply_last = last_date
    exam_date = apply_last + timedelta(days=25)
    return [
        {"label": "Notification Release", "value": release.date().isoformat()},
        {"label": "Online Apply Start", "value": apply_start.date().isoformat()},
        {"label": "Online Apply Last Date", "value": apply_last.date().isoformat()},
        {"label": "Exam Date", "value": exam_date.date().isoformat()},
    ]


class ImportantDate(BaseModel):
    label: str
    value: str


class JobPost(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    category: str
    title: str
    org: str
    location: str = "All India"
    state: str = "All India"
    department: str = "General"
    qualification: str = "Any"
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    lastDate: datetime
    excerpt: str = ""
    content: str = ""
    applyLink: str = "https://example.com/apply"
    applyLinkLabel: str = "Apply Online"
    officialLink: str = "https://example.com/notification.pdf"
    tags: List[str] = []
    vacancies: int = 0
    eligibility: str = "Graduate from a recognised university"
    fee: str = "General/OBC: Rs. 100 | SC/ST/PwD: Nil"
    ageLimit: str = "18 – 32 years (age relaxation as per rules)"
    importantDates: List[ImportantDate] = []
    featured: bool = False
    isNew: bool = False


class JobPostCreate(BaseModel):
    slug: str
    category: str
    title: str
    org: str
    location: str = "All India"
    lastDate: Optional[datetime] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    overviewItems: Optional[List[str]] = None
    howToApply: Optional[str] = None
    importantNote: Optional[str] = None
    applyLink: str = "https://example.com/apply"
    applyLinkLabel: str = "Apply Online"
    officialLink: str = "https://example.com/notification.pdf"
    tags: List[str] = []
    vacancies: int = 0
    eligibility: str = "Graduate from a recognised university"
    fee: str = "General/OBC: Rs. 100 | SC/ST/PwD: Nil"
    ageLimit: str = "18 – 32 years (age relaxation as per rules)"
    importantDates: Optional[List[ImportantDate]] = None
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
    officialLink: Optional[str] = None
    tags: Optional[List[str]] = None
    vacancies: Optional[int] = None
    eligibility: Optional[str] = None
    fee: Optional[str] = None
    ageLimit: Optional[str] = None
    importantDates: Optional[List[ImportantDate]] = None
    featured: Optional[bool] = None


def _build_job(input: JobPostCreate) -> JobPost:
    now = datetime.now(timezone.utc)
    last_date = input.lastDate or (now + timedelta(days=21))
    tags = input.tags or [input.category]

    return JobPost(
        slug=input.slug,
        category=input.category,
        title=input.title,
        org=input.org,
        location=input.location,
        state=input.location,
        department=infer_department(tags),
        qualification=infer_qualification(input.eligibility, tags),
        date=now,
        lastDate=last_date,
        excerpt=input.excerpt or default_excerpt(input.org, input.title),
        content=input.content or default_content(
            input.org, input.title, input.category, input.location,
            input.overviewItems, input.howToApply, input.importantNote,
        ),
        applyLink=input.applyLink,
        applyLinkLabel=input.applyLinkLabel,
        officialLink=input.officialLink,
        tags=tags,
        vacancies=input.vacancies,
        eligibility=input.eligibility,
        fee=input.fee,
        ageLimit=input.ageLimit,
        importantDates=input.importantDates or [
            ImportantDate(**d) for d in default_important_dates(now, last_date)
        ],
        featured=input.featured,
        isNew=True,
    )


def _to_doc(job: JobPost) -> dict:
    doc = job.model_dump()
    doc["date"] = doc["date"].isoformat()
    doc["lastDate"] = doc["lastDate"].isoformat()
    return doc


def _from_doc(doc: dict) -> dict:
    for key in ("date", "lastDate"):
        if isinstance(doc.get(key), str):
            doc[key] = datetime.fromisoformat(doc[key])
    now = datetime.now(timezone.utc)
    post_date = doc.get("date")
    if isinstance(post_date, datetime):
        doc["isNew"] = (now - post_date) <= timedelta(days=3)
    return doc


@api_router.post("/jobs", response_model=JobPost)
async def create_job(input: JobPostCreate):
    existing = await db.jobs.find_one({"slug": input.slug}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="A job with this slug already exists")

    job = _build_job(input)
    await db.jobs.insert_one(_to_doc(job))
    return job


@api_router.get("/jobs", response_model=List[JobPost])
async def list_jobs(category: Optional[str] = None, limit: int = 500):
    query = {"category": category} if category else {}
    jobs = await db.jobs.find(query, {"_id": 0}).sort("date", -1).to_list(limit)
    return [_from_doc(j) for j in jobs]


@api_router.get("/jobs/{job_id}", response_model=JobPost)
async def get_job(job_id: str):
    job = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return _from_doc(job)


@api_router.put("/jobs/{job_id}", response_model=JobPost)
async def update_job(job_id: str, input: JobPostUpdate):
    existing = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Job not found")

    updates = {k: v for k, v in input.model_dump().items() if v is not None}
    if "lastDate" in updates and isinstance(updates["lastDate"], datetime):
        updates["lastDate"] = updates["lastDate"].isoformat()
    if "importantDates" in updates:
        updates["importantDates"] = [
            d if isinstance(d, dict) else d.model_dump() for d in updates["importantDates"]
        ]

    if updates:
        await db.jobs.update_one({"id": job_id}, {"$set": updates})

    updated = await db.jobs.find_one({"id": job_id}, {"_id": 0})
    return _from_doc(updated)


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

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
