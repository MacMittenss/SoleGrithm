Testing Kicks.dev webhooks locally

1) Ensure your server is running on port 3000:

```bash
npm start
# or for dev
npm run dev
```

2) Use localtunnel (you already have the URL):

Public URL (example): https://solid-ravens-juggle.loca.lt

3) Add monitor on Kicks.dev with webhook URL:

https://solid-ravens-juggle.loca.lt/api/webhooks/kicks/goat

4) Set the webhook secret on Kicks.dev to the same value as `KICKS_WEBHOOK_SECRET` in your `.env` (default placeholder: `change_me_to_a_real_secret`).

5) Example curl to simulate a signed webhook:

```bash
SECRET='change_me_to_a_real_secret'
URL='https://solid-ravens-juggle.loca.lt/api/webhooks/kicks/goat'
PAYLOAD='{"event":"price_change","product":{"slug":"nike-air-max-90","id":"123456","url":"https://www.goat.com/listings/nike-air-max-90","name":"Nike Air Max 90","price":120}}'
SIG=$(printf '%s' "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" -binary | xxd -p -c 256)
curl -v -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-kicks-signature: $SIG" \
  -d "$PAYLOAD"
```

6) The server logs should show the received event and upsert result.
