# Horses and More

Premium equestrian supplies website — Next.js 16, Tailwind CSS v4, Prisma 7 (SQLite local / PostgreSQL production).

**This is an enquiry-only site — no cart or payment processing.**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (manually configured) |
| Database | Prisma 7 + SQLite (dev) / PostgreSQL (production) |
| Email | Resend (graceful no-op in dev if key not set) |
| Forms | react-hook-form + Zod v4 |
| Animations | Framer Motion |
| Icons | lucide-react |
| Auth (admin) | Lightweight session cookie (no NextAuth dependency) |

---

## Quick Start (Local Development)

### 1. Clone and install

```bash
git clone <repo>
cd horses-and-more
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Edit `.env` — the defaults work for local dev:

```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@horsesandmore.com.au"
ADMIN_PASSWORD="admin123"
ADMIN_SESSION_SECRET="dev-admin-session-secret-change-in-prod"
RESEND_API_KEY=""          # Optional — emails log to console if blank
STORE_OWNER_EMAIL="owner@horsesandmore.com.au"
```

### 3. Database setup

```bash
# Apply migrations (creates dev.db)
npm run db:migrate

# Seed with 7 categories, 24 products, 1 admin user, 1 sample enquiry
npm run db:seed
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Admin Dashboard

| URL | Description |
|-----|-------------|
| `/admin/login` | Admin sign-in |
| `/admin` | Dashboard (enquiry + product counts) |
| `/admin/enquiries` | View and triage all enquiries |
| `/admin/products` | View, toggle featured, delete products |

Default credentials (change in production):
- Email: `admin@horsesandmore.com.au`
- Password: `admin123`

---

## Database

### SQLite (local dev)

The default `DATABASE_URL="file:./dev.db"` uses SQLite via libsql — no setup needed.

### PostgreSQL (production — Neon / Supabase)

1. Create a database on [Neon](https://neon.tech) or [Supabase](https://supabase.com)
2. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
   }
   ```
3. Update `prisma.config.ts` — already reads from `DATABASE_URL` env var
4. Update `.env` / Vercel env vars:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate deploy
   npm run db:seed
   ```

---

## Email (Resend)

1. Create a free account at [resend.com](https://resend.com)
2. Add your API key to `.env`:
   ```env
   RESEND_API_KEY="re_xxxxxxxxxxxxx"
   STORE_OWNER_EMAIL="your@email.com"
   ```

If `RESEND_API_KEY` is blank, enquiry emails are logged to the console instead of sent — useful for development.

---

## Deployment (Vercel + Neon)

1. Push to GitHub
2. Create a new Vercel project, import the repo
3. Add all environment variables from `.env.example` to Vercel's dashboard
4. Set `DATABASE_URL` to your Neon PostgreSQL connection string
5. Set `ADMIN_SESSION_SECRET` to a strong random string (`openssl rand -base64 32`)
6. Deploy — Vercel handles the Next.js build automatically

```bash
# Check build passes locally first
npm run build
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:seed` | Seed categories, products, admin |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:reset` | Reset DB and reseed |

---

## Site Structure

```
/                     Home (hero, categories, featured products, story, testimonials)
/shop                 All products (search, filter by category, sort)
/shop/category/[slug] Category pages
/shop/product/[slug]  Product detail (gallery, specs, enquiry modal)
/about                Store story, team, values
/contact              General enquiry form + store info
/faq                  Frequently asked questions
/admin/login          Admin login
/admin                Admin dashboard
/admin/enquiries      Manage enquiries (view, update status)
/admin/products       Product list (toggle featured, delete)
```

---

## Color Palette

Strictly black / white / grey — no other accent colors.

| Token | Value |
|-------|-------|
| White | `#ffffff` |
| Off-white | `#fafafa` |
| Light grey | `#e5e5e5` |
| Mid grey | `#888888` |
| Charcoal | `#1a1a1a` |
| Black | `#000000` |
