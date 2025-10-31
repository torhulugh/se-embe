#!/bin/bash

echo "🚀 Se-Embe Full Stack Deployment"
echo "================================"
echo "Frontend: Cloudflare Pages"
echo "Backend: Railway"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if railway is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

read -p "Deploy backend to Railway? (y/n): " deploy_backend
read -p "Deploy frontend to Cloudflare? (y/n): " deploy_frontend

if [ "$deploy_backend" = "y" ]; then
    echo ""
    echo "🚂 Deploying Backend to Railway..."
    echo "================================="
    
    cd backend
    
    echo "📦 Installing backend dependencies..."
    npm install
    
    echo "🚀 Deploying to Railway..."
    railway up
    
    if [ $? -eq 0 ]; then
        echo "✅ Backend deployment successful!"
    else
        echo "❌ Backend deployment failed!"
        exit 1
    fi
    
    cd ..
fi

if [ "$deploy_frontend" = "y" ]; then
    echo ""
    echo "☁️ Deploying Frontend to Cloudflare..."
    echo "====================================="
    
    # Install dependencies
    echo "📦 Installing frontend dependencies..."
    npm install
    
    # Run linting
    echo "🔍 Running linting..."
    npm run lint
    if [ $? -ne 0 ]; then
        echo "❌ Linting failed! Please fix errors before deploying."
        exit 1
    fi
    
    # Build for production
    echo "🏗️  Building for production..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
    
    # Deploy to Cloudflare Pages
    echo "🚀 Deploying to Cloudflare Pages..."
    wrangler pages deploy dist --project-name se-embe
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend deployment successful!"
    else
        echo "❌ Frontend deployment failed!"
        exit 1
    fi
fi

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "🌐 Your app URLs:"
echo "Frontend: https://abc6b38d.se-embe.pages.dev"
echo "Backend: Check your Railway dashboard for the URL"
echo ""
echo "🔗 Next steps:"
echo "1. Copy your Railway backend URL"
echo "2. Update Cloudflare Pages environment variables:"
echo "   VITE_API_URL=https://your-railway-url.railway.app/api"
echo "3. Redeploy frontend if needed"