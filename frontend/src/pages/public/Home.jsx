import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { CourseCard } from '../../components/CourseCard';
import { AnnouncementCard } from '../../components/AnnouncementCard';
import CountUp from '../../components/CountUp';
import TestimonialsSlider from '../../components/TestimonialsSlider';
import { 
  ArrowRight, Award, Layers, CheckCircle, FileText, Clock, TrendingUp, Star, 
  MessageCircle, Sparkles, ChevronDown, ShieldCheck, BookOpen, Users, 
  Zap, Brain, Compass, Target
} from 'lucide-react';

export const Home = () => {
  const { contactInfo } = useSiteSettings();
  const [sections, setSections] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const rawWhatsapp = contactInfo?.whatsapp || contactInfo?.phone || '+919080385589';
  const whatsappNum = rawWhatsapp.replace(/[^0-9]/g, '');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [secRes, courseRes, annRes] = await Promise.all([
          API.get('/api/homepage').catch(() => ({ data: [] })),
          API.get('/api/courses?featured=true').catch(() => ({ data: [] })),
          API.get('/api/announcements?featured=true').catch(() => ({ data: [] }))
        ]);
        setSections(secRes.data || []);
        setFeaturedCourses(courseRes.data || []);
        setAnnouncements(annRes.data || []);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const getSection = (key) => sections.find(s => s.section_key === key && s.is_enabled);

  // Default verified hero content
  const heroData = getSection('hero');
  const hero = {
    title: heroData?.title || 'Master Vedic Maths, Memory & Speed Reading',
    subtitle: heroData?.subtitle || 'Unlock lightning-fast mental arithmetic, 100% exam recall, and rapid reading efficiency with personalized coaching by Coach Sindhu Ram.',
    image_url: heroData?.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80',
    cta_text: heroData?.cta_text || 'Explore Flagship Programs',
    cta_url: heroData?.cta_url || '/courses',
    secondary_cta_text: heroData?.secondary_cta_text || 'WhatsApp Consultation',
    secondary_cta_url: heroData?.secondary_cta_url || '/contact'
  };

  const defaultCourses = [
    {
      id: 1,
      slug: 'vedic-maths-speed-calculation-mastery',
      title: 'Vedic Maths & Speed Calculation Mastery',
      description: 'Learn 16 Vedic Sutras for lightning-fast mental arithmetic, rapid multiplication, and competition prep.',
      category: 'Vedic Maths',
      difficulty: 'All Levels',
      duration: '4 Weeks',
      age_group: 'Grade 4 - 12 & Adults',
      thumbnail_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      slug: 'memory-coaching-retention-masterclass',
      title: 'Memory Coaching & Retention Masterclass',
      description: 'Master cognitive recall techniques, mnemonic systems, mind mapping, and long-term memory strategy.',
      category: 'Memory Coaching',
      difficulty: 'All Levels',
      duration: '3 Weeks',
      age_group: 'Grade 6 - 12 & Adults',
      thumbnail_url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      slug: 'speed-reading-rapid-information-processing',
      title: 'Speed Reading & Rapid Information Processing',
      description: 'Double your reading speed, eliminate sub-vocalization, expand peripheral vision, and retain more text.',
      category: 'Speed Reading',
      difficulty: 'All Levels',
      duration: '2 Weeks',
      age_group: 'Grade 7 - 12 & Adults',
      thumbnail_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const displayCourses = featuredCourses.length > 0 ? featuredCourses : defaultCourses;
  const categories = ['All', ...new Set(displayCourses.map(c => c.category).filter(Boolean))];
  const filteredCourses = selectedCategory === 'All' 
    ? displayCourses 
    : displayCourses.filter(c => c.category === selectedCategory);

  const homeFaqs = [
    {
      q: 'How are the batches conducted at Cognova?',
      a: 'We conduct both Live Interactive Zoom Batches for global students and In-Person Classroom Coaching with Coach Sindhu Ram. Batches are intentionally capped in size to provide dedicated mentorship and instant doubt resolution.'
    },
    {
      q: 'What is the recommended age group for Vedic Maths and Memory Coaching?',
      a: 'Students from Grade 4 onwards (age 9+) can start Vedic Maths. Memory Coaching is suitable from Grade 6 onwards, while Speed Reading is recommended for Grade 7 to adults.'
    },
    {
      q: 'How do I secure a seat in an upcoming cohort?',
      a: 'Simply click "Enroll Now" on any course card or message admissions directly via WhatsApp. Our academic coordinator will share timetable options, batch dates, and enrollment details.'
    },
    {
      q: 'Are digital workbooks and reference materials included?',
      a: 'Yes. Enrolled students receive structured digital practice workbooks, mental calculation cheat sheets, and ongoing access to problem-solving drills.'
    },
    {
      q: 'Do you prepare students for National and State Speed Math Olympiads?',
      a: 'Yes. Our advanced batches include competition-specific speed drills, timed testing modules, and accuracy audits that have produced numerous state and national rank holders.'
    }
  ];

  return (
    <div className="home-page-container">
      {/* =====================================================================
          1. CINEMATIC PREMIUM HERO SECTION
          ===================================================================== */}
      <section className="hero-section" aria-label="Introduction" style={{ background: 'radial-gradient(circle at 50% 35%, rgba(242,184,75,0.16), transparent 40%), radial-gradient(120% 120% at 50% 0%, #0F1E36 0%, #080D1A 100%)' }}>
        {/* Ambient Glow Orbs */}
        <div className="hero-glow-orb hero-glow-1" style={{ top: '-10%', left: '15%', width: '450px', height: '450px' }} />
        <div className="hero-glow-orb hero-glow-2" style={{ bottom: '-10%', right: '10%', width: '500px', height: '500px' }} />

        {/* Gold Light Particles */}
        <div className="gold-particle" style={{ top: '20%', left: '25%', animationDelay: '0s' }} />
        <div className="gold-particle" style={{ top: '35%', left: '10%', animationDelay: '1.5s' }} />
        <div className="gold-particle" style={{ top: '15%', right: '30%', animationDelay: '2.5s' }} />
        <div className="gold-particle" style={{ bottom: '25%', left: '40%', animationDelay: '3.5s' }} />
        <div className="gold-particle" style={{ top: '40%', right: '15%', animationDelay: '4.5s' }} />
        <div className="gold-particle" style={{ bottom: '20%', right: '25%', animationDelay: '5.5s' }} />

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="responsive-grid-1-1" style={{ alignItems: 'center', gap: 'var(--space-12)' }}>
            
            {/* Left Content Column */}
            <div style={{ opacity: 1 }}>
              {/* Eyebrow */}
              <div className="hero-stagger-1">
                <div className="badge-glow badge-glow-premium">
                  <Sparkles size={15} style={{ color: 'var(--color-accent-light)' }} />
                  <span>Premier Cognitive & Mental Math Academy</span>
                </div>
              </div>

              {/* H1 Heading */}
              <div className="hero-stagger-2">
                <h1 className="glow-text-subtle" style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  lineHeight: 1.12,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  marginBottom: 'var(--space-5)',
                  color: '#FFFFFF'
                }}>
                  Master <span style={{
                    background: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>Vedic Maths</span>, Memory & Speed Reading
                </h1>
              </div>

              {/* Description */}
              <div className="hero-stagger-3">
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.18rem)',
                  lineHeight: 1.65,
                  color: 'rgba(241, 245, 249, 0.88)',
                  maxWidth: '560px',
                  marginBottom: 'var(--space-8)'
                }}>
                  {hero.subtitle}
                </p>
              </div>

              {/* Dual Action CTAs */}
              <div className="hero-stagger-4" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
                <Link 
                  to={hero.cta_url || '/courses'} 
                  className="btn btn-accent btn-lg"
                  style={{
                    boxShadow: '0 8px 24px rgba(217, 119, 6, 0.35)',
                    fontWeight: 700
                  }}
                >
                  {hero.cta_text || 'Explore Flagship Programs'} <ArrowRight size={18} />
                </Link>

                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Coach Sindhu Ram, I would like guidance on your coaching programs at Cognova.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    color: '#FFFFFF',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <MessageCircle size={18} style={{ color: '#25D366' }} /> WhatsApp Consultation
                </a>
              </div>

              {/* Social Proof Mini Bar */}
              <div className="hero-stagger-5" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <div style={{ display: 'flex', gap: '3px', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="#F59E0B" />
                  ))}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(241, 245, 249, 0.8)' }}>
                  <strong style={{ color: '#FFFFFF' }}>4.9/5 Rating</strong> from over 15,000+ students and parents across 12+ countries.
                </div>
              </div>
            </div>

            {/* Right Visual Stack with Layered Cards */}
            <div className="hero-stagger-visual" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: 'var(--radius-2xl)',
                overflow: 'hidden',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                background: '#0B132B'
              }}>
                <img
                  src={hero.image_url}
                  alt="Cognova Coaching"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80';
                  }}
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 55%, rgba(8, 13, 26, 0.88) 100%)'
                }} />
              </div>

              {/* Floating Badge 1: Live Batches */}
              <div className="card-glass-dark" style={{
                position: 'absolute',
                top: '-18px',
                right: '-12px',
                padding: '12px 18px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: 'var(--shadow-xl)',
                animation: 'float 4s ease-in-out infinite'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(5, 150, 105, 0.2)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Zap className="premium-icon-3d" size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)' }}>Admissions Open</div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#FFFFFF' }}>Live Zoom & Offline</div>
                </div>
              </div>

              {/* Floating Badge 2: Proven Mastery */}
              <div className="card-glass-dark" style={{
                position: 'absolute',
                bottom: '-22px',
                left: '-12px',
                padding: '14px 20px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: 'var(--shadow-xl)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Brain className="premium-icon-3d" size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: '#FFFFFF' }}>16 Ancient Sutras</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-light)' }}>10x Mental Speed</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ANIMATED STATISTICS TRUST BAR
          ===================================================================== */}
      <section style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-8) 0'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-6)',
            textAlign: 'center'
          }}>
            <div style={{ padding: 'var(--space-3)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                <CountUp end={15000} suffix="+" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Trained Students Worldwide
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-accent)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                <CountUp end={16} suffix=" Sutras" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Vedic Speed Calculation
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: 'var(--color-primary-dark)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                <CountUp end={99} suffix="%" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Exam Recall & Distinction
              </div>
            </div>

            <div style={{ padding: 'var(--space-3)' }}>
              <div style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#059669', letterSpacing: '-0.02em', lineHeight: 1 }}>
                <CountUp end={10} prefix="" suffix="x" />
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Faster Problem Resolution
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FLAGSHIP COACHING PROGRAMS WITH FILTER TABS
          ===================================================================== */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--color-surface-muted)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto var(--space-8)' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 'var(--text-xs)'
            }}>
              Curated Curriculum
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Flagship Coaching Programs
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', margin: 0 }}>
              Structured, high-impact programs designed to elevate calculation agility, memory retention, and rapid comprehension.
            </p>

            {/* Category Filter Pills */}
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '8px',
              marginTop: 'var(--space-6)',
              background: 'var(--color-surface)',
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)'
            }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    fontSize: 'var(--text-sm)',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    background: selectedCategory === cat ? 'var(--color-primary)' : 'transparent',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'var(--space-8)'
          }}>
            {filteredCourses.map((c) => (
              <CourseCard key={c.id || c.slug} course={c} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              Explore Complete Academy Catalog <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. THE COGNITIVE MATRIX (DARK LUXURY SECTION)
          ===================================================================== */}
      <section style={{
        background: 'var(--color-surface-dark)',
        color: '#FFFFFF',
        padding: 'var(--space-16) 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto var(--space-12)' }}>
            <span style={{
              color: 'var(--color-accent-light)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 'var(--text-xs)'
            }}>
              The Cognitive Architecture
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#FFFFFF', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              Why Cognova Excels
            </h2>
            <p style={{ color: 'rgba(241, 245, 249, 0.8)', fontSize: 'var(--text-md)', lineHeight: 1.6, margin: 0 }}>
              Our methodology bridges ancient Vedic computational secrets with modern cognitive neuroscience to unlock rapid intelligence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)'
          }}>
            <div className="card-glass-dark" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(37, 99, 235, 0.2)',
                color: '#60A5FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <Sparkles className="premium-icon-3d" size={26} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                16 Vedic Sutras System
              </h3>
              <p style={{ color: 'rgba(241, 245, 249, 0.75)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                Ancient arithmetic formulas that reduce multi-step multiplications, roots, and divisions to 1-line mental operations.
              </p>
            </div>

            <div className="card-glass-dark" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(217, 119, 6, 0.2)',
                color: '#FBBF24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <Brain className="premium-icon-3d" size={26} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Mnemonic Retention
              </h3>
              <p style={{ color: 'rgba(241, 245, 249, 0.75)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                Neuro-associative encoding techniques that enable students to memorize tables, historical dates, and scientific formulas with 100% permanence.
              </p>
            </div>

            <div className="card-glass-dark" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(5, 150, 105, 0.2)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <BookOpen className="premium-icon-3d" size={26} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Speed Reading & Span
              </h3>
              <p style={{ color: 'rgba(241, 245, 249, 0.75)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                Eliminate sub-vocalization and expand your eye fixation span to absorb textbooks and research papers at 2x-3x normal speed.
              </p>
            </div>

            <div className="card-glass-dark" style={{ padding: 'var(--space-8)' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(124, 58, 237, 0.2)',
                color: '#A78BFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-5)'
              }}>
                <Target className="premium-icon-3d" size={26} />
              </div>
              <h3 style={{ color: '#FFFFFF', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                Olympiad & Exam Mastery
              </h3>
              <p style={{ color: 'rgba(241, 245, 249, 0.75)', fontSize: 'var(--text-sm)', lineHeight: 1.6, margin: 0 }}>
                Rigorous timed mock drills and competition frameworks that build unbeatable composure and precision under exam pressure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. TESTIMONIALS SLIDER SECTION
          ===================================================================== */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto var(--space-10)' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 'var(--text-xs)'
            }}>
              Proven Transformations
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Trusted by Students & Parents
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', margin: 0 }}>
              Real stories of academic breakthroughs, Olympiad ranks, and cognitive speed transformations.
            </p>
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE FAQ ACCORDION
          ===================================================================== */}
      <section style={{ padding: 'var(--space-16) 0', background: 'var(--color-surface-muted)' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: 'var(--text-xs)'
            }}>
              Frequently Asked Questions
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              Everything You Need to Know
            </h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', margin: 0 }}>
              Batch schedules, learning modes, materials, and enrollment guidance.
            </p>
          </div>

          <div className="faq-accordion">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-icon" />
                  </button>
                  <div className="faq-body">
                    <div className="faq-content">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. LATEST ANNOUNCEMENTS
          ===================================================================== */}
      {announcements.length > 0 && (
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--color-surface)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <div>
                <span style={{ color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 'var(--text-xs)' }}>
                  Notices & Updates
                </span>
                <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', marginTop: 'var(--space-2)', margin: 0 }}>
                  Academy Announcements
                </h2>
              </div>
              <Link to="/announcements" className="btn btn-secondary">
                View All Notices <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
              {announcements.slice(0, 3).map((a) => (
                <AnnouncementCard key={a.id} announcement={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          8. HIGH-CONVERTING FINAL CTA BANNER
          ===================================================================== */}
      <section style={{
        padding: 'var(--space-16) 0',
        background: 'radial-gradient(100% 100% at 50% 0%, #152E58 0%, #080D1A 100%)',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="hero-glow-orb hero-glow-1" style={{ top: '-20%', left: '30%', width: '450px', height: '450px' }} />
        <div className="container" style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FFFFFF', marginBottom: 'var(--space-4)', letterSpacing: '-0.02em' }}>
            Ready to Unlock Your Full Cognitive Potential?
          </h2>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(241, 245, 249, 0.85)', lineHeight: 1.65, marginBottom: 'var(--space-8)' }}>
            Join Coach Sindhu Ram’s live Zoom cohorts and classroom batches. Start thinking, calculating, and learning at the highest level.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/courses" 
              className="btn btn-accent btn-lg"
              style={{
                boxShadow: '0 8px 25px rgba(217, 119, 6, 0.4)',
                fontWeight: 700
              }}
            >
              Explore All Programs <ArrowRight size={18} />
            </Link>
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('Hello Coach Sindhu Ram, I am interested in enrolling in Cognova programs.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                color: '#FFFFFF',
                backdropFilter: 'blur(8px)'
              }}
            >
              <MessageCircle size={18} style={{ color: '#25D366' }} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
