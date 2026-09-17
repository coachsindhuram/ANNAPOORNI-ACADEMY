import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { 
  BookOpen, Clock, BarChart2, CheckCircle2, UserCheck, Calendar, Sparkles, Send, 
  MessageCircle, Users, ChevronDown, ArrowRight, Layers, Award
} from 'lucide-react';
import { EnrollmentModal } from '../../components/EnrollmentModal';
import { CourseCard } from '../../components/CourseCard';

export const CourseDetail = () => {
  const { id } = useParams();
  const { contactInfo } = useSiteSettings();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const rawWhatsapp = contactInfo?.whatsapp || contactInfo?.phone || '+919080385589';
  const whatsappNum = rawWhatsapp.replace(/[^0-9]/g, '');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Error loading course details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
        <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-primary)' }}>
          Loading Coaching Program Details...
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container" style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color-error)', marginBottom: 'var(--space-4)' }}>Program Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)' }}>
          The requested course could not be located. It may have moved or been updated.
        </p>
        <Link to="/courses" className="btn btn-primary">
          Browse All Courses
        </Link>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hello Coach Sindhu Ram, I would like to know more about the "${course.title}" coaching program at Cognova.`)}`;

  const learningOutcomes = course.learning_outcomes && course.learning_outcomes.length > 0
    ? course.learning_outcomes
    : [
        'Master rapid mental calculation and problem solving strategies using 16 Vedic Sutras',
        'Gain intense speed and accuracy for Olympiads and competitive challenges',
        'Learn neuro-associative frameworks for 100% exam recall and formula retention',
        'Develop disciplined test-taking habits and mental composure under pressure'
      ];

  const skillsDeveloped = course.skills_developed && course.skills_developed.length > 0
    ? course.skills_developed
    : ['Mental Arithmetic', 'Memory Retention', 'Rapid Processing', 'Focus & Precision', 'Olympiad Strategy'];

  const courseFaqs = course.faqs && course.faqs.length > 0
    ? course.faqs
    : [
        {
          question: `Who should enroll in ${course.title}?`,
          answer: `This course is curated for students (${course.age_group || 'Grade 4+'}) and competitive aspirants seeking to transform their mental speed, mathematical confidence, and cognitive skills.`
        },
        {
          question: 'What is the format of the batch?',
          answer: 'Interactive live Zoom sessions and in-person classroom batches with Coach Sindhu Ram, supported by structured digital worksheets and personalized assessments.'
        },
        {
          question: 'Are class recordings and practice sheets provided?',
          answer: 'Yes, students receive digital practice materials, speed drill cheat sheets, and session revision summaries.'
        }
      ];

  return (
    <div>
      {/* 1. LUXURY COURSE HEADER HERO */}
      <section style={{
        background: 'radial-gradient(120% 120% at 50% 0%, #0F1E36 0%, #080D1A 100%)',
        color: '#FFFFFF',
        padding: 'var(--space-12) 0 var(--space-10)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div className="hero-glow-orb hero-glow-1" style={{ top: '-15%', left: '10%', width: '400px', height: '400px' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: 'var(--space-6)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link to="/courses" style={{ color: 'rgba(255,255,255,0.7)' }}>Courses</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }} aria-current="page">{course.title}</span>
          </nav>

          <div className="responsive-grid-2-1" style={{ alignItems: 'center', gap: 'var(--space-10)' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                <span className="badge badge-accent">
                  {course.category || 'Coaching Program'}
                </span>
                <span className="badge badge-success">
                  📹 Live Zoom & 🏫 Offline Batches
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                color: '#FFFFFF',
                marginBottom: 'var(--space-4)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em'
              }}>
                {course.title}
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: 'rgba(241, 245, 249, 0.85)',
                lineHeight: 1.65,
                marginBottom: 'var(--space-6)',
                maxWidth: '750px'
              }}>
                {course.description}
              </p>

              {/* Course Meta Specs */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-8)',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                  <BarChart2 size={16} style={{ color: 'var(--color-accent-light)' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)' }}>Level</div>
                    <strong style={{ color: '#FFFFFF' }}>{course.difficulty || 'All Levels'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                  <Clock size={16} style={{ color: 'var(--color-accent-light)' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)' }}>Duration</div>
                    <strong style={{ color: '#FFFFFF' }}>{course.duration || '4 Weeks'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                  <Users size={16} style={{ color: 'var(--color-accent-light)' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)' }}>Cohort</div>
                    <strong style={{ color: '#FFFFFF' }}>{course.age_group || 'Grade 4 - 12'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
                  <UserCheck size={16} style={{ color: 'var(--color-accent-light)' }} />
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.6)' }}>Lead Mentor</div>
                    <strong style={{ color: '#FFFFFF' }}>Coach Sindhu Ram</strong>
                  </div>
                </div>
              </div>

              {/* Dual CTAs */}
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-accent btn-lg"
                  style={{
                    fontWeight: 800,
                    boxShadow: '0 8px 25px rgba(217, 119, 6, 0.35)'
                  }}
                >
                  <Sparkles size={18} /> Enroll Now & Get Batch Timetable
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#FFFFFF'
                  }}
                >
                  <MessageCircle size={18} style={{ color: '#25D366' }} /> WhatsApp Inquiry
                </a>
              </div>
            </div>

            {/* Right Card Preview */}
            <div>
              <div className="card card-glow" style={{
                padding: 'var(--space-6)',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--color-border)'
              }}>
                <img
                  src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'}
                  alt={course.title}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    marginBottom: 'var(--space-5)'
                  }}
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>Personalized Coaching by Coach Sindhu Ram</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>Live Interactive Zoom & Classroom Batches</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>Olympiad & Competition Speed Drills</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
                    <span>Structured Practice Worksheets Included</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary"
                  style={{ width: '100%', fontWeight: 700, justifyContent: 'center' }}
                >
                  Join Upcoming Batch <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN COURSE CONTENT & SYLLABUS */}
      <section className="container" style={{ padding: 'var(--space-16) var(--space-4)' }}>
        <div className="responsive-grid-2-1" style={{ gap: 'var(--space-10)', alignItems: 'flex-start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-10)' }}>
            
            {/* Learning Outcomes Checklist */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-5)' }}>
                <Award size={22} style={{ color: 'var(--color-primary)' }} />
                <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text)', margin: 0 }}>
                  What You Will Master in This Program
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {learningOutcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: 'var(--text-md)', color: 'var(--color-text)', lineHeight: 1.55 }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Developed & Prerequisites */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)', color: 'var(--color-text)' }}>
                Core Skills Developed
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
                {skillsDeveloped.map((skill, idx) => (
                  <span key={idx} className="badge badge-accent" style={{ fontSize: 'var(--text-xs)', padding: '6px 14px' }}>
                    ✦ {skill}
                  </span>
                ))}
              </div>

              {course.prerequisites && (
                <div style={{
                  background: 'var(--color-surface-muted)',
                  padding: 'var(--space-5)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)'
                }}>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, marginBottom: '4px', color: 'var(--color-text)' }}>
                    Prerequisites & Eligibility
                  </h4>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    {course.prerequisites}
                  </p>
                </div>
              )}
            </div>

            {/* Course Syllabus & Modules */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>Curriculum & Training Architecture</h2>

              {course.modules && course.modules.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {course.modules.map((mod) => (
                    <div key={mod.id} className="card" style={{ padding: 'var(--space-6)' }}>
                      <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
                        {mod.title}
                      </h3>
                      {mod.description && (
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                          {mod.description}
                        </p>
                      )}

                      {mod.lessons && mod.lessons.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-3)' }}>
                          {mod.lessons.map((les) => (
                            <div
                              key={les.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 14px',
                                background: 'var(--color-surface-muted)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border-subtle)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0 }} />
                                <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>{les.title}</span>
                              </div>
                              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{les.duration || 'Live Session'}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card" style={{ padding: 'var(--space-8)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>Live Cohort Structured Curriculum</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    This coaching program features structured live interactive sessions, mental sutra drills, memory association frameworks, and personalized progress reviews with Coach Sindhu Ram.
                  </p>
                </div>
              )}
            </div>

            {/* Program FAQs */}
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>Frequently Asked Questions</h2>
              <div className="faq-accordion">
                {courseFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                      <button
                        className="faq-question"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question || faq.q}</span>
                        <ChevronDown size={18} className="faq-icon" />
                      </button>
                      <div className="faq-body">
                        <div className="faq-content">
                          {faq.answer || faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Action Card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div className="card card-glow" style={{ padding: 'var(--space-8)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>Reserve Your Batch Seat</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                Batches are capped to guarantee direct mentor interaction and dedicated doubt resolution.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary"
                style={{ width: '100%', marginBottom: 'var(--space-3)', fontWeight: 700, justifyContent: 'center' }}
              >
                Enroll in Batch <Send size={16} />
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-6)' }}
              >
                <MessageCircle size={18} style={{ color: '#25D366' }} /> Chat on WhatsApp
              </a>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', fontSize: 'var(--text-xs)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Batch Modes:</span>
                  <strong style={{ color: 'var(--color-text)' }}>Live Zoom & Offline</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Target Grade:</span>
                  <strong style={{ color: 'var(--color-text)' }}>{course.age_group || 'Grade 4 - 12 & Adults'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Duration:</span>
                  <strong style={{ color: 'var(--color-text)' }}>{course.duration || '4 Weeks'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>Certificate:</span>
                  <strong style={{ color: 'var(--color-text)' }}>Verified Academy Certificate</strong>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. RELATED PROGRAMS */}
      {course.related_courses && course.related_courses.length > 0 && (
        <section style={{ padding: 'var(--space-16) 0', background: 'var(--color-surface-muted)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 'var(--text-xs)' }}>
                Expand Your Skills
              </span>
              <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 'var(--space-2)' }}>Related Coaching Programs</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
              {course.related_courses.map((rel) => (
                <CourseCard key={rel.id || rel.slug} course={rel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Registration Modal */}
      <EnrollmentModal
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
