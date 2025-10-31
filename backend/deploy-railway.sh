#!/bin/bash

echo "🚂 Deploying Se-Embe Backend to Railway"
echo "======================================"

# Check if we're in the backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "🔍 Checking dependencies..."
npm install

echo "🚀 Deploying to Railway..."
railway up

if [ $? -eq 0 ]; then
    echo "✅ Backend deployment successful!"
    echo "🌐 Your API should be available at your Railway URL"
    echo ""
    echo "🔗 Next steps:"
    echo "1. Copy your Railway URL from the dashboard"
    echo "2. Update your frontend VITE_API_URL environment variable"
    echo "3. Redeploy your frontend to Cloudflare Pages"
else
    echo "❌ Deployment failed!"
    exit 1
fi