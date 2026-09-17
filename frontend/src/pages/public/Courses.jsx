import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { CourseCard } from '../../components/CourseCard';
import { CardSkeleton } from '../../components/Skeleton';
import { Search, Filter, BookOpen, Sparkles, RefreshCw } from 'lucide-react';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, sRes] = await Promise.all([
          API.get('/api/courses'),
          API.get('/api/subjects')
        ]);
        setCourses(cRes.data || []);
        setSubjects(sRes.data || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Extract unique categories from courses list
  const uniqueCategories = ['All', ...new Set(courses.map(c => c.category).filter(Boolean))];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = !search || 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      (c.description && c.description.toLowerCase().includes(search.toLowerCase())) ||
      (c.skills_developed && c.skills_developed.some(s => s.toLowerCase().includes(search.toLowerCase())));
    const matchesSubject = !selectedSubject || String(c.subject_id) === String(selectedSubject);
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesCategory && matchesDifficulty;
  });

  const handleResetFilters = () => {
    setSearch('');
    setSelectedSubject('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', background: 'rgba(13, 148, 136, 0.1)', color: 'var(--secondary-color)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>
          <Sparkles size={16} /> ACCELERATED LEARNING PROGRAMS
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Explore Our Academy Programs</h1>
        <p style={{ color: 'var(--gray-600)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Structured curriculums in Vedic Mathematics, Memory Coaching, and Speed Reading engineered by Coach Sindhu Ram to cultivate lifetime cognitive excellence.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '50px', padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: 2, minWidth: '240px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-400)' }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search programs by title, skills, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 3 }}>
          <select
            className="form-control"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={{ flex: 1, minWidth: '140px' }}
          >
            <option value="">All Subjects</option>
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select
            className="form-control"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{ flex: 1, minWidth: '140px' }}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {(search || selectedSubject || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
            <button
              onClick={handleResetFilters}
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              title="Reset all filters"
            >
              <RefreshCw size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--gray-500)', fontSize: '0.9rem' }}>
        <span>Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'program' : 'programs'}</span>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--gray-500)' }}>
          <BookOpen size={48} style={{ color: 'var(--gray-400)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-color)' }}>No courses match your criteria</h3>
          <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Try clearing some of your search filters or browse all coaching tracks.</p>
          <button onClick={handleResetFilters} className="btn btn-primary btn-sm">
            View All Programs
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};
