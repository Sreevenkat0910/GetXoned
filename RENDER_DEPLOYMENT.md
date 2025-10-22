# Render Deployment Guide

This project is configured for deployment on Render.com with three services:

## Services

### 1. Backend API (xoned-backend)
- **Type**: Web Service (Node.js)
- **Plan**: Starter ($7/month)
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Port**: 10000
- **Database**: MongoDB (xoned-db)

### 2. Frontend (xoned-frontend)
- **Type**: Web Service (Static)
- **Environment**: static
- **Plan**: Free
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Path**: `./frontend/dist`

### 3. Admin Dashboard (xoned-admin)
- **Type**: Web Service (Static)
- **Environment**: static
- **Plan**: Free
- **Build Command**: `cd admin && npm install && npm run build`
- **Publish Path**: `./admin/dist`

## Environment Variables

### Backend Required Variables:
- `MONGODB_URI` - MongoDB connection string (auto-generated from database)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `JWT_SECRET` - JWT secret key
- `CLERK_SECRET_KEY` - Clerk secret key
- `CORS_ORIGINS` - Comma-separated list of allowed origins

### Frontend/Admin Required Variables:
- `VITE_API_URL` - Backend API URL (https://xoned-backend.onrender.com)
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key

## Database
- **Name**: xoned-db
- **Type**: MongoDB
- **Plan**: Free tier

## Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new Blueprint from the `render.yaml` file
3. Set the required environment variables in the Render dashboard
4. Deploy all services

## URLs After Deployment
- Backend API: `https://xoned-backend.onrender.com`
- Frontend: `https://xoned-frontend.onrender.com`
- Admin: `https://xoned-admin.onrender.com`

## Notes
- Backend uses Starter plan ($7/month) for reliable web service hosting
- Frontend and Admin use free static site hosting
- The backend service will automatically connect to the MongoDB database
- CORS is configured to allow requests from the frontend and admin domains
- Static sites are served from the `dist` folders after build
- Total monthly cost: $7 (backend only)
