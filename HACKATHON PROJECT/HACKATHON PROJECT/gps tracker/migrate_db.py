"""migrate_db.py — add missing columns to locations table."""
import sqlite3, os

db_path = os.path.join(os.path.dirname(__file__), "gps_tracker.db")
conn = sqlite3.connect(db_path)
cur  = conn.cursor()

cols = [row[1] for row in cur.execute("PRAGMA table_info(locations)")]
print("Existing columns:", cols)

if "device_id" not in cols:
    cur.execute('ALTER TABLE locations ADD COLUMN device_id TEXT DEFAULT ""')
    print("Added device_id")
else:
    print("device_id already exists")

if "device_name" not in cols:
    cur.execute('ALTER TABLE locations ADD COLUMN device_name TEXT DEFAULT ""')
    print("Added device_name")
else:
    print("device_name already exists")

conn.commit()
conn.close()
print("Migration complete.")
