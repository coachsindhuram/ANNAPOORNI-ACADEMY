from datetime import datetime
from extensions import db

class WebsiteSetting(db.Model):
    __tablename__ = 'website_settings'

    id = db.Column(db.Integer, primary_key=True)
    site_name = db.Column(db.String(150), nullable=False, default='Cognova')
    logo_url = db.Column(db.String(500), nullable=True)
    favicon_url = db.Column(db.String(500), nullable=True)
    site_description = db.Column(db.Text, nullable=True)
    tagline = db.Column(db.String(255), nullable=True, default='Think Better. Learn Faster. Grow Smarter.')
    dark_mode_default = db.Column(db.Boolean, default=False)
    location_name = db.Column(db.String(150), default='Cognova')
    address = db.Column(db.Text, default='Cognova Academy, Tamil Nadu, India')
    latitude = db.Column(db.String(50), default='11.0168445')
    longitude = db.Column(db.String(50), default='76.9558321')
    google_maps_url = db.Column(db.Text, nullable=True)
    apple_maps_url = db.Column(db.Text, nullable=True)
    maps_embed_url = db.Column(db.Text, default='https://maps.google.com/maps?q=Cognova&t=&z=15&ie=UTF8&iwloc=&output=embed')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'site_name': self.site_name,
            'logo_url': self.logo_url,
            'favicon_url': self.favicon_url,
            'site_description': self.site_description,
            'tagline': self.tagline,
            'dark_mode_default': self.dark_mode_default,
            'location_name': self.location_name or 'Cognova',
            'address': self.address or 'Cognova Academy, Tamil Nadu, India',
            'latitude': self.latitude or '11.0168445',
            'longitude': self.longitude or '76.9558321',
            'google_maps_url': self.google_maps_url or '',
            'apple_maps_url': self.apple_maps_url or '',
            'maps_embed_url': self.maps_embed_url or 'https://maps.google.com/maps?q=Cognova&t=&z=15&ie=UTF8&iwloc=&output=embed',
            'academy_location': {
                'name': self.location_name or 'Cognova',
                'address': self.address or 'Cognova Academy, Tamil Nadu, India',
                'latitude': self.latitude or '11.0168445',
                'longitude': self.longitude or '76.9558321',
                'google_maps_url': self.google_maps_url or '',
                'apple_maps_url': self.apple_maps_url or '',
                'maps_embed_url': self.maps_embed_url or 'https://maps.google.com/maps?q=Cognova&t=&z=15&ie=UTF8&iwloc=&output=embed'
            },
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

