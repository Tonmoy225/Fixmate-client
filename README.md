# FixMate

**FixMate** is a full-stack, role-based repair service platform. Verified technicians list repair services (smartphone, laptop, AC, refrigerator, TV, washing machine, electrical), customers send repair requests and track each job step by step, and pay online only after the job is completed. Admins approve services, manage users and monitor revenue.

## Live URLs

- Live Site: [CLIENT_LIVE_URL](https://fixmate-client-iota.vercel.app/)
- Client Repository: [CLIENT_GITHUB_URL](https://github.com/Tonmoy225/Fixmate-client)
- Server Repository: [SERVER_GITHUB_URL](https://github.com/Tonmoy225/fixmate-server)
- Server API: [SERVER_LIVE_URL](https://fixmate-server-beta.vercel.app/)

## Test Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | YOUR_ADMIN_EMAIL | YOUR_ADMIN_PASSWORD |
| Technician | YOUR_TECHNICIAN_EMAIL | YOUR_TECHNICIAN_PASSWORD |
| Customer | YOUR_CUSTOMER_EMAIL | YOUR_CUSTOMER_PASSWORD |

Stripe test card: `4242 4242 4242 4242`, any future date, any CVC.

## Key Features

- Responsive public website with a video hero banner, featured services, categories, how it works and testimonials
- Sign up as Customer or Technician with validation (admin cannot be selected); sign in with redirect back to the page you wanted
- Server-side search, filter, sort and pagination on Browse Services, kept in the URL so it survives a reload
- Service details page and a role-restricted repair request form (duplicate active requests are blocked)
- Three role-based dashboards with a collapsible sidebar, reusable stats cards and charts
- Customer: My Bookings (cancel with confirmation), Stripe Pay Now, Payment History
- Technician: Add Service with ImgBB image upload, My Services (edit, delete, availability toggle), Manage Requests with a status pipeline and final amount
- Admin: Manage Users and roles, Service Approval, All Bookings, Transactions with total revenue
- Update Profile for every role; the new name and photo appear instantly in the navbar and dashboard
- Route protection on the server, so reloading any private page keeps you logged in
- Custom loading state, 404 page, error boundary, toast notifications, empty states and confirmation modals

## Tech Stack

Next.js (App Router), Tailwind CSS, DaisyUI, BetterAuth (MongoDB adapter), JWT, Stripe, ImgBB, Express.js and MongoDB (server repository)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values.

| Name | Purpose |
| --- | --- |
| NEXT_PUBLIC_API_URL | Express server URL |
| BETTER_AUTH_SECRET | BetterAuth secret |
| BETTER_AUTH_URL | This site's URL |
| TRUSTED_ORIGINS | Extra trusted origins for BetterAuth (production domain), comma separated |
| MONGODB_URI | MongoDB connection string (same as the server) |
| DB_NAME | Database name (same as the server) |
| JWT_SECRET | JWT secret (must be the same as the server) |
| IMGBB_API_KEY | ImgBB API key for image upload |

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The server repository must be running as well.

## npm Packages

next, react, react-dom, tailwindcss, daisyui, better-auth, mongodb, jsonwebtoken, react-hot-toast, react-icons, recharts