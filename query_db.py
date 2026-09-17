import sqlite3
conn = sqlite3.connect('backend/Cognova.db')
c = conn.cursor()
c.execute("SELECT id, page_id, type FROM page_sections")
print(c.fetchall())
