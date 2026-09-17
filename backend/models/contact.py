from datetime import datetime
from extensions import db

class ContactSetting(db.Model):
    __tablename__ = 'contact_settings'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), default='coach.sindhuram@gmail.com')
    phone = db.Column(db.String(50), default='+91 90803 85589')
    whatsapp = db.Column(db.String(50), default='+919080385589')
    address = db.Column(db.Text, default='Coach Sindhu Ram Academy, Tamil Nadu, India')
    location_name = db.Column(db.String(150), default='Cognova')
    latitude = db.Column(db.String(50), default='11.0168445')
    longitude = db.Column(db.String(50), default='76.9558321')
    google_maps_url = db.Column(db.Text, nullable=True)
    apple_maps_url = db.Column(db.Text, nullable=True)
    maps_embed_url = db.Column(db.Text, default='https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed')
    working_hours = db.Column(db.String(150), default='Monday - Saturday: 8:30 AM - 6:30 PM')
    contact_form_recipient = db.Column(db.String(120), default='coach.sindhuram@gmail.com')
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'phone': self.phone,
            'whatsapp': self.whatsapp or self.phone,
            'address': self.address,
            'location_name': self.location_name or 'Cognova',
            'latitude': self.latitude or '11.0168445',
            'longitude': self.longitude or '76.9558321',
            'google_maps_url': self.google_maps_url or '',
            'apple_maps_url': self.apple_maps_url or '',
            'maps_embed_url': self.maps_embed_url,
            'academy_location': {
                'name': self.location_name or 'Cognova',
                'address': self.address or 'Coach Sindhu Ram Academy, Tamil Nadu, India',
                'latitude': self.latitude or '11.0168445',
                'longitude': self.longitude or '76.9558321',
                'google_maps_url': self.google_maps_url or '',
                'apple_maps_url': self.apple_maps_url or '',
                'maps_embed_url': self.maps_embed_url or 'https://maps.google.com/maps?q=Cognova%20Academy%20Coach%20Sindhu%20Ram&t=&z=15&ie=UTF8&iwloc=&output=embed'
            },
            'working_hours': self.working_hours,
            'contact_form_recipient': self.contact_form_recipient,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
