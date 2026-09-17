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
        background: 'radial-gradient(120% 120% at 50% 0%, #0F1E36 0%, #080D1A 100%)',
        color: '#FFFFFF',
        padding: 'var(--space-16) 0 var(--space-12)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-glow-orb hero-glow-1" style={{ top: '-20%', left: '25%', width: '450px', height: '450px' }} />
        <div className="container" style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(217, 119, 6, 0.15)',
            border: '1px solid rgba(217, 119, 6, 0.35)',
            color: 'var(--color-accent-light)',
            fontWeight: 700,
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)'
          }}>
            <Sparkles size={15} /> Empowering Minds Through Cognitive Mastery
          </div>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
            color: '#FFFFFF',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.15,
            fontWeight: 800,
            letterSpacing: '-0.02em'
          }}>
            About {settings.site_name || 'Cognova'}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.18rem)', color: 'rgba(241, 245, 249, 0.85)', lineHeight: 1.65, margin: 0 }}>
            Pioneering the intersection of ancient Vedic computational wisdom and modern cognitive neuroscience to unlock rapid mental calculations, photogenic memory, and supercharged reading skills.
          </p>
        </div>
      </section>

      {/* 2. FOUNDER STORY & SPECIALIZATION */}
      <section className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
        <div className="responsive-grid-1-1" style={{ alignItems: 'center', gap: 'var(--space-12)' }}>
          <div>
            <span style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Meet Coach Sindhu Ram
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)', lineHeight: 1.25 }}>
              Master Vedic Maths Coach & Cognitive Training Specialist
            </h2>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-4)', fontSize: 'var(--text-md)' }}>
              Coach Sindhu Ram is the founder and lead educator at Cognova. With extensive pedagogical research and direct coaching experience, she has mentored over <strong>15,000+ students and competitive exam aspirants</strong> across India and internationally.
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)', fontSize: 'var(--text-md)' }}>
              Her mission is to eradicate mathematics anxiety, replace brute rote memorization with structured mnemonic associations, and train learners to process information 300% faster with crystalline comprehension.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <Link to="/courses" className="btn btn-primary">
                Explore Coaching Programs <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hi Coach Sindhu Ram, I would like to learn more about your coaching programs.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <MessageCircle size={18} style={{ color: '#25D366' }} /> Chat with Coach
              </a>
            </div>
          </div>

          <div className="card card-glow" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)', margin: 0 }}>
              Key Specializations & Credentials
            </h3>

            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-md)', margin: '0 0 4px', fontWeight: 700, color: 'var(--color-text)' }}>
                  16 Vedic Mathematics Sutras
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                  Mastery over the 16 primary Sutras and 13 sub-sutras for 10x faster arithmetic, square roots, and algebraic operations.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Brain size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-md)', margin: '0 0 4px', fontWeight: 700, color: 'var(--color-text)' }}>
                  Cognitive Memory Architecture
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                  Memory Palace (Loci), Major System, and peg strategies for memorizing complex formulas, tables, and historical timelines.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(217, 119, 6, 0.1)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <BookOpen size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: 'var(--text-md)', margin: '0 0 4px', fontWeight: 700, color: 'var(--color-text)' }}>
                  Supercharged Speed Reading
                </h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>
                  Visual fixation expansion and elimination of sub-vocalization to absorb complex texts at 2x-3x normal speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 3-PILLAR FOUNDATION */}
      <section style={{ background: 'var(--color-surface-muted)', padding: 'var(--space-16) var(--space-4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              fontSize: 'var(--text-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              Curriculum Pillars
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              The Academy Curriculum Matrix
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', margin: 0 }}>
              Every program at Cognova is built on proven cognitive science and hands-on drill systems.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            <div className="card card-hover-lift" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-primary-50)',
                color: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 700 }}>Vedic Mathematics</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                Replaces slow scratchpad calculations with direct one-line mental operations. Covers Nikhilam, Urdhva Tiryagbhyam, Anurupyena, and algebraic shortcuts.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> 10x calculation speed
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> 100% elimination of fear of math
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> Olympiad & contest excellence
                </li>
              </ul>
            </div>

            <div className="card card-hover-lift" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <Brain size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 700 }}>Memory Coaching</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                Trains both hemispheres of the brain to associate abstract information with vivid spatial anchors, yielding instantaneous recall during exams.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> Memorize 100+ items effortlessly
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> Retain formulas & periodic tables
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> High concentration & focus span
                </li>
              </ul>
            </div>

            <div className="card card-hover-lift" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(217, 119, 6, 0.1)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)', fontWeight: 700 }}>Speed Reading</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                Expands peripheral vision and teaches chunk-reading strategies so students can finish textbooks and exam passages in half the time.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> 600-800 words per minute
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> 85%+ comprehension rate
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)', color: 'var(--color-text)' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669' }} /> Effortless revision cycles
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION */}
      <section className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>
          <div className="card" style={{ padding: 'var(--space-8)', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <Compass size={26} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>Our Vision</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: 'var(--text-md)', margin: 0 }}>
              To build a generation of confident, high-speed, self-reliant learners who approach complex numerical and analytical challenges with joy, precision, and cognitive ease.
            </p>
          </div>

          <div className="card" style={{ padding: 'var(--space-8)', borderLeft: '4px solid var(--color-accent)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-3)' }}>
              <Target size={26} style={{ color: 'var(--color-accent)' }} />
              <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>Our Mission</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, fontSize: 'var(--text-md)', margin: 0 }}>
              To democratize high-performance mental training by providing accessible live online cohorts, personalized 1-on-1 mentorship, and structured drill kits to students worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section style={{
        background: 'radial-gradient(100% 100% at 50% 0%, #152E58 0%, #0B132B 100%)',
        color: '#FFFFFF',
        padding: 'var(--space-14) 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#FFFFFF', marginBottom: 'var(--space-3)' }}>
            Begin Your Learning Transformation
          </h2>
          <p style={{ fontSize: 'var(--text-md)', color: 'rgba(241, 245, 249, 0.85)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
            Join our upcoming live batch or schedule an initial assessment with Coach Sindhu Ram.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses" className="btn btn-accent btn-lg" style={{ fontWeight: 700 }}>
              Explore Available Courses
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg" style={{ background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
              Book Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
