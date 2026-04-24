// Cloudflare Worker — proxies "ask claude" widget to Cloudflare Workers AI.
// Uses the `AI` binding (no API key needed) against Meta's Llama 3.3 70B.
// Free tier: 10,000 neurons/day, plenty for a portfolio widget.

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const MAX_TOKENS = 350;
const MAX_QUESTION_LEN = 500;

const ALLOWED_ORIGINS = new Set([
  'https://suprithchandrashekar.github.io',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://127.0.0.1:5500',
]);

const SYSTEM_PROMPT = `You are answering questions about Suprith Chandra Shekar in first person, as Suprith.

Background:
- M.S. Industrial Engineering, UIUC. GPA 3.94. A+ in OR Models (IE410) and HFT Tech (IE421). TA for HT 504 Healthcare Systems Engineering.
- Former Consultant at Deloitte — ServiceNow ITSM / ITOM for a German global enterprise.
- Builds agent systems:
  * Claude Node — containerized workspace for persistent AI agents, WhatsApp bridges, 12+ services. Won the Anthropic Hackathon.
  * HFT Strategy Generator — multi-agent LLM pipeline; lifted TSLA OOS Sharpe from 0.63 to 1.95.
  * RuFlow — workflow orchestration.
  * OpenClaw — lightweight tool-calling framework.
- 4 years on Team Helios Racing (60-person team, national champion). Now mentoring the ICE-to-electric ATV transition.
- Seeking applied ML / AI agent / decision-analytics roles starting Spring 2027.

Style:
- Calm, confident, first person.
- 2-3 short sentences. No lists unless asked.
- No marketing fluff, no emojis, no "As an AI".
- If asked something outside this background, say you'd rather answer that in person.`;

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://suprithchandrashekar.github.io';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

// Per-IP rate limit via the Cache API — no KV setup required.
async function rateLimit(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const cache = caches.default;
  const key = new Request(`https://rl.local/${ip}`);
  if (await cache.match(key)) return { limited: true, retryAfter: 6 };
  await cache.put(key, new Response('1', { headers: { 'Cache-Control': 'public, max-age=6' } }));
  return { limited: false };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin);
    }

    const rl = await rateLimit(request);
    if (rl.limited) {
      return json({ error: `Slow down — try again in ${rl.retryAfter}s.` }, 429, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, origin);
    }

    const question = String(body?.question || '').trim().slice(0, MAX_QUESTION_LEN);
    if (!question) {
      return json({ error: 'Empty question' }, 400, origin);
    }

    try {
      const result = await env.AI.run(MODEL, {
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
        max_tokens: MAX_TOKENS,
      });

      const answer = (result?.response || '').trim();
      if (!answer) {
        return json({ error: 'Model returned no text' }, 502, origin);
      }
      return json({ answer }, 200, origin);
    } catch (err) {
      console.error('Workers AI error', err);
      return json({ error: 'Request failed' }, 500, origin);
    }
  },
};
