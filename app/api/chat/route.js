export async function POST(req) {
  return new Response(JSON.stringify({ success: true, message: 'Chat API temporarily disabled for maintenance.' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
} 