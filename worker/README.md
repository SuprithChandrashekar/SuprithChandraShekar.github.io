# ask-suprith Worker

Proxies the "ask claude" portfolio widget to **Cloudflare Workers AI**.
Free tier — no external API key, no credit card.

## One-time setup

```bash
# 1. Install Wrangler (Cloudflare's CLI). Needs Node.js installed.
npm install -g wrangler

# 2. Log into Cloudflare
wrangler login

# 3. Deploy
cd worker
wrangler deploy
```

Wrangler will print a URL like `https://ask-suprith.<your-subdomain>.workers.dev`.
That URL goes into `assets/portfolio.jsx`.

First deploy will ask you to pick a `workers.dev` subdomain — accept the default or pick anything.

## Later changes

```bash
cd worker
wrangler deploy       # redeploy after editing worker.js
wrangler tail         # live-tail logs
```

## Change the model

Edit the `MODEL` constant at the top of `worker.js`. Good free options on Workers AI:

| Model | Notes |
|---|---|
| `@cf/meta/llama-3.3-70b-instruct-fp8-fast` | Default — best quality on free tier |
| `@cf/meta/llama-3.1-8b-instruct-fast` | Faster, lighter, slightly lower quality |
| `@cf/mistralai/mistral-small-3.1-24b-instruct` | Good alternative |

Full list: https://developers.cloudflare.com/workers-ai/models/

## Free-tier limits

- **10,000 neurons/day free** (~thousands of small portfolio queries)
- Per-IP rate limit of 1 request / 6 seconds built into the Worker
- `max_tokens: 350` hard ceiling per response
- `max_question_len: 500` chars client input cap
- Origin allowlist restricts CORS to your `github.io` site
