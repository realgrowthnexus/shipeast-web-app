# ShipEast Shop & Send

The web app at shipeastja.com where Jamaicans abroad buy groceries, household, pharmacy and
baby items for family in Jamaica. A ShipEast driver shops locally and delivers the same day,
with a photo of the receipt and a photo at the door.

One Next.js app holds the public site and shop, the driver app (`/driver`) and the admin panel
(`/admin`), backed by one Supabase project. It is separate from ShipEast's delivery app.

- What we're building and in what order: [`docs/PLAN.md`](docs/PLAN.md)
- Client, business model and decisions: [`docs/BRIEF.md`](docs/BRIEF.md)
- Database setup: [`docs/SQL-RUNBOOK.md`](docs/SQL-RUNBOOK.md)
- Rules for anyone working on the code: [`CLAUDE.md`](CLAUDE.md)

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # typecheck, lint, tests and production build
```

Without Supabase keys in `.env.local` the app runs in demo mode on placeholder data from
`src/lib/demo/`. Copy `.env.example` to `.env.local` and fill it in to connect a database.
