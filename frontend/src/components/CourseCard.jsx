import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, BarChart2, ArrowRight, Sparkles, Users } from 'lucide-react';
import { EnrollmentModal } from './EnrollmentModal';

export const CourseCard = ({ course }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!course) return null;
  const courseSlug = course.slug || course.id;

  return (
    <>
      <div 
        className="card card-hover-lift" 
        style={{ 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          padding: 0,
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <Link 
          to={`/courses/${courseSlug}`} 
          style={{ 
            display: 'block', 
            height: '210px', 
            position: 'relative', 
            overflow: 'hidden',
            background: 'var(--color-surface-muted)'
          }} 
          aria-label={`View details for ${course.title}`}
        >
          <img
            src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
            alt={course.title}
            loading="lazy"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
          {course.category && (
            <span style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}>
              {course.category}
            </span>
          )}
          <span style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            Hybrid & Offline
          </span>
        </Link>

        <div style={{ padding: 'var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600, color: 'var(--color-primary)' }}>
              <BarChart2 size={14} /> {course.difficulty || 'All Levels'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
              <Clock size={14} style={{ color: 'var(--color-accent)' }} /> {course.duration || '4 Weeks'}
            </span>
          </div>

          <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.35, margin: 0 }}>
            <Link 
              to={`/courses/${courseSlug}`} 
              style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'inherit'; }}
            >
              {course.title}
            </Link>
          </h3>

          <p style={{ 
            fontSize: 'var(--text-sm)', 
            color: 'var(--color-text-muted)', 
            lineHeight: 1.6, 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden',
            margin: 0
          }}>
            {course.description}
          </p>

          {course.age_group && (
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} /> Cohort: {course.age_group}
            </div>
          )}

          <div style={{ marginTop: 'auto', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ flex: 1, fontWeight: 700 }}
              aria-label={`Enroll in ${course.title}`}
            >
              <Sparkles size={14} /> Enroll Now
            </button>

            <Link 
              to={`/courses/${courseSlug}`} 
              className="btn btn-secondary btn-sm" 
              aria-label={`View syllabus for ${course.title}`}
            >
              Details <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <EnrollmentModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
