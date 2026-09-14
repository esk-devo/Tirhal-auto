# Admin dashboard — reserved

This directory is intentionally empty of UI.

The Tirhal Auto admin dashboard is part of the product scope, but its UI/UX has not been
designed yet. Inventing a dashboard now would mean throwing it away when the real Figma
arrives, so nothing here is implemented.

## What is already in place for it

- **Routing** — `src/routes/AppRoutes.jsx` mounts the public tree under `<MainLayout>`.
  An admin tree is added as a sibling `<Route path="admin" element={<AdminLayout />}>`
  without touching a single public route.
- **Layouts** — `src/layouts/` holds one layout per shell; `AdminLayout.jsx` joins it.
- **Services** — `src/services/*` already isolates every read and write behind a function.
  Admin screens consume the same services (plus admin-only ones) rather than fetching
  directly, so the data contract is shared with the public site.
- **Auth** — `src/context/AuthContext.jsx` exposes `user` and `status`. A role check and a
  `<RequireRole>` route guard slot in there when the API returns roles.

## When the design lands

1. Add `src/layouts/AdminLayout.jsx`.
2. Add `src/pages/admin/<Screen>/<Screen>.jsx` per designed screen.
3. Register the admin route subtree in `AppRoutes.jsx`.
4. Add any admin-only service modules under `src/services/`.

Planned routes (routing shape only, no UI yet): `/admin`, `/admin/cars`, `/admin/brands`,
`/admin/orders`, `/admin/users`, `/admin/financing`.
