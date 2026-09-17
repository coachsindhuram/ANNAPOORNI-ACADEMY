import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { AnnouncementCard } from '../../components/AnnouncementCard';
import { BellOff } from 'lucide-react';

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const url = category ? `/api/announcements?category=${category}` : '/api/announcements';
        const res = await API.get(url);
        setAnnouncements(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [category]);

  const categories = ['All', 'General', 'Admission', 'Workshop', 'Exam', 'Event'];

  return (
    <div className="container" style={{ padding: 'var(--space-12) 1.5rem', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-12)' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>
          Academy News & Announcements
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
          Stay updated with official notifications, admission deadlines, workshops, and events.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-12)' }}>
        {categories.map((cat) => {
          const val = cat === 'All' ? '' : cat;
          const isActive = category === val;
          return (
            <button
              key={cat}
              onClick={() => setCategory(val)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '50px', padding: '0.5rem 1.2rem' }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="responsive-card-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ height: '200px', background: 'var(--color-surface-muted)', animation: 'pulse 2s infinite' }}></div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)', maxWidth: '600px', margin: '0 auto' }}>
          <BellOff size={48} style={{ margin: '0 auto var(--space-4)', color: 'var(--color-text-subtle)', opacity: 0.5 }} />
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>No announcements found</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>There are currently no announcements in this category.</p>
        </div>
      ) : (
        <div className="responsive-card-grid">
          {announcements.map(a => <AnnouncementCard key={a.id} announcement={a} />)}
        </div>
      )}
    </div>
  );
};
