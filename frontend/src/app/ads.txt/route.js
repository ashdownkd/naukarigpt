export async function GET() {
  return new Response(
    `google.com, pub-2072593502386779, DIRECT, f08c47fec0942fa0`,
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  );
}
