// app/ads.txt/route.js
export async function GET() {
  const content = `google.com, pub-2072593502386779, DIRECT, f08c47fec0942fa0`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
