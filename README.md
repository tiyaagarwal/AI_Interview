# AI Mock Interview Platform

A production-ready full-stack AI mock interview platform using React 19, Vite, TailwindCSS, Express, MongoDB/Mongoose, Cloudinary, JWT auth, and OpenAI.

## Features
- JWT authentication, protected routes, bcrypt password hashing, profile management, forgot-password token generation.
- Resume upload for PDF/DOCX, Cloudinary storage, text extraction, AI resume analysis.
- Personalized AI interview question generation by role, difficulty, type, and resume evidence.
- Interview session with question navigation, progress, answer saving, resume-later persistence, and AI evaluation.
- Final reports with scores, radar chart data, topic breakdown, strongest/weakest topics, and recommendations.
- User dashboard with score trends, topic performance, and interview history.
- Admin dashboard with total users, interviews, average score, and AI usage statistics.
- Security middleware: Helmet, CORS, rate limiting, Mongo sanitization, XSS protection, validation, centralized errors.

## Structure
```text
backend/   Express API, MongoDB models, controllers, services, routes, middleware
frontend/  React app, protected routing, Tailwind UI, Recharts dashboards
docs/      Deployment guide
sample-data/ Sample resume content
```

## Local setup

```bash
npm run install:all
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# edit backend/.env and frontend/.env
npm run dev
```

Backend health check: `http://localhost:5000/health`.
Frontend: `http://localhost:5173`.

## Seed admin

```bash
npm run seed --prefix backend
```

Default seeded admin: `admin@example.com` / `Password123!`.

## API Summary

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/auth/me`
- `PATCH /api/auth/profile`

### Resumes
- `GET /api/resumes`
- `POST /api/resumes` multipart field `resume`
- `GET /api/resumes/:id`

### Interviews and evaluation
- `GET /api/interviews`
- `POST /api/interviews`
- `GET /api/interviews/:id`
- `POST /api/interviews/:id/answers`
- `POST /api/interviews/answers/:answerId/evaluate`
- `POST /api/interviews/:id/complete`
- `GET /api/interviews/:id/report`

### Dashboards
- `GET /api/dashboard/me`
- `GET /api/dashboard/admin`

## Environment variables
See `backend/.env.example` and `frontend/.env.example`.

## Deployment
See [`docs/deployment.md`](docs/deployment.md).
