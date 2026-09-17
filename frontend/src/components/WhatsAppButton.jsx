import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton = () => {
  const { contactInfo } = useSiteSettings();
  const [showTooltip, setShowTooltip] = useState(false);

  // Extract phone/whatsapp number from centralized context
  const rawNumber = contactInfo?.whatsapp || contactInfo?.phone || '+919080385589';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent('Hello Coach Sindhu Ram, I would like to inquire about coaching programs at Cognova.');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '10px'
      }}
    >
      {showTooltip && (
        <div
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            maxWidth: '240px',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          <span>Chat directly with admissions on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Close tooltip"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp with Cognova"
        style={{
          width: '54px',
          height: '54px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#25D366',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
          textDecoration: 'none'
        }}
        className="whatsapp-floating-btn"
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.45)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.35)';
        }}
      >
        <MessageCircle size={28} fill="#FFFFFF" color="#25D366" />
      </a>
    </div>
  );
};
