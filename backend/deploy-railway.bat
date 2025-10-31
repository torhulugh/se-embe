@echo off
echo 🚂 Deploying Se-Embe Backend to Railway
echo ======================================

REM Check if we're in the backend directory
if not exist "package.json" (
    echo ❌ Please run this script from the backend directory
    exit /b 1
)

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Railway CLI...
    npm install -g @railway/cli
)

echo 🔍 Checking dependencies...
call npm install

echo 🚀 Deploying to Railway...
call railway up

if %errorlevel% equ 0 (
    echo ✅ Backend deployment successful!
    echo 🌐 Your API should be available at your Railway URL
    echo.
    echo 🔗 Next steps:
    echo 1. Copy your Railway URL from the dashboard
    echo 2. Update your frontend VITE_API_URL environment variable
    echo 3. Redeploy your frontend to Cloudflare Pages
) else (
    echo ❌ Deployment failed!
    exit /b 1
)

pause