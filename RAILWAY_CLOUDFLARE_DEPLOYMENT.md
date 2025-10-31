# 🚀 Se-Embe Deployment Guide: Cloudflare + Railway

## Overview
- **Frontend**: Cloudflare Pages (already deployed)
- **Backend**: Railway
- **Database**: MongoDB Atlas (already configured)

## 🚂 Part 1: Deploy Backend to Railway

### Step 1: Prepare Your Repository
Your backend is already prepared with:
- ✅ `Procfile` - Railway deployment configuration
- ✅ `package.json` - Dependencies and Node.js version
- ✅ `railway.json` - Railway-specific settings
- ✅ Environment variables ready

### Step 2: Deploy to Railway

**Option A: GitHub Integration (Recommended)**
1. **Create Railway Account**: Go to [railway.app](https://railway.app)
2. **Sign in with GitHub**: Use your GitHub account
3. **Create New Project**: Click "New Project"
4. **Deploy from GitHub repo**: 
   - Select your `se-embe` repository
   - Choose "Deploy from GitHub repo"
   - **Important**: Set root directory to `/backend`
5. **Railway will automatically**:
   - Detect Node.js application
   - Install dependencies
   - Start the server

**Option B: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Navigate to backend folder
cd backend

# Initialize and deploy
railway link
railway up
```

### Step 3: Configure Environment Variables in Railway

In your Railway dashboard, go to your project > Variables tab and add:

```env
# Database
MONGO_URI=mongodb+srv://seEmbeDbAdmin:t4ZAFBKkeC0s3Q1a@cluster0.taunkxt.mongodb.net/seEmbeDb

# Security
JWT_SECRET=f437fn3h9n4f374n97fy3n47f3n94yf9y428998y02ncf0239r03n370n3420384n2947n2937420423023042cj0234023n023
SESSION_SECRET=12e903m0832u948nc9yrc92y34y2c0734n02c273cn042346c734c6bo3q8o8bc9337q9c876394q79q469q6c7q86347rh4

# Application
NODE_ENV=production
PORT=5000
```

**🔐 Security Note**: In production, you should generate new secure secrets:
```bash
# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate new session secret  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Test Your Railway Deployment

After deployment, Railway will provide a URL like:
`https://se-embe-backend-production.up.railway.app`

Test it:
```bash
curl https://your-railway-url.com/
# Should return: {"message": "SE-EMBE Backend API is running!"}
```

## ☁️ Part 2: Update Frontend for Railway Backend

### Step 1: Update Environment Variables

Update your frontend environment files:

**`.env.production`**:
```env
VITE_API_URL=https://your-railway-url.up.railway.app/api
VITE_APP_NAME=Se-Embe
VITE_NODE_ENV=production
VITE_ENABLE_ANALYTICS=true
```

### Step 2: Update Cloudflare Pages Environment Variables

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** > **se-embe** > **Settings** > **Environment variables**
3. Add production variables:
   - `VITE_API_URL`: `https://your-railway-url.up.railway.app/api`
   - `VITE_APP_NAME`: `Se-Embe`
   - `VITE_NODE_ENV`: `production`

### Step 3: Redeploy Frontend

**Option A: Automatic (GitHub Integration)**
```bash
git add .
git commit -m "Update API URL for Railway backend"
git push origin main
```
Cloudflare will automatically redeploy.

**Option B: Manual Deploy**
```bash
# Build with new environment
npm run build

# Deploy to Cloudflare
wrangler pages deploy dist --project-name se-embe
```

## 🔧 Backend CORS Configuration

Make sure your backend CORS is configured for your Cloudflare domain. In your `server.js`:

```javascript
// Update CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175',
    'https://abc6b38d.se-embe.pages.dev',
    'https://se-embe.pages.dev',
    'https://your-custom-domain.com' // Add your custom domain if you have one
  ],
  credentials: true
}));
```

## 📋 Deployment Checklist

### Backend (Railway):
- [ ] Repository connected to Railway
- [ ] Environment variables configured
- [ ] Database connection tested
- [ ] API endpoints responding
- [ ] CORS configured for frontend domain

### Frontend (Cloudflare):
- [ ] Environment variables updated with Railway URL
- [ ] Build successful
- [ ] Deployment successful
- [ ] App loading correctly
- [ ] API calls working

## 🧪 Testing Your Full Deployment

1. **Frontend**: Visit `https://abc6b38d.se-embe.pages.dev`
2. **Backend**: Test `https://your-railway-url.com/api`
3. **Database**: Try user registration/login
4. **Full Flow**: Create account → Add celebrant → Create event

## 🚀 Quick Deploy Commands

**Backend changes:**
```bash
git add backend/
git commit -m "Update backend"
git push origin main
```
Railway will auto-deploy.

**Frontend changes:**
```bash
git add .
git commit -m "Update frontend"  
git push origin main
```
Cloudflare will auto-deploy.

## 🔗 Useful URLs

- **Frontend**: https://abc6b38d.se-embe.pages.dev
- **Backend**: https://your-railway-url.up.railway.app
- **Railway Dashboard**: https://railway.app/dashboard
- **Cloudflare Dashboard**: https://dash.cloudflare.com

## 🆘 Troubleshooting

**Backend not starting:**
- Check Railway logs in dashboard
- Verify environment variables
- Check MongoDB connection

**Frontend API errors:**
- Verify VITE_API_URL is correct
- Check CORS configuration
- Test backend endpoints directly

**Database connection issues:**
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0 for Railway)
- Check connection string format
- Test connection from Railway logs

Your Se-Embe application will be fully deployed and production-ready! 🎉