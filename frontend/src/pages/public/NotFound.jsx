import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center" style={{ minHeight: '60vh' }}>
      <h1 className="text-6xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--color-primary-dark)' }}>
        404
      </h1>
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
        Page Not Found
      </h2>
      <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4 justify-center flex-wrap" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}>
          Go Home
        </Link>
        <Link to="/courses" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontWeight: 'bold' }}>
          Explore Courses
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
