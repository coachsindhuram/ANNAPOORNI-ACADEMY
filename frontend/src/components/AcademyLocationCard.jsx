import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Smartphone, Globe } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { getMapUrl, getPlatformInfo, openMapLocation, normalizeLocation } from '../utils/mapUtils';

/**
 * AcademyLocationCard
 * 
 * A fully interactive, accessible location component that detects the user's platform
 * and routes to Apple Maps (iOS), Google Maps (Android), or Google Maps in a new tab (Desktop).
 * 
 * @param {Object} props
 * @param {'card' | 'compact' | 'footer' | 'banner'} [props.variant='card'] - Display layout variant
 * @param {Object} [props.customLocation] - Optional location override
 * @param {boolean} [props.showEmbed=false] - Whether to show the embedded Google Map iframe
 * @param {boolean} [props.showCoordinates=true] - Whether to display latitude/longitude coordinates
 * @param {string} [props.className] - Additional CSS class
 * @param {Object} [props.style] - Inline style overrides
 */
export const AcademyLocationCard = ({
  variant = 'card',
  customLocation,
  showEmbed = false,
  showCoordinates = true,
  className = '',
  style = {}
}) => {
  const { academyLocation: contextLocation } = useSiteSettings();
  const rawLoc = customLocation || contextLocation || {};
  const location = normalizeLocation(rawLoc);

  const [platformInfo, setPlatformInfo] = useState({
    platform: 'desktop',
    appTitle: 'Google Maps',
    badgeText: 'Opens in Google Maps',
    isMobile: false,
    isDesktop: true
  });
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const info = getPlatformInfo();
    setPlatformInfo(info);
    setMapUrl(getMapUrl(location, info.platform));
  }, [location.address, location.latitude, location.longitude, location.google_maps_url, location.apple_maps_url]);

  const handleClick = (e) => {
    openMapLocation(location, { e, platform: platformInfo.platform });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMapLocation(location, { platform: platformInfo.platform });
    }
  };

  const ariaLabel = `Open ${location.name || 'Cognova'} location in ${platformInfo.appTitle}`;

  // Formatted coordinate label
  const coordLabel = (location.latitude && location.longitude)
    ? `${parseFloat(location.latitude).toFixed(4)}° N, ${parseFloat(location.longitude).toFixed(4)}° E`
    : null;

  // --- 1. Footer Variant ---
  if (variant === 'footer') {
    return (
      <a
        href={mapUrl || '#'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        target={platformInfo.isDesktop ? '_blank' : undefined}
        rel="noopener noreferrer"
        className={`interactive-location-footer ${className}`}
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          color: 'var(--gray-300)',
          textDecoration: 'none',
          padding: '0.5rem',
          borderRadius: '8px',
          transition: 'all var(--transition-fast)',
          cursor: 'pointer',
          ...style
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(245, 158, 11, 0.15)',
            color: 'var(--accent-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          <MapPin size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>{location.name}</span>
            <ExternalLink size={13} style={{ opacity: 0.6 }} />
          </div>
          <span style={{ color: 'var(--gray-400)', fontSize: '0.825rem', lineHeight: 1.4, display: 'block', marginTop: '2px' }}>
            {location.address}
          </span>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.7rem',
              color: 'var(--accent-color)',
              fontWeight: 600,
              marginTop: '4px'
            }}
          >
            🧭 {platformInfo.badgeText}
          </span>
        </div>
      </a>
    );
  }

  // --- 2. Compact Variant (for Contact page details column) ---
  if (variant === 'compact') {
    return (
      <a
        href={mapUrl || '#'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        target={platformInfo.isDesktop ? '_blank' : undefined}
        rel="noopener noreferrer"
        className={`interactive-location-compact ${className}`}
        aria-label={ariaLabel}
        style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          padding: '1rem',
          borderRadius: '12px',
          background: 'rgba(30, 58, 138, 0.04)',
          border: '1px solid rgba(30, 58, 138, 0.1)',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          transition: 'all var(--transition-normal)',
          ...style
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'var(--primary-color)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.25)'
          }}
        >
          <MapPin size={24} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-color)', margin: 0 }}>
              {location.name || 'Campus Address'}
            </h4>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--primary-color)',
                background: 'rgba(30, 58, 138, 0.08)',
                padding: '2px 8px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Navigation size={12} /> {platformInfo.appTitle}
            </span>
          </div>

          <p style={{ color: 'var(--gray-600)', fontSize: '0.925rem', marginTop: '0.35rem', lineHeight: 1.5, margin: '0.35rem 0 0 0' }}>
            {location.address}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '0.6rem', flexWrap: 'wrap' }}>
            {showCoordinates && coordLabel && (
              <span style={{ fontSize: '0.78rem', color: 'var(--gray-500)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Compass size={13} /> {coordLabel}
              </span>
            )}
            <span style={{ fontSize: '0.825rem', color: 'var(--primary-color)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Tap to open destination <ExternalLink size={13} />
            </span>
          </div>
        </div>
      </a>
    );
  }

  // --- 3. Full Rich Card Variant (Default) ---
  return (
    <div className={`interactive-location-card-wrapper ${className}`} style={{ ...style }}>
      <a
        href={mapUrl || '#'}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        target={platformInfo.isDesktop ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="interactive-location-card"
        aria-label={ariaLabel}
        style={{
          display: 'block',
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'var(--card-color, #FFFFFF)',
          border: '1px solid var(--gray-200, #E2E8F0)',
          boxShadow: 'var(--shadow-style, 0 10px 25px -5px rgba(15, 23, 42, 0.08))',
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all var(--transition-normal)'
        }}
      >
        {/* Top Accent Gradient Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%)'
          }}
        />

        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, #1E40AF 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)'
              }}
            >
              <MapPin size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-color)' }}>
                {location.name || 'Campus & Class Location'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray-500)', margin: '2px 0 0 0' }}>
                Cognova — Coach Sindhu Ram
              </p>
            </div>
          </div>

          {/* Platform Badge */}
          <span
            className="location-platform-badge"
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '999px',
              background: platformInfo.platform === 'ios' ? 'rgba(0, 122, 255, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              color: platformInfo.platform === 'ios' ? '#007AFF' : '#059669',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            {platformInfo.isMobile ? <Smartphone size={13} /> : <Globe size={13} />}
            {platformInfo.badgeText}
          </span>
        </div>

        {/* Optional Embed Map View */}
        {showEmbed && (
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              height: '200px',
              background: 'var(--gray-100)',
              marginBottom: '1.25rem',
              border: '1px solid var(--gray-200)',
              position: 'relative'
            }}
          >
            <iframe
              title={`${location.name} Map Embed`}
              src={location.maps_embed_url}
              width="100%"
              height="100%"
              style={{ border: 0, pointerEvents: 'none' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Interactive Overlay Click Hint */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(6px)',
                color: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Navigation size={12} /> Tap to Open Interactive Directions
            </div>
          </div>
        )}

        {/* Address Info */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.95rem', color: 'var(--gray-700)', fontWeight: 500, lineHeight: 1.5 }}>
            {location.address}
          </div>
          {showCoordinates && coordLabel && (
            <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass size={14} /> Coordinates: <strong>{coordLabel}</strong>
            </div>
          )}
        </div>

        {/* CTA Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--gray-100)',
            marginTop: '0.5rem'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Navigation size={16} /> Open Destination in {platformInfo.appTitle}
          </span>
          <span
            className="cta-arrow"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'rgba(30, 58, 138, 0.08)',
              color: 'var(--primary-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-fast)'
            }}
          >
            <ExternalLink size={14} />
          </span>
        </div>
      </a>
    </div>
  );
};
