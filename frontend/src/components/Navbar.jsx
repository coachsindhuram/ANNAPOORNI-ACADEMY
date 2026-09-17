import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Menu, X, BookOpen, Instagram, Youtube, Linkedin, Facebook, Twitter, Send, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { settings, navigation, socialLinks } = useSiteSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return <Instagram size={17} />;
    if (p.includes('youtube')) return <Youtube size={17} />;
    if (p.includes('linkedin')) return <Linkedin size={17} />;
    if (p.includes('facebook')) return <Facebook size={17} />;
    if (p.includes('twitter') || p.includes('x')) return <Twitter size={17} />;
    return <Send size={17} />;
  };

  const headerNav = navigation.length > 0 ? navigation.filter(i => i.is_enabled && (i.location === 'header' || i.location === 'both')) : [
    { id: 1, label: 'Home', destination: '/' },
    { id: 2, label: 'About', destination: '/about' },
    { id: 3, label: 'Courses', destination: '/courses' },
    { id: 4, label: 'Subjects', destination: '/subjects' },
    { id: 5, label: 'Announcements', destination: '/announcements' },
    { id: 6, label: 'Contact', destination: '/contact' }
  ];

  const headerSocials = socialLinks.filter(s => s.is_enabled && s.show_in_header);

  return (
    <header className={`header-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="brand-logo" aria-label="Cognova Home">
          {settings.logo_url ? (
            <img src={settings.logo_url} alt={settings.site_name} />
          ) : (
            <div style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: '#ffffff',
              padding: '8px 10px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(85, 43, 122, 0.25)'
            }}>
              <BookOpen size={22} />
            </div>
          )}
          <span style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            {settings.site_name || 'Cognova'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
            {headerNav.map((item) => {
              const isActive = location.pathname === item.destination;
              return (
                <li key={item.id}>
                  {item.is_external ? (
                    <a 
                      href={item.destination} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="nav-link"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.destination}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
            {mobileOpen && (
              <li style={{ marginTop: 'var(--space-4)', width: '100%' }}>
                <Link
                  to="/contact"
                  className="btn btn-primary"
                  onClick={() => setMobileOpen(false)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Enquire Now <ArrowRight size={16} />
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Header Social Icons & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div className="header-social-group" style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {headerSocials.map((soc) => (
              <a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title={soc.platform}
                aria-label={soc.platform}
              >
                {getSocialIcon(soc.platform)}
              </a>
            ))}
          </div>

          <Link
            to="/contact"
            className="btn btn-primary btn-sm header-cta-btn"
          >
            Enquire Now <ArrowRight size={15} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
