## Career Guidance Assistant

An end‑to‑end career planning web application that helps users assess skills, track progress, and receive personalized recommendations. The project is built with React (Vite + TypeScript), Tailwind CSS, and Supabase for authentication and data. Payments and plan upgrades are handled via Paystack with a lightweight serverless verification endpoint.

**Pitch deck**: [Career Guidance Assistant – Presentation](https://gamma.app/docs/Career-Guidance-Assistant-p0xfj21qw80y6qj)

### Key Features
- **Authentication & profiles**: Email/password auth via Supabase with protected routes and context-driven session state.
- **Assessments & skills**: Capture user skills and interests to tailor recommendations.
- **Personalized recommendations**: Curated paths and resources based on profile data.
- **Progress tracking**: Visualize learning and career milestones.
- **Premium upgrades**: Paystack checkout and serverless payment verification.
- **Modern UI**: Tailwind CSS with reusable UI primitives.

### Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS
- **Backend as a Service**: Supabase (Auth, Database, optionally Storage)
- **Payments**: Paystack (public key in client, secret used only in serverless function)
- **Serverless API**: Node.js function for payment verification (`api/verify-paystack.js`)
- **Tooling**: ESLint, PostCSS, Vite

---

## Monorepo Layout

This repository currently contains two Vite React apps. The root app is the primary application; the `career/` app is a sibling implementation that shares concepts and may be used for experiments or alternate UI flows.

```
.
├─ api/
│  └─ verify-paystack.js             # Serverless endpoint for Paystack verification
├─ src/                              # Primary app (root)
│  ├─ components/
│  ├─ contexts/
│  ├─ lib/supabase.ts
│  ├─ pages/
│  └─ main.tsx, App.tsx, index.css, ...
├─ career/                           # Secondary app (Vite + TS + Tailwind + Supabase)
│  └─ src/
├─ supabase/
│  └─ migrations/                    # SQL migrations (example scaffold)
├─ tailwind.config.js                # Root app Tailwind config
├─ vite.config.ts                    # Root app Vite config
├─ package.json                      # Root app scripts and dependencies
└─ README.md                         # You are here
```

---

## Quick Start

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ (or pnpm/yarn if preferred)
- Supabase project with URL and anon key
- Paystack account with public and secret keys

### 1) Clone and install (root app)

```bash
git clone <this-repo-url>
cd Career-Assistant-main
npm install
```

### 2) Environment variables

Create a `.env` file at the repository root for the primary app:

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Paystack
VITE_PAYSTACK_PUBLIC_KEY=pk_test_or_live_xxx

# App
VITE_APP_URL=http://localhost:5173
VITE_PAYSTACK_CALLBACK_PATH=/verify
```

Notes:
- The serverless function uses the Paystack secret key via the platform’s secure env store (do NOT put secrets in `.env` that is shipped to the browser).
- In your deployment platform, set `PAYSTACK_SECRET_KEY` for the serverless environment.

If you also plan to run the secondary app in `career/`, replicate the env values in `career/.env` with the same keys.

### 3) Run the app (root)

```bash
npm run dev
# Visit http://localhost:5173
```

To run the secondary app:

```bash
cd career
npm install
npm run dev
# Visit the port Vite prints (usually 5173 or 5174)
```

---

## Scripts (root app)

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build locally
```

The `career/` app exposes the same scripts within its directory.

---

## Application Architecture

- `src/lib/supabase.ts`: Initializes the Supabase client with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- `src/contexts/AuthContext.tsx`: Provides auth/session context, subscribes to Supabase auth state changes.
- `src/components/ProtectedRoute.tsx` (or equivalent): Guards premium/protected routes.
- `src/pages/*`: Feature pages such as `Dashboard`, `Skills`, `Recommendations`, `Payments`, `Verify`.
- `api/verify-paystack.js`: Serverless function that verifies Paystack transactions on the server using the secret key.

Data flow summary:
1. User signs up/logs in via Supabase Auth (client).
2. App reads/writes user data in Supabase tables (via anon key).
3. For upgrades, the client initializes Paystack checkout using the public key.
4. After payment, Paystack redirects back to the app (`/verify`).
5. The app calls the serverless verify endpoint, which confirms the transaction via the secret key and updates the user’s premium status.

---

## Payments Integration

### Client-side
- Uses `VITE_PAYSTACK_PUBLIC_KEY` to initialize the Paystack inline or redirect flow.
- On success, the user is redirected to `VITE_APP_URL + VITE_PAYSTACK_CALLBACK_PATH` with a `reference` query param.

### Serverless verification (`api/verify-paystack.js`)
- Exposes an endpoint (e.g., `/api/verify-paystack`) depending on your platform.
- Reads `reference` from the request and verifies it against Paystack’s API using `PAYSTACK_SECRET_KEY`.
- On success, you can mark the user as premium in Supabase. Ensure row-level security and service roles are properly configured if writing server-side.

Environment variables required at deploy time for the function:
- `PAYSTACK_SECRET_KEY` (server-only)

Optional:
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` if the function writes to Supabase securely. The current code may only verify and return a status; extend as needed.

---

## Environment Variables Summary

Frontend (browser-exposed via Vite):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PAYSTACK_PUBLIC_KEY`
- `VITE_APP_URL`
- `VITE_PAYSTACK_CALLBACK_PATH`

Serverless (not exposed to the browser):
- `PAYSTACK_SECRET_KEY`
- Optionally `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` if server writes to DB

Store server-only variables in your hosting provider’s secrets manager. Never commit secrets.

---

## Deployment

You can deploy the frontend to Vercel, Netlify, or similar static hosts. The `api/` directory can be deployed as serverless functions on the same platform for convenient routing.

General steps:
1. Set environment variables in the hosting platform (both build-time and serverless).
2. Configure the build command (`npm run build`) and output directory (`dist`).
3. Deploy the frontend.
4. Ensure `/api/verify-paystack` is reachable and has access to `PAYSTACK_SECRET_KEY`.
5. In Paystack, set your callback/redirect URL to `https://your-domain.tld/verify` (or route used by your app) that triggers the verification call.

Platform notes:
- **Vercel**: Place `api/verify-paystack.js` under `api/` for Vercel Functions. Set env vars in Project Settings.
- **Netlify**: You may need to adapt the function location/config. Confirm endpoint path and use Netlify env vars.

---

## Database & Migrations

The `supabase/migrations/` folder includes example scaffolding. Define your schema (e.g., user profiles, assessments, recommendations, payments) as SQL migrations. Apply via the Supabase CLI or dashboard. Ensure Row Level Security (RLS) policies are configured for tables accessed by the client.

---

## Testing

- Unit tests and integration tests are not yet included. Suggested additions:
  - Component tests with Vitest + React Testing Library
  - E2E tests with Playwright or Cypress
  - Contract tests for the Paystack verification function

---

## Troubleshooting

- App fails to load auth session:
  - Confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct.
- Paystack verification returns failure:
  - Ensure `PAYSTACK_SECRET_KEY` is set on the serverless platform and is valid.
  - Check that the client sends the `reference` and that your function hits Paystack’s correct API base.
- CORS or 404 on `/api/verify-paystack`:
  - Confirm function routing on your host and update the client call URL if necessary.
- Styles not applying:
  - Verify Tailwind config and that `index.css` includes the Tailwind directives.

---

## Roadmap Ideas

- In-app messaging or mentor matching
- Richer assessment engines and personalized learning paths
- Content ingestion and ranking via embeddings
- Notifications and calendar integrations
- Team/organization plans and admin dashboards

---

## Contributing

1. Create an issue describing the change.
2. Fork, create a feature branch, and implement.
3. Open a PR with a clear description and screenshots for UI changes.

Please adhere to the existing code style and ensure no linter errors are introduced.

---

## License

No license has been specified yet. If you plan to open-source this project, consider adding a recognized license (e.g., MIT, Apache-2.0) and updating this section.


