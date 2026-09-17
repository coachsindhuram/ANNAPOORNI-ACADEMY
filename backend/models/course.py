import json
from datetime import datetime
from extensions import db

class Course(db.Model):
    __tablename__ = 'courses'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    thumbnail_url = db.Column(db.String(500), nullable=True)
    category = db.Column(db.String(100), default='General')
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id', ondelete='SET NULL'), nullable=True)
    difficulty = db.Column(db.String(50), default='Beginner') # Beginner, Intermediate, Advanced
    duration = db.Column(db.String(50), default='4 Weeks')
    age_group = db.Column(db.String(100), default='Grade 4 - 12 & Adults')
    prerequisites = db.Column(db.String(255), default='Basic arithmetic and keen interest in rapid learning')
    learning_outcomes = db.Column(db.Text, nullable=True) # JSON list
    skills_developed = db.Column(db.Text, nullable=True) # JSON list
    faqs_json = db.Column(db.Text, nullable=True) # JSON list
    status = db.Column(db.String(20), default='published') # published, draft
    is_featured = db.Column(db.Boolean, default=False)
    display_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    modules = db.relationship('CourseModule', backref='course', lazy=True, cascade='all, delete-orphan')
    lessons = db.relationship('Lesson', backref='course', lazy=True, cascade='all, delete-orphan')
    quizzes = db.relationship('Quiz', backref='course', lazy=True, cascade='all, delete-orphan')

    def get_learning_outcomes(self):
        if not self.learning_outcomes:
            return []
        try:
            return json.loads(self.learning_outcomes)
        except Exception:
            return []

    def get_skills_developed(self):
        if not self.skills_developed:
            return []
        try:
            return json.loads(self.skills_developed)
        except Exception:
            return []

    def get_faqs(self):
        if not self.faqs_json:
            return []
        try:
            return json.loads(self.faqs_json)
        except Exception:
            return []

    def to_dict(self, include_details=False):
        data = {
            'id': self.id,
            'title': self.title,
            'slug': self.slug,
            'description': self.description,
            'thumbnail_url': self.thumbnail_url,
            'category': self.category,
            'subject_id': self.subject_id,
            'subject_name': self.subject.name if self.subject else None,
            'difficulty': self.difficulty,
            'duration': self.duration,
            'age_group': self.age_group or 'Grade 4 - 12 & Adults',
            'prerequisites': self.prerequisites or 'Basic arithmetic and keen interest in rapid learning',
            'learning_outcomes': self.get_learning_outcomes(),
            'skills_developed': self.get_skills_developed(),
            'faqs': self.get_faqs(),
            'status': self.status,
            'is_featured': self.is_featured,
            'display_order': self.display_order,
            'lesson_count': len(self.lessons) if self.lessons else 0,
            'quiz_count': len(self.quizzes) if self.quizzes else 0,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        if include_details:
            data['modules'] = [m.to_dict(include_lessons=True) for m in self.modules]
            data['quizzes'] = [q.to_dict() for q in self.quizzes if q.is_published]
        return data
