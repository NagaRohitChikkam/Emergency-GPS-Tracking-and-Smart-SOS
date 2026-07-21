@echo off
title GPS Emergency Tracker
color 0A
cls

echo.
echo  ========================================================
echo    GPS Emergency Tracker - Starting Up...
echo  ========================================================
echo.

:: Check Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Python is not installed!
    echo.
    echo  Please install Python from: https://www.python.org/downloads/
    echo  Make sure to check "Add Python to PATH" during install.
    echo.
    pause
    exit /b 1
)

echo  [OK] Python found.

:: Install required packages automatically
echo  [..] Installing required packages (first time may take a minute)...
pip install flask flask-login flask-sqlalchemy flask-socketio eventlet bcrypt requests python-dotenv twilio >nul 2>&1
echo  [OK] Packages ready.

:: Find local IP for mobile access
echo.
echo  ========================================================
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4" ^| findstr /v "127.0.0.1"') do (
    set IP=%%a
    goto :found
)
:found
set IP=%IP: =%

echo    Open on this PC   :  http://localhost:5000
echo    Open on Mobile    :  http://%IP%:5000
echo    Admin Login       :  admin@gpstracker.com
echo    Admin Password    :  admin123
echo  ========================================================
echo.
echo  Press CTRL+C to stop the server.
echo.

:: Start Flask server
python app.py

pause
