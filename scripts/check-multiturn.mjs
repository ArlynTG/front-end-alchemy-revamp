// --- Multi-turn chat health-check (plain Node 18+ / 22+) ---
const BASE_URL = process.env.BASE_URL || 'https://n8n.tobeystutor.com';
const firstBody = { message: 'Ping', threadId: null };

const res1 = await fetch(`${BASE_URL}/webhook/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(firstBody),
}).then(r => r.json());

const id = (res1.threadId || res1.threadID || res1.id || '').trim();

const res2 = await fetch(`${BASE_URL}/webhook/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'What did I just say?', threadId: id }),
}).then(r => r.json());

if (JSON.stringify(res2).includes('Ping')) {
  console.log('✅  Multi-turn OK');
  process.exit(0);
} else {
  console.error('❌  Multi-turn FAILED\n', res2);
  process.exit(1);
} 