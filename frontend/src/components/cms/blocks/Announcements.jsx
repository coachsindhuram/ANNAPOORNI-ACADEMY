import React, { useState, useEffect } from 'react';
import API from '../../../services/api';
import { AnnouncementCard } from '../../AnnouncementCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell } from 'lucide-react';

export default function Announcements({ title, subtitle, limit = 3 }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await API.get('/api/announcements');
        let data = res.data || [];
        if (limit && limit > 0) {
          data = data.slice(0, limit);
        }
        setAnnouncements(data);
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [limit]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 max-w-7xl mx-auto px-4 gap-6">
        <div>
          {title && (
            <h2 className="font-extrabold mb-3 text-[var(--color-text)] flex items-center gap-3"
                style={{ fontSize: 'clamp(1.75rem, 2.5vw + 1rem, 2.5rem)' }}>
              <Bell className="text-[var(--color-primary)]" size={32} />
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        <Link to="/announcements" className="btn btn-outline whitespace-nowrap inline-flex items-center gap-2">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="w-full max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="h-48 bg-gray-100 animate-pulse rounded-xl"></div>
            <div className="h-48 bg-gray-100 animate-pulse rounded-xl hidden md:block"></div>
            <div className="h-48 bg-gray-100 animate-pulse rounded-xl hidden lg:block"></div>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)] glass-card">
            <p>No new announcements at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map(ann => (
              <AnnouncementCard key={ann.id} announcement={ann} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
