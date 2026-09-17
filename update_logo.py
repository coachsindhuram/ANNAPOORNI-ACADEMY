import sqlite3
conn = sqlite3.connect('backend/Cognova.db')
c = conn.cursor()
c.execute("UPDATE website_settings SET logo_url='/logo.svg'")
conn.commit()
print("Logo updated")
