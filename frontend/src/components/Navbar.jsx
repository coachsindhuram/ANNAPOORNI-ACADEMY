import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { Menu, X, BookOpen, Instagram, Youtube, Linkedin, Facebook, Twitter, Send, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { settings, navigation, socialLinks } = useSiteSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

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

  // Handle body scroll locking
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  // Handle click outside and Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-btn')) {
        setMobileOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [mobileOpen]);

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
            <img src={settings.logo_url} alt={settings.site_name} style={{ maxHeight: '42px' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', color: '#fff', padding: '0.5rem', borderRadius: '8px' }}>
              <BookOpen size={22} />
            </div>
          )}
          <span>{settings.site_name || 'Cognova'}</span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile via main.css .nav-links media query */}
        <nav aria-label="Desktop Main Navigation">
          <ul className="nav-links">
            {headerNav.map((item) => {
              const isActive = location.pathname === item.destination;
              return (
                <li key={item.id}>
                  {item.is_external ? (
                    <a href={item.destination} target="_blank" rel="noopener noreferrer" className={`nav-link ${isActive ? 'active' : ''}`}>
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.destination} className={`nav-link ${isActive ? 'active' : ''}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Header Social Icons & Actions - Hidden on Mobile via main.css .header-social-group media query */}
        <div className="header-social-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {headerSocials.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {headerSocials.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  title={soc.platform}
                  aria-label={soc.platform}
                  style={{ color: 'var(--color-text-muted)', background: 'transparent' }}
                >
                  {getSocialIcon(soc.platform)}
                </a>
              ))}
            </div>
          )}
          <Link to="/contact" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Enquire Now <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button - Visible only on Mobile via main.css .mobile-menu-btn media query */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu-dropdown"
          style={{ position: 'relative', zIndex: 1001, background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        id="mobile-menu-dropdown"
        ref={menuRef}
        className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}
        style={{ 
          display: mobileOpen ? 'flex' : 'none',
          listStyle: 'none', // override browser defaults
          zIndex: 1000
        }}
      >
        {headerNav.map((item) => {
          const isActive = location.pathname === item.destination;
          return (
            <div key={item.id} style={{ width: '100%', textAlign: 'center' }}>
              {item.is_external ? (
                <a 
                  href={item.destination} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{ fontSize: '1.25rem', padding: '0.75rem', display: 'block' }}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  to={item.destination}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{ fontSize: '1.25rem', padding: '0.75rem', display: 'block' }}
                >
                  {item.label}
                </Link>
              )}
            </div>
          );
        })}

        <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--color-border)', margin: '1rem 0' }}></div>

        <Link
          to="/contact"
          className="btn btn-primary"
          style={{ width: '100%', display: 'flex', justifySelf: 'center', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem', boxSizing: 'border-box' }}
        >
          Enquire Now <ArrowRight size={18} />
        </Link>

        {headerSocials.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            {headerSocials.map((soc) => (
              <a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
                aria-label={soc.platform}
              >
                {getSocialIcon(soc.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
