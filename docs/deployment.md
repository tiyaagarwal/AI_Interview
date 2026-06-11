# Deployment Guide

## Backend on Render
1. Create a Web Service from this repository.
2. Root directory: `backend`.
3. Build command: `npm install`.
4. Start command: `npm start`.
5. Add environment variables from `backend/.env.example` with production values.
6. Set `CLIENT_URL` to your Vercel frontend URL.

## Frontend on Vercel
1. Import this repository into Vercel.
2. Root directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_API_URL=https://your-render-service.onrender.com/api`.

## MongoDB Atlas
1. Create an Atlas cluster and database user.
2. Allow Render outbound access or temporarily allow `0.0.0.0/0` for development.
3. Use the SRV URI as `MONGODB_URI`.

## Cloudinary
Create an unsigned folder is not required. The backend uses signed uploads with `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
