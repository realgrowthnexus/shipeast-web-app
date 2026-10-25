# ShipEast Shop & Send

The web app at **shipeastja.com** that lets Jamaicans overseas buy groceries and everyday
goods for family in Jamaica — shopped locally by a ShipEast driver and delivered with a
photo of the receipt and a photo at the door.

- Plan (every page, every phase): [`docs/PLAN.md`](docs/PLAN.md)
- Client brief and decisions: [`docs/BRIEF.md`](docs/BRIEF.md)
- Database SQL to run in Supabase: [`docs/SQL-RUNBOOK.md`](docs/SQL-RUNBOOK.md)
- Project rules for contributors and agents: [`CLAUDE.md`](CLAUDE.md)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000 — runs in demo mode until Supabase env is set
npm run check      # typecheck + lint + tests + production build
```

Copy `.env.example` to `.env.local` and fill it in to connect Supabase, PayPal, Resend
and Twilio.
