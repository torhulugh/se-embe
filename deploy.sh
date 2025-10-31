#!/bin/bash

# Se-Embe Deployment Helper Script

echo "🚀 Se-Embe Deployment Helper"
echo "=========================="

# Build frontend
#!/bin/bash

echo "� Se-Embe Deployment to Cloudflare"
echo "=================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Install dependencies
echo "�📦 Installing dependencies..."
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
wrangler pages deploy dist --project-name se-embe --compatibility-date 2024-01-15

if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "🌐 Your app should be available at: https://se-embe.pages.dev"
else
    echo "❌ Deployment failed!"
    exit 1
fi

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