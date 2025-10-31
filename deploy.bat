@echo off
echo 🚀 Se-Embe Deployment Helper
echo ==========================

REM Build frontend
echo 📦 Building frontend...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    exit /b 1
)

echo ✅ Frontend build successful!

REM Check if dist folder exists
if exist "dist\" (
    echo ✅ Build output ready in 'dist' folder
) else (
    echo ❌ Build output not found!
    exit /b 1
)

echo.
echo 🎯 Next Steps:
echo 1. Push your code to GitHub
echo 2. Deploy backend to Railway/Render
echo 3. Deploy frontend to Cloudflare Pages
echo 4. Update environment variables
echo.
echo 📖 See CLOUDFLARE_DEPLOYMENT.md for detailed instructions
pause