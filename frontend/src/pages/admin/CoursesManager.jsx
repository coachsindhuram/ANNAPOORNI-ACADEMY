import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Toast } from '../../components/Toast';
import { ConfirmModal } from '../../components/ConfirmModal';
import { MediaUploaderModal } from '../../components/MediaUploaderModal';
import { Plus, Edit2, Trash2, BookOpen, Star } from 'lucide-react';

export const CoursesManager = () => {
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', thumbnail_url: '', category: 'General',
    subject_id: '', difficulty: 'Beginner', duration: '4 Weeks',
    status: 'published', is_featured: false, display_order: 1,
    age_group: 'Age 8-16 / All Ages',
    prerequisites: 'Basic arithmetic knowledge',
    learning_outcomes_text: '',
    skills_developed_text: '',
    faqs_text: ''
  });

  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchCoursesAndSubjects = async () => {
    try {
      const [cRes, sRes] = await Promise.all([
        API.get('/api/admin/courses'),
        API.get('/api/admin/subjects')
      ]);
      setCourses(cRes.data || []);
      setSubjects(sRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesAndSubjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '', description: '', thumbnail_url: '', category: 'General',
      subject_id: subjects[0]?.id || '', difficulty: 'Beginner', duration: '4 Weeks',
      status: 'published', is_featured: false, display_order: courses.length + 1,
      age_group: 'Age 8-16 / All Ages',
      prerequisites: 'Basic arithmetic knowledge',
      learning_outcomes_text: 'Master mental calculation techniques\nBoost academic problem-solving speed\nDevelop strong analytical confidence',
      skills_developed_text: 'Mental Maths, Concentration, Speed, Accuracy',
      faqs_text: JSON.stringify([
        { question: 'Who is this course suitable for?', answer: 'Designed for students from grades 3 to 12 as well as competitive exam aspirants.' },
        { question: 'Are live Zoom recordings provided?', answer: 'Yes, full session recordings and study sheets are provided after each class.' }
      ], null, 2)
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      ...course,
      subject_id: course.subject_id || '',
      age_group: course.age_group || '',
      prerequisites: course.prerequisites || '',
      learning_outcomes_text: Array.isArray(course.learning_outcomes) ? course.learning_outcomes.join('\n') : '',
      skills_developed_text: Array.isArray(course.skills_developed) ? course.skills_developed.join(', ') : '',
      faqs_text: course.faqs ? JSON.stringify(course.faqs, null, 2) : ''
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const outcomes = formData.learning_outcomes_text
        ? formData.learning_outcomes_text.split('\n').map(s => s.trim()).filter(Boolean)
        : [];
      
      const skills = formData.skills_developed_text
        ? formData.skills_developed_text.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      let parsedFaqs = [];
      if (formData.faqs_text && formData.faqs_text.trim()) {
        try {
          parsedFaqs = JSON.parse(formData.faqs_text);
        } catch (jsonErr) {
          alert('FAQs must be valid JSON array of objects with "question" and "answer" properties.');
          return;
        }
      }

      const payload = {
        ...formData,
        learning_outcomes: outcomes,
        skills_developed: skills,
        faqs: parsedFaqs
      };

      if (editingCourse) {
        await API.put(`/api/admin/courses/${editingCourse.id}`, payload);
        setToastMsg('Course updated successfully!');
      } else {
        await API.post('/api/admin/courses', payload);
        setToastMsg('New course published!');
      }
      setModalOpen(false);
      fetchCoursesAndSubjects();
    } catch (err) {
      alert('Failed to save course: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async () => {
    if (!courseToDelete) return;
    setDeleting(true);
    try {
      await API.delete(`/api/admin/courses/${courseToDelete.id}`);
      setToastMsg('Course removed.');
      setDeleteModalOpen(false);
      fetchCoursesAndSubjects();
    } catch (err) {
      alert('Failed to delete course');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div>Loading Courses...</div>;

  return (
    <div>
      <Toast message={toastMsg} onClose={() => setToastMsg('')} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Course Management</h2>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Create, edit, feature, publish, or remove courses across subjects.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={18} /> Create New Course
        </button>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Course Title</th>
              <th>Category / Subject</th>
              <th>Difficulty</th>
              <th>Age Group</th>
              <th>Lessons</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(c => (
              <tr key={c.id}>
                <td>
                  <img
                    src={c.thumbnail_url || 'https://via.placeholder.com/80'}
                    alt={c.title}
                    style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                </td>
                <td style={{ fontWeight: 700 }}>{c.title}</td>
                <td>{c.category} {c.subject_name ? `(${c.subject_name})` : ''}</td>
                <td>{c.difficulty}</td>
                <td style={{ fontSize: '0.85rem', color: '#64748B' }}>{c.age_group || 'All Ages'}</td>
                <td>{c.lesson_count || 0} Lessons</td>
                <td>
                  <span className={`badge ${c.status === 'published' ? 'badge-published' : 'badge-draft'}`}>
                    {c.status}
                  </span>
                </td>
                <td>
                  {c.is_featured ? <Star size={16} fill="#F59E0B" color="#F59E0B" /> : '-'}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => handleOpenEdit(c)}>
                      <Edit2 size={14} />
                    </button>
                    <button className="btn btn-outline btn-sm" style={{ color: '#EF4444' }} onClick={() => { setCourseToDelete(c); setDeleteModalOpen(true); }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h3>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Course Title *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Vedic Maths Speed Calculation Mastery"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Brief overview of course learning goals..."
                    value={formData.description || ''}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select
                      className="form-control"
                      value={formData.subject_id || ''}
                      onChange={e => setFormData({ ...formData, subject_id: e.target.value })}
                    >
                      <option value="">No Subject (General)</option>
                      {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.category || 'General'}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Difficulty Level</label>
                    <select
                      className="form-control"
                      value={formData.difficulty || 'Beginner'}
                      onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 6 Weeks (12 Live Sessions)"
                      value={formData.duration || ''}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Age Group</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Age 8-16 / Grade 4-10"
                      value={formData.age_group || ''}
                      onChange={e => setFormData({ ...formData, age_group: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Prerequisites</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Basic addition & multiplication tables (1 to 9)"
                      value={formData.prerequisites || ''}
                      onChange={e => setFormData({ ...formData, prerequisites: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Learning Outcomes (1 outcome per line)</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    placeholder="Multiply any 2 or 3 digit numbers mentally&#10;Calculate square roots and cube roots in seconds&#10;Eliminate scratchpad calculations completely"
                    value={formData.learning_outcomes_text}
                    onChange={e => setFormData({ ...formData, learning_outcomes_text: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Skills Developed (Comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mental Maths, Speed Calculation, Focus, Memory Retention"
                    value={formData.skills_developed_text}
                    onChange={e => setFormData({ ...formData, skills_developed_text: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Course FAQs (JSON format)</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                    placeholder='[{"question": "What is the class schedule?", "answer": "Classes run on Saturdays & Sundays via Zoom."}]'
                    value={formData.faqs_text}
                    onChange={e => setFormData({ ...formData, faqs_text: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail URL</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://..."
                      value={formData.thumbnail_url || ''}
                      onChange={e => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    />
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => setMediaModalOpen(true)}>
                      Select Media
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={e => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                    />
                    <span>Publish Immediately</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    <span>Featured on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MediaUploaderModal
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        onSelect={(url) => setFormData({ ...formData, thumbnail_url: url })}
        category="course"
      />

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Course"
        message={`Are you sure you want to delete '${courseToDelete?.title}' and all its associated modules and lessons?`}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalOpen(false)}
        loading={deleting}
      />
    </div>
  );
};
