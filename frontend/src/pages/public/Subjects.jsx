import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { SubjectCard } from '../../components/SubjectCard';
import { BookOpen } from 'lucide-react';

export const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await API.get('/api/subjects');
        setSubjects(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div className="container" style={{ padding: 'var(--space-12) 1.5rem', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto var(--space-12)' }}>
        <h1 style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-3xl)' }}>
          Academic Subjects
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-muted)' }}>
          Explore structured disciplines covering Mathematics, Science, Computer Technology, and foundational skills.
        </p>
      </div>

      {loading ? (
        <div className="responsive-card-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="card" style={{ height: '250px', background: 'var(--color-surface-muted)', animation: 'pulse 2s infinite' }}></div>
          ))}
        </div>
      ) : subjects.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)', maxWidth: '600px', margin: '0 auto' }}>
          <BookOpen size={48} style={{ margin: '0 auto var(--space-4)', color: 'var(--color-text-subtle)', opacity: 0.5 }} />
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>No subjects available</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Check back later for newly added disciplines.</p>
        </div>
      ) : (
        <div className="responsive-card-grid">
          {subjects.map(s => <SubjectCard key={s.id} subject={s} />)}
        </div>
      )}
    </div>
  );
};
