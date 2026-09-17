import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero({
  title,
  subtitle,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage
}) {
  return (
    <div className="hero-section" style={{ 
      minHeight: 'auto',
      backgroundImage: backgroundImage ? `linear-gradient(to bottom right, rgba(36, 32, 42, 0.95), rgba(85, 43, 122, 0.9), rgba(36, 32, 42, 0.8)), url(${backgroundImage})` : '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-16) 0 var(--space-14)'
    }}>
      {/* Decorative Blur Orbs */}
      <div className="hero-glow-orb hero-glow-1" style={{ top: '25%', left: '25%', width: '30vw', height: '30vw' }}></div>
      <div className="hero-glow-orb hero-glow-2" style={{ bottom: '25%', right: '25%', width: '25vw', height: '25vw' }}></div>

      <div className="container" style={{ 
        position: 'relative', 
        zIndex: 10, 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: 'var(--space-6)'
      }}>
        
        {/* Badge */}
        <div className="badge-glow hero-stagger-1">
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }}></span>
          Empowering Your Educational Journey
        </div>

        <h1 className="hero-stagger-2" 
            style={{ 
              color: '#FFFFFF', 
              fontSize: 'var(--text-4xl)', 
              lineHeight: '1.1',
              maxWidth: '800px',
              margin: '0 auto',
              textWrap: 'balance'
            }}>
          {title || 'Think Better. Learn Faster. Grow Smarter.'}
        </h1>
        
        <p className="hero-stagger-3"
           style={{ 
             color: '#FFF9EF', 
             opacity: 0.9,
             fontSize: 'var(--text-lg)', 
             lineHeight: '1.6',
             maxWidth: '650px',
             margin: '0 auto var(--space-4)'
           }}>
          {subtitle || 'Join the premier platform for academic excellence and competitive coaching.'}
        </p>

        <div className="hero-stagger-4" style={{ 
          display: 'flex', 
          gap: 'var(--space-4)', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          width: '100%'
        }}>
          {primaryCtaText && primaryCtaLink && (
            <Link 
              to={primaryCtaLink}
              className="btn btn-accent btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}
            >
              {primaryCtaText} <ArrowRight size={20} />
            </Link>
          )}
          {secondaryCtaText && secondaryCtaLink && (
            <Link 
              to={secondaryCtaLink}
              className="btn btn-outline btn-lg"
              style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center' }}
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
