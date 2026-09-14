# ترحال للسيارات — Tirhal Auto

Monorepo for the Tirhal Auto website. The frontend and the future backend are separate
top-level applications with their own dependencies and tooling, so neither has to be
restructured when the other is added.

```
/
├── frontend/          React + Vite + Tailwind — the Arabic RTL website (implemented)
├── backend/           Node.js + Express + PostgreSQL API (not created yet)
└── design-refs/       The delivered Figma PNG exports the frontend was built against
```

## Frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
npm run build
npm run preview
```

See [frontend/README.md](frontend/README.md) for the screen map, the RTL conventions, the
asset pipeline and the list of deliberate deviations from the Figma.

## Backend — not yet created

The API will live in `/backend` and is not part of the current phase. The frontend is
already prepared for it: every read and write goes through `frontend/src/services/`, and
`frontend/src/services/http.js` exports a real `request()` helper alongside the mock
transport. Connecting the API means changing the body of each service function — no page,
component or hook changes.

When `/backend` is added, the frontend reaches it through `VITE_API_BASE_URL` (defaulting
to `/api`), so the two can be developed and deployed independently.
