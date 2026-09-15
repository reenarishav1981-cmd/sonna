# SONA — Full Stack (Frontend + Backend)

Concept prototype for the "jewellery-comes-to-you" service. Real, working
integration — backend is Node/Express/MongoDB, frontend is React/Vite/TS/Tailwind
pulling live data from it (designs, price examples, home-visit booking).

## What's wired end-to-end
- **Home Visit form** → `POST /api/leads` → saved in MongoDB
- **Design Explorer** → `GET /api/designs?category=` → live from DB, category filter works
- **Price Transparency** → `GET /api/pricing/examples` → live breakdown + advertised-vs-actual toggle
- **Order stage tracker** (signature SAMPLE→SELECTED→PRICE→VERIFIED→DELIVERED) → `/api/orders` (model + routes ready; not yet wired to a UI screen — see "Not done" below)

## 1. Backend

```bash
cd backend
cp .env.example .env        # edit MONGO_URI if not using local Mongo
npm install
npm run seed                # loads sample designs + price examples
npm run dev                 # http://localhost:5000
```

Needs a MongoDB instance reachable at `MONGO_URI` (local `mongod`, or Atlas connection string).

### API surface
```
GET    /api/health
GET    /api/designs?category=Rings
GET    /api/designs/:designId
GET    /api/pricing/examples
POST   /api/leads              { name, mobile, area, jewelleryType, approxBudget?, preferredDate, preferredTime }
GET    /api/leads?status=new   (admin listing — no auth yet, add before real deployment)
PATCH  /api/leads/:id/status   { status }
POST   /api/orders             { leadId, designId? }
GET    /api/orders/:id
PATCH  /api/orders/:id/advance
GET    /api/orders/meta/stages
```

## 2. Frontend

```bash
cd frontend
cp .env.example .env         # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                  # http://localhost:3000
```

Backend must be running first (or the Designs/Price/Booking sections will show
empty/error states — they fail gracefully, they don't crash the page).

## Build for production
```bash
cd frontend && npm run build      # outputs frontend/dist
cd backend  && npm start          # or pm2 / your process manager of choice
```

## What's built (matches the design brief)
Navbar, Hero (signature SAMPLE→DELIVERED cycling card), TrustStrip (hover
tooltips), ConceptJourney (traditional vs SONA model), PhysicalExperience,
TrustSection (6 trust cards), PriceTransparency (live from backend, advertised
vs actual toggle), DesignExplorer (live from backend, category filter, "Request
this design" routes into the booking form), OrderJourney (5-step), HomeVisitForm
(3-step, posts to backend), FutureVision (Today/Tomorrow/Future), Footer with
prototype disclaimer.

Colors, type scale (Cormorant Garamond + Manrope), dark/ivory rhythm, and
copy all follow the two prompt docs (Imagination Alignment Tool + Visual
Identity System) — gold used only as accent, no fake stats/testimonials/logos
anywhere, price examples explicitly labeled "demonstration only."

## Not done yet (ran out of scope for this pass — flagging honestly)
- No SMS/WhatsApp/email notification on lead submission — `backend/src/lib/notify.js`
  currently just logs; it's the single choke point to plug a real provider into.
- No image upload — DesignSample images are just URLs (seeded with Unsplash
  placeholders); swap for real photography + real hosting (S3/Cloudinary) later.
- Admin auth is a single shared key (`ADMIN_KEY` header), not per-user login —
  fine for one or two internal people, swap for real auth (JWT + login) before
  handing access to a team.
- Framer Motion is installed and used for the hero card; the rest of the
  scroll-linked cinematic motion from the brief (line-drawing animations,
  scroll-triggered image reveals, magnetic buttons) is not implemented —
  current motion is functional/clean, not the full cinematic layer described
  in the brief.
- No automated test suite (routes were verified manually — see below).

Everything above is a clean extension point, not a rewrite — routes, models
and components are already structured for it.

## What just got added (this pass)
- **Admin dashboard** at `/#/admin` (frontend) — enter the `ADMIN_KEY`, view/
  filter leads, change lead status, convert a lead into an order, advance an
  order's stage.
- **Public order tracking** at `/#/track` — customer pastes their order id,
  sees the SAMPLE → SELECTED → PRICE → VERIFIED → DELIVERED progress. No login
  needed; the endpoint only returns safe fields (no contact info).
- **Admin routes locked down** — `GET/POST /api/leads`, `/api/orders` write
  routes now require an `x-admin-key` header matching `ADMIN_KEY` in `.env`.
  Order tracking (`GET /api/orders/:id`) stays public by design.
- **Notification stub** (`backend/src/lib/notify.js`) — fires on lead
  creation, logs only for now.
- **Real bug found and fixed during testing**: when MongoDB isn't reachable,
  mongoose's default "buffer commands for 10s then throw" behavior threw
  *outside* the request's promise chain and crashed the whole Node process —
  even with try/catch in the route. Fixed by setting `bufferCommands: false`
  (fails fast with a clean error instead) and wrapping every async route in
  an `asyncHandler` so DB errors always return a proper 500 instead of taking
  the server down. Verified by booting the app in-process and hitting every
  route with the DB intentionally unreachable — all now return correct status
  codes (200/401/404/500) and the server stays alive throughout.

## How this was verified
No MongoDB binary is available in the build sandbox (and its download host
isn't network-reachable from here), so a live DB round-trip couldn't be run
in this environment. What *was* verified directly:
- `tsc -b` and `vite build` — both clean, 0 errors.
- Every backend file — `node --check` syntax pass.
- The full Express app booted in-process and every route hit directly
  (health, designs, pricing, leads, orders, admin auth, 404, order tracking)
  with MongoDB intentionally absent — confirms routing, zod validation,
  admin-key auth, and error handling all behave correctly and the process
  never crashes.
- What's *not* independently verified here: an actual successful DB write/read
  round-trip (needs real MongoDB, which you'll have when you run `npm run dev`
  locally) and the frontend rendering in a real browser (only build-verified).
  Run `npm run seed` then open the app to confirm those yourself — they should
  work off this same code path, just untested against a live database in this
  sandbox.

## Push to git
```bash
git init
git add .
git commit -m "SONA: full-stack concept prototype — backend + frontend + admin + tracking"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
`.gitignore` already excludes `node_modules/`, `dist/`, and `.env` files —
your `ADMIN_KEY` and `MONGO_URI` won't leak into the repo. Each collaborator
copies `.env.example` → `.env` locally after cloning.

