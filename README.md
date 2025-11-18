# cagebot_page

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/fightbot/v0-cagebot-draft)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/lBqd5qSr35V)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/fightbot/v0-cagebot-draft](https://vercel.com/fightbot/v0-cagebot-draft)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/lBqd5qSr35V](https://v0.app/chat/lBqd5qSr35V)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Importing model picks & results into Supabase

Run the new helper script whenever you need to hydrate Supabase with CSV exports (`picks.csv`, `results.csv`, etc.). The script upserts directly into `public.picks` and `public.results`, and automatically flips the event status to `completed` after results are ingested (or to any status you pass via `--status`).

```bash
# Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment
npm run import:event -- \
  --event e1a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c \
  --picks /path/to/picks.csv \
  --results /path/to/results.csv
```

Flags:

- `--event` – Event UUID; used for any CSV rows missing `event_id`.
- `--picks` / `--results` – Paths to CSV files whose headers map directly to the Supabase table columns. Missing `id` fields are generated automatically.
- `--status` – Optional status override after import (defaults to `completed` when results are present).

CSV files are parsed locally, so you can pull them from your model pipeline/export first, then run the script to push data + status updates in one step.
