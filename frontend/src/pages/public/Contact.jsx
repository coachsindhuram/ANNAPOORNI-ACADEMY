import React, { useState } from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { Mail, Phone, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { AcademyLocationCard } from '../../components/AcademyLocationCard';
import API from '../../services/api';

export const Contact = () => {
  const { contactInfo, socialLinks, academyLocation } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    mode: 'Live Online via Zoom',
    subject: '',
    message: '',
    website_url: '' // Anti-spam honeypot field
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const quickTopics = [
    'Vedic Maths Batch Inquiry',
    'Memory Coaching Workshop',
    'Speed Reading Program',
    'Competition Practice & Olympiad',
    'Teacher Training / School Seminar',
    'Offline Classroom Coaching'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Honeypot bot protection
    if (formData.website_url) {
      setSubmitted(true);
      return;
    }

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Please provide your name, phone number, email address, and message.');
      return;
    }

    try {
      setLoading(true);
      await API.post('/api/contact/inquiry', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        mode: formData.mode,
        subject: formData.subject || 'General Inquiry',
        message: formData.message
      });

      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit your message. Please reach us via WhatsApp or Phone directly.');
    } finally {
      setLoading(false);
    }
  };

  const displayEmail = contactInfo.email || 'coach.sindhuram@gmail.com';
  const displayPhone = contactInfo.phone || '+91 90803 85589';
  const whatsappNum = (contactInfo.whatsapp || contactInfo.phone || '+919080385589').replace(/[^0-9]/g, '');
  const contactSocials = socialLinks.filter(s => s.is_enabled && s.show_in_contact);

  return (
    <div>
      {/* Contact Header Section */}
      <section style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        background: 'var(--color-primary-dark)', 
        color: 'white',
        padding: 'var(--space-20) 0 var(--space-16)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ color: 'white', marginBottom: 'var(--space-4)', fontSize: 'var(--text-4xl)' }}>
            Contact Coach Sindhu Ram
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', maxWidth: '800px', margin: '0 auto' }}>
            Have questions about Vedic Maths, Memory Coaching, or Speed Reading? Connect directly with Coach Sindhu Ram.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: 'var(--space-20) 1.5rem' }}>
        <div className="responsive-grid-1-1">
          {/* Contact Details Column */}
          <div>
            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-8)', color: 'var(--color-text)' }}>
              Get in Touch
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginBottom: 'var(--space-10)' }}>
              {/* Interactive Academy Campus Address Block */}
              <AcademyLocationCard variant="compact" />

              <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>Email Inquiries</h4>
                  <a href={`mailto:${displayEmail}`} style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem' }}>
                    {displayEmail}
                  </a>
                </div>
              </div>

              <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>Phone / WhatsApp</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <a href={`tel:${displayPhone.replace(/\s+/g, '')}`} style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                      📞 {displayPhone}
                    </a>
                    <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noopener noreferrer" style={{ color: '#16A34A', fontWeight: 700 }}>
                      💬 Chat Directly on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {contactInfo.working_hours && (
                <div className="card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-50)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)' }}>Working Hours</h4>
                    <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{contactInfo.working_hours}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Official Social Links */}
            {contactSocials.length > 0 && (
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <h4 style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text)', marginBottom: '1rem' }}>Connect on Official Channels</h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {contactSocials.map(soc => (
                    <a key={soc.id} href={soc.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm" style={{ borderRadius: '50px' }}>
                      {soc.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Location & Maps Card with Live Route Simulation */}
            <AcademyLocationCard variant="card" showEmbed={true} />
          </div>

          {/* Contact Form Box */}
          <div className="card" style={{ padding: 'var(--space-10)', display: 'flex', flexDirection: 'column' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                <CheckCircle2 size={64} style={{ color: 'var(--color-success)', margin: '0 auto var(--space-6)' }} />
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: '1rem' }}>Inquiry Received!</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-8)', lineHeight: 1.6 }}>
                  Thank you <strong style={{ color: 'var(--color-text)' }}>{formData.name}</strong>! Your inquiry has been safely recorded in our system. A confirmation copy has been sent to your email (<strong style={{ color: 'var(--color-text)' }}>{formData.email}</strong>), and our team will get back to you shortly.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a
                    href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(`Hi Coach Sindhu Ram, I just submitted an inquiry on the website regarding ${formData.subject}. My name is ${formData.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{ background: '#25D366', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem' }}
                  >
                    <MessageCircle size={20} /> Connect Directly on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', mode: 'Live Online via Zoom', subject: '', message: '' });
                    }}
                    className="btn btn-outline"
                    style={{ padding: '1rem' }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ fontSize: 'var(--text-2xl)', marginBottom: '0.5rem' }}>Send Us a Message</h3>

                {error && (
                  <div style={{ background: '#FEF2F2', color: '#B91C1C', padding: '1rem', borderRadius: '12px', fontSize: 'var(--text-sm)', fontWeight: 500, border: '1px solid #FEE2E2' }}>
                    ⚠️ {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Anand Kumar"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="e.g. anand@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Learning Mode</label>
                  <select
                    className="form-control"
                    value={formData.mode}
                    onChange={e => setFormData({ ...formData, mode: e.target.value })}
                  >
                    <option value="Live Online via Zoom">📹 Live Online via Zoom</option>
                    <option value="In-Person Offline Classes">🏫 In-Person Offline Classroom</option>
                    <option value="Hybrid / Weekend Batch">🔄 Hybrid / Weekend Batch</option>
                    <option value="General Inquiry">💬 General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject / Program *</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    {quickTopics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject: topic })}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.375rem 0.75rem',
                          borderRadius: '50px',
                          fontWeight: 500,
                          background: formData.subject === topic ? 'var(--color-primary)' : 'var(--color-border)',
                          color: formData.subject === topic ? 'white' : 'var(--color-text)',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Vedic Maths Zoom Batch Schedule"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                {/* Anti-Spam Honeypot Field */}
                <div style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <label htmlFor="website_url">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website_url}
                    onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    required
                    rows="4"
                    className="form-control"
                    placeholder="Please let us know your child's grade, learning goals, or any questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                >
                  {loading ? 'Submitting Inquiry...' : <><Send size={20} /> Send Inquiry</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
