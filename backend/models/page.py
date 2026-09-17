from datetime import datetime
import json
from extensions import db

class Page(db.Model):
    __tablename__ = 'pages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    status = db.Column(db.String(20), default='draft') # draft, published
    seo_title = db.Column(db.String(255), nullable=True)
    seo_description = db.Column(db.Text, nullable=True)
    is_home = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    sections = db.relationship('PageSection', backref='page', lazy=True, cascade="all, delete-orphan", order_by="PageSection.display_order")
    versions = db.relationship('PageVersion', backref='page', lazy=True, cascade="all, delete-orphan", order_by="PageVersion.created_at.desc()")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'status': self.status,
            'seo_title': self.seo_title,
            'seo_description': self.seo_description,
            'is_home': self.is_home,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'sections': [s.to_dict() for s in self.sections] if self.sections else []
        }

class PageSection(db.Model):
    __tablename__ = 'page_sections'

    id = db.Column(db.Integer, primary_key=True)
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False) # e.g. hero, text, image, course-grid
    display_order = db.Column(db.Integer, default=0)
    
    # Configuration JSONs
    content_json = db.Column(db.Text, nullable=True)
    styles_json = db.Column(db.Text, nullable=True)
    responsive_json = db.Column(db.Text, nullable=True)
    animation_json = db.Column(db.Text, nullable=True)

    def _get_json(self, field):
        if not field:
            return {}
        try:
            return json.loads(field)
        except Exception:
            return {}

    def to_dict(self):
        return {
            'id': self.id,
            'page_id': self.page_id,
            'type': self.type,
            'display_order': self.display_order,
            'content': self._get_json(self.content_json),
            'styles': self._get_json(self.styles_json),
            'responsive': self._get_json(self.responsive_json),
            'animation': self._get_json(self.animation_json)
        }

class PageVersion(db.Model):
    __tablename__ = 'page_versions'

    id = db.Column(db.Integer, primary_key=True)
    page_id = db.Column(db.Integer, db.ForeignKey('pages.id'), nullable=False)
    version_name = db.Column(db.String(100), nullable=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'), nullable=True)
    snapshot_json = db.Column(db.Text, nullable=False) # The fully rendered page tree at publish time
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def get_snapshot(self):
        try:
            return json.loads(self.snapshot_json)
        except Exception:
            return {}

    def to_dict(self):
        return {
            'id': self.id,
            'page_id': self.page_id,
            'version_name': self.version_name,
            'admin_id': self.admin_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'snapshot': self.get_snapshot()
        }
