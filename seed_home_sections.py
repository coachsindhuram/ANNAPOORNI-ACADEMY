import sqlite3
import json

def seed_home():
    conn = sqlite3.connect('backend/Cognova.db')
    c = conn.cursor()
    
    # Check if page 'home' exists
    c.execute("SELECT id FROM pages WHERE slug='home'")
    row = c.fetchone()
    if not row:
        c.execute("SELECT id FROM pages WHERE slug=''")
        row = c.fetchone()
        if not row:
            print("No home page found!")
            return
            
    page_id = row[0]
    
    # Delete existing sections just in case
    c.execute("DELETE FROM page_sections WHERE page_id=?", (page_id,))
    
    sections = [
        {
            "type": "hero",
            "display_order": 0,
            "content": {
                "title": "Think Better. Learn Faster. Grow Smarter.",
                "subtitle": "Join the premier platform for academic excellence and competitive coaching.",
                "primaryCtaText": "Explore Courses",
                "primaryCtaLink": "/courses",
                "secondaryCtaText": "Learn More",
                "secondaryCtaLink": "/about",
                "backgroundImage": "/images/hero-bg.jpg"
            },
            "styles": {
                "paddingTop": "6rem",
                "paddingBottom": "6rem",
                "backgroundColor": "transparent"
            }
        },
        {
            "type": "richtext",
            "display_order": 1,
            "content": {
                "text": "<h2>Our Core Values</h2><p>Structured Learning, Practical Skills, and Dedicated Mentorship.</p>"
            },
            "styles": {
                "paddingTop": "4rem",
                "paddingBottom": "4rem",
                "backgroundColor": "#FFF9EF"
            }
        },
        {
            "type": "course_grid",
            "display_order": 2,
            "content": {
                "title": "Featured Courses",
                "subtitle": "Discover our top-rated programs designed for success.",
                "limit": 6
            },
            "styles": {
                "paddingTop": "5rem",
                "paddingBottom": "5rem",
                "backgroundColor": "#FFFFFF"
            }
        },
        {
            "type": "testimonials",
            "display_order": 3,
            "content": {
                "title": "Why Cognova?",
                "subtitle": "Hear from our successful students and experienced faculty."
            },
            "styles": {
                "paddingTop": "4rem",
                "paddingBottom": "4rem",
                "backgroundColor": "#552B7A",
                "textColor": "#FFFFFF"
            }
        },
        {
            "type": "announcements",
            "display_order": 4,
            "content": {
                "title": "Latest News & Announcements",
                "subtitle": "Stay up to date with the latest from Cognova."
            },
            "styles": {
                "paddingTop": "4rem",
                "paddingBottom": "4rem",
                "backgroundColor": "#FFFFFF"
            }
        }
    ]
    
    for sec in sections:
        c.execute("""
            INSERT INTO page_sections (page_id, type, display_order, content_json, styles_json)
            VALUES (?, ?, ?, ?, ?)
        """, (
            page_id, 
            sec["type"], 
            sec["display_order"], 
            json.dumps(sec["content"]), 
            json.dumps(sec["styles"])
        ))
        
    conn.commit()
    print("Successfully seeded home page sections.")
    
if __name__ == '__main__':
    seed_home()
