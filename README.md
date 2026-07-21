# Emergency-GPS-Tracking-and-Smart-
================================================
  GPS Emergency Tracker
  Real-Time Location & Emergency Alert System
================================================

HOW TO RUN (Windows)
--------------------
1. Make sure Python is installed
   Download from: https://www.python.org/downloads/
   IMPORTANT: Check "Add Python to PATH" during install!

2. Double-click  run.bat
   - It auto-installs all required packages
   - It starts the server automatically

3. Open your browser and go to:
   http://localhost:5000

4. Login with:
   Email   : admin@gpstracker.com
   Password: admin123

TRACK ON MOBILE PHONE
----------------------
1. Connect your phone to the same WiFi as your PC
2. Find your PC IP: run.bat shows it automatically
   OR open Command Prompt and type: ipconfig
   Look for "IPv4 Address" (e.g. 192.168.1.5)
3. On your phone browser, open:
   http://192.168.1.5:5000
4. Login → Tracker → Start Tracking
5. On PC, go to "My Devices" to see all phones on map

FEATURES
--------
* Live GPS tracking on interactive map
* SOS emergency button
* Auto emergency detection (no movement = alert)
* Email alerts to emergency contacts (Gmail)
* Voice call alerts (Twilio - free trial)
* Multi-device tracking (see all phones on one map)
* Geofencing / safe zones
* Location history
* Admin dashboard

CONFIGURE EMAIL ALERTS
-----------------------
1. Go to Settings page in the app
2. Enter your Gmail address
3. Enter Gmail App Password (NOT your normal password)
   Get App Password: Google Account > Security > 2-Step > App Passwords
4. Click Save - done!

CONFIGURE VOICE CALL ALERTS
-----------------------------
1. Sign up free at: https://www.twilio.com/try-twilio
2. Copy Account SID, Auth Token, and free phone number
3. Go to Settings in the app > Twilio section
4. Enter details and click Save
5. Test with "Send Test Call" button

FILES
-----
app.py          - Main server (Flask)
models.py       - Database models
emergency.py    - Emergency detection
notifier.py     - Email + voice call alerts
config.py       - App settings
run.bat         - One-click start script
static/         - CSS, JavaScript files
templates/      - HTML pages
requirements.txt- Python package list

SUPPORT
-------
If something doesn't work:
1. Make sure Python is installed and in PATH
2. Run run.bat as Administrator
3. Allow firewall access when asked

================================================
