#!/bin/bash

# Se-Embe Deployment Helper Script

echo "🚀 Se-Embe Deployment Helper"
echo "=========================="

# Build frontend
echo "📦 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "✅ Build output ready in 'dist' folder"
    echo "📊 Build size:"
    du -sh dist/
else
    echo "❌ Build output not found!"
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway/Render"
echo "3. Deploy frontend to Cloudflare Pages"
echo "4. Update environment variables"
echo ""
echo "📖 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions"