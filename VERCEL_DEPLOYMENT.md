# Vercel Free Deployment Guide

This project is configured for **100% FREE** deployment on Vercel with MongoDB Atlas.

## 🆓 Free Services Used

### 1. Vercel (Frontend + Backend)
- **Frontend**: Static hosting (unlimited)
- **Admin**: Static hosting (unlimited) 
- **Backend**: Serverless functions (unlimited)
- **Cost**: $0/month

### 2. MongoDB Atlas (Database)
- **Database**: MongoDB (512MB free)
- **Cost**: $0/month

## 🚀 Deployment Steps

### Step 1: Prepare MongoDB Atlas
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create a free cluster (M0 Sandbox)
4. Get connection string
5. Create database user

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Vercel will auto-detect the configuration

### Step 3: Set Environment Variables
In Vercel dashboard, add these environment variables:

**For Backend:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xoned
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret_key
CORS_ORIGINS=https://your-app.vercel.app
```

**For Frontend:**
```
VITE_API_URL=https://your-app.vercel.app/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**For Admin:**
```
VITE_API_URL=https://your-app.vercel.app/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 📁 Project Structure for Vercel

```
/
├── vercel.json          # Vercel configuration
├── frontend/            # Frontend app
│   ├── dist/           # Built frontend
│   └── package.json
├── admin/              # Admin app  
│   ├── dist/           # Built admin
│   └── package.json
└── backend/            # Backend API
    ├── server.js       # Main server file
    └── package.json
```

## 🔧 Build Configuration

Vercel will automatically:
1. Build frontend: `cd frontend && npm install && npm run build`
2. Build admin: `cd admin && npm install && npm run build`
3. Deploy backend as serverless functions

## 🌐 URLs After Deployment

- **Frontend**: `https://your-app.vercel.app`
- **Admin**: `https://your-app-admin.vercel.app` (separate deployment)
- **API**: `https://your-app.vercel.app/api`

## 💰 Total Cost: $0/month

- Vercel: Free (unlimited)
- MongoDB Atlas: Free (512MB)
- Cloudinary: Free (25GB storage, 25GB bandwidth)
- Clerk: Free (10,000 monthly active users)

## 🎯 Benefits of Vercel

- ✅ No sleeping services
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ GitHub integration
- ✅ Preview deployments
- ✅ Built-in analytics
- ✅ No bandwidth limits
- ✅ No build time limits

## 📊 Limitations

- Backend functions: 30-second timeout
- Database: 512MB storage
- No persistent file storage (use Cloudinary)

## 🔄 Alternative: Separate Deployments

For better performance, deploy each service separately:

1. **Frontend**: Deploy `frontend/` folder
2. **Admin**: Deploy `admin/` folder  
3. **Backend**: Deploy `backend/` folder

Each gets its own subdomain:
- `https://xoned-frontend.vercel.app`
- `https://xoned-admin.vercel.app`
- `https://xoned-backend.vercel.app`
