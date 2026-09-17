import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { 
  Award, BookOpen, Users, Globe, CheckCircle2, Sparkles, Brain, Zap, Compass, 
  Target, ShieldCheck, ArrowRight, MessageCircle 
} from 'lucide-react';

export const About = () => {
  const { settings, contactInfo } = useSiteSettings();
  const whatsappNum = (contactInfo?.whatsapp || contactInfo?.phone || '+919080385589').replace(/[^0-9]/g, '');

  return (
    <div>
      {/* 1. LUXURY HERO BANNER */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: 'linear-gradient(to bottom right, var(--color-primary-dark), var(--color-primary), var(--color-surface-dark))', 
        color: 'white',
        padding: 'var(--space-20) 0 var(--space-16)'
      }}>
        <div style={{ position: 'absolute', top: '-20%', left: '25%', width: '450px', height: '450px', background: 'var(--color-accent)', borderRadius: '50%', mixBlendMode: 'screen', filter: 'blur(100px)', opacity: 0.2, pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div className="badge-glow" style={{ marginBottom: 'var(--space-6)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-accent)', fontSize: 'var(--text-xs)' }}>
            <Sparkles size={15} /> Empowering Minds Through Cognitive Mastery
          </div>
          <h1 style={{ color: '#FFFFFF', marginBottom: 'var(--space-6)', fontSize: 'var(--text-4xl)' }}>
            About {settings.site_name || 'Cognova'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', maxWidth: '800px', margin: '0 auto' }}>
            Pioneering the intersection of ancient Vedic computational wisdom and modern cognitive neuroscience to unlock rapid mental calculations, photogenic memory, and supercharged reading skills.
          </p>
        </div>
      </section>

      {/* 2. FOUNDER STORY & SPECIALIZATION */}
      <section className="container" style={{ padding: 'var(--space-20) 1.5rem' }}>
        <div className="responsive-grid-1-1">
          <div>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)', display: 'block' }}>
              Meet Coach Sindhu Ram
            </span>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)', color: 'var(--color-text)' }}>
              Master Vedic Maths Coach & Cognitive Training Specialist
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-6)' }}>
              Coach Sindhu Ram is the founder and lead educator at Cognova. With extensive pedagogical research and direct coaching experience, she has mentored over <strong>15,000+ students and competitive exam aspirants</strong> across India and internationally.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', marginBottom: 'var(--space-8)' }}>
              Her mission is to eradicate mathematics anxiety, replace brute rote memorization with structured mnemonic associations, and train learners to process information 300% faster with crystalline comprehension.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/courses" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Coaching Programs <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hi Coach Sindhu Ram, I would like to learn more about your coaching programs.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <MessageCircle size={18} style={{ color: '#10B981' }} /> Chat with Coach
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-8) var(--space-10)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', color: 'var(--color-text)' }}>
              Key Specializations & Credentials
            </h3>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: '0.25rem' }}>
                  16 Vedic Mathematics Sutras
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                  Mastery over the 16 primary Sutras and 13 sub-sutras for 10x faster arithmetic, square roots, and algebraic operations.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Brain size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: '0.25rem' }}>
                  Cognitive Memory Architecture
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                  Memory Palace (Loci), Major System, and peg strategies for memorizing complex formulas, tables, and historical timelines.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-accent-light)', color: 'var(--color-accent-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={24} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', marginBottom: '0.25rem' }}>
                  Supercharged Speed Reading
                </h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                  Visual fixation expansion and elimination of sub-vocalization to absorb complex texts at 2x-3x normal speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 3-PILLAR FOUNDATION */}
      <section style={{ background: 'var(--color-surface-muted)', padding: 'var(--space-20) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-16)' }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-2)', display: 'block' }}>
              Curriculum Pillars
            </span>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
              The Academy Curriculum Matrix
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)' }}>
              Every program at Cognova is built on proven cognitive science and hands-on drill systems.
            </p>
          </div>

          <div className="responsive-card-grid">
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem', color: 'var(--color-text)' }}>Vedic Mathematics</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: '1.5rem' }}>
                Replaces slow scratchpad calculations with direct one-line mental operations. Covers Nikhilam, Urdhva Tiryagbhyam, Anurupyena, and algebraic shortcuts.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} /> 10x calculation speed
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} /> 100% elimination of fear of math
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Olympiad & contest excellence
                </li>
              </ul>
            </div>

            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Brain size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem', color: 'var(--color-text)' }}>Memory Coaching</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: '1.5rem' }}>
                Trains both hemispheres of the brain to associate abstract information with vivid spatial anchors, yielding instantaneous recall during exams.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: '#A855F7', flexShrink: 0 }} /> Memorize 100+ items effortlessly
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: '#A855F7', flexShrink: 0 }} /> Retain formulas & periodic tables
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: '#A855F7', flexShrink: 0 }} /> High concentration & focus span
                </li>
              </ul>
            </div>

            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'var(--color-accent-light)', color: 'var(--color-accent-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.75rem', color: 'var(--color-text)' }}>Speed Reading</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: '1.5rem' }}>
                Expands peripheral vision and teaches chunk-reading strategies so students can finish textbooks and exam passages in half the time.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /> 600-800 words per minute
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /> 85%+ comprehension rate
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'var(--text-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} /> Effortless revision cycles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="container" style={{ padding: 'var(--space-20) 1.5rem' }}>
        <div className="responsive-grid-1-1">
          <div className="card" style={{ padding: 'var(--space-10)', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Compass size={32} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>Our Vision</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', margin: 0 }}>
              To build a generation of confident, high-speed, self-reliant learners who approach complex numerical and analytical challenges with joy, precision, and cognitive ease.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-10)', borderLeft: '4px solid var(--color-accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Target size={32} style={{ color: 'var(--color-accent)' }} />
              <h3 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>Our Mission</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-lg)', margin: 0 }}>
              To democratize high-performance mental training by providing accessible live online cohorts, personalized 1-on-1 mentorship, and structured drill kits to students worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section style={{ 
        background: 'linear-gradient(to right, var(--color-primary), var(--color-primary-dark))', 
        color: 'white', 
        padding: 'var(--space-20) 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', marginBottom: 'var(--space-6)', fontSize: 'var(--text-3xl)' }}>
            Begin Your Learning Transformation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-10)' }}>
            Join our upcoming live batch or schedule an initial assessment with Coach Sindhu Ram.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses" className="btn btn-accent btn-lg" style={{ fontWeight: 700 }}>
              Explore Available Courses
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Book Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
