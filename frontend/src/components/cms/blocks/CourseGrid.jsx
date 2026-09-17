import React, { useState, useEffect } from 'react';
import API from '../../../services/api';
import { CourseCard } from '../../CourseCard';
import { CardSkeleton } from '../../Skeleton';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CourseGrid({ title, subtitle, limit = 6 }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/api/courses');
        let data = res.data || [];
        if (limit && limit > 0) {
          data = data.slice(0, limit);
        }
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [limit]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-12 px-4">
          {title && (
            <h2 className="font-extrabold mb-4 text-[var(--color-primary)]"
                style={{ fontSize: 'clamp(2rem, 3vw + 1rem, 2.75rem)' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl text-[var(--color-text-muted)]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="w-full max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)] glass-card">
            <p>No courses available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <Link to="/courses" className="btn btn-outline btn-lg inline-flex items-center gap-2 font-semibold">
          View All Programs <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
