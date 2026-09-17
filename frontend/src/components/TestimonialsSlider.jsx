import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Award, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ananya Deshmukh',
    role: 'CBSE Class 10 Topper (98.6%)',
    program: 'Grade 10 Foundation Mastery',
    rating: 5,
    text: 'The conceptual clarity and structured test series at Cognova completely changed my perspective on Mathematics and Physics. The faculty didn’t just teach formulas; they taught us how to think.',
    badge: 'State Rank 4',
    avatarBg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)'
  },
  {
    id: 2,
    name: 'Dr. Rajesh Sundaram',
    role: 'Parent of Siddharth (Class 12 JEE Batch)',
    program: 'NEET / JEE Integrated Sciences',
    rating: 5,
    text: 'As a doctor, I value discipline and depth. The mentorship and personalized doubt-clearing sessions here gave my son the competitive edge without burning him out. Truly unmatched institutional quality.',
    badge: 'Parent Review',
    avatarBg: 'linear-gradient(135deg, #d97706, #f59e0b)'
  },
  {
    id: 3,
    name: 'Pooja Kulkarni',
    role: 'Olympiad Gold Medalist & Class 12 Scholar',
    program: 'Advanced Physics & Calculus Masterclass',
    rating: 5,
    text: 'The problem-solving frameworks taught here are world-class. From Olympiad challenges to high-pressure timed board exams, the preparation was so thorough that actual exams felt effortless.',
    badge: 'Olympiad Gold',
    avatarBg: 'linear-gradient(135deg, #059669, #10b981)'
  },
  {
    id: 4,
    name: 'Kavitha Ranganathan',
    role: 'Parent of Meera (Class 8 & 9 Abacus & Vedic Math)',
    program: 'Junior Cognitive Foundation',
    rating: 5,
    text: 'My daughter’s mental calculation speed and overall confidence in school skyrocketed within 3 months. The warmth and dedication of the teaching staff are exemplary.',
    badge: 'Parent Review',
    avatarBg: 'linear-gradient(135deg, #7c3aed, #a855f7)'
  }
];

export default function TestimonialsSlider({ className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div 
      className={`testimonial-carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0 var(--space-4)'
      }}
    >
      <div 
        className="card card-glow"
        style={{
          padding: 'var(--space-10) var(--space-8)',
          borderRadius: 'var(--radius-2xl)',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xl)',
          minHeight: '380px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Background Watermark Quote */}
        <Quote 
          style={{
            position: 'absolute',
            top: '20px',
            right: '28px',
            width: '80px',
            height: '80px',
            color: 'var(--color-border-subtle)',
            opacity: 0.35,
            pointerEvents: 'none'
          }} 
        />

        {/* Top Header: Star Ratings + Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)', zIndex: 1 }}>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b' }}>
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={18} fill="#f59e0b" style={{ color: '#f59e0b' }} />
            ))}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            border: '1px solid var(--color-primary-100)'
          }}>
            <Award size={14} />
            {current.badge}
          </div>
        </div>

        {/* Testimonial Quote Text */}
        <blockquote style={{
          margin: 'var(--space-6) 0',
          fontSize: 'var(--text-lg)',
          lineHeight: 1.65,
          color: 'var(--color-text)',
          fontWeight: 400,
          fontStyle: 'normal',
          zIndex: 1,
          transition: 'all 0.3s ease'
        }}>
          "{current.text}"
        </blockquote>

        {/* Student/Parent Info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', zIndex: 1, paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-full)',
              background: current.avatarBg,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 'var(--text-md)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              {current.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ margin: 0, fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-text)' }}>
                  {current.name}
                </h4>
                <CheckCircle2 size={15} style={{ color: '#10b981' }} />
              </div>
              <p style={{ margin: '2px 0 0', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {current.role} &bull; <span style={{ color: 'var(--color-primary)' }}>{current.program}</span>
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button
              onClick={prevSlide}
              aria-label="Previous testimonial"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.background = 'var(--color-primary-50)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.background = 'var(--color-surface)';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next testimonial"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.style.background = 'var(--color-primary-50)';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.background = 'var(--color-surface)';
                e.currentTarget.style.color = 'var(--color-text)';
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicator Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: 'var(--space-6)' }}>
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
            style={{
              width: currentIndex === index ? '28px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background: currentIndex === index ? 'var(--color-primary)' : 'var(--color-border-subtle)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0
            }}
          />
        ))}
      </div>
    </div>
  );
}
