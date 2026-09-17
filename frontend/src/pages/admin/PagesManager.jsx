import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Toast } from '../../components/Toast';

export const PagesManager = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await api.get('/api/admin/pages');
      setPages(response.data);
    } catch (error) {
      setToast({ show: true, message: 'Failed to fetch pages.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const createNewPage = async () => {
    const title = prompt("Enter new page title:");
    if (!title) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    try {
      const res = await api.post('/api/admin/pages', { name: title, slug });
      navigate(`/admin/pages/builder/${res.data.id}`);
    } catch (error) {
      setToast({ show: true, message: error.response?.data?.error || 'Failed to create page', type: 'error' });
    }
  };

  const deletePage = async (id, isHome) => {
    if (isHome) {
      alert("Cannot delete the home page.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this page?")) return;
    
    try {
      await api.delete(`/api/admin/pages/${id}`);
      fetchPages();
      setToast({ show: true, message: 'Page deleted.', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: 'Failed to delete page.', type: 'error' });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pages</h1>
          <p className="text-gray-600">Manage website pages and use the Visual Builder.</p>
        </div>
        <button 
          onClick={createNewPage}
          className="bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary-dark transition"
        >
          + Add New Page
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-semibold text-gray-600">Page Name</th>
              <th className="p-4 font-semibold text-gray-600">URL Slug</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600">Last Updated</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500">Loading pages...</td></tr>
            ) : pages.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500">No pages found.</td></tr>
            ) : (
              pages.map(page => (
                <tr key={page.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4">
                    <div className="font-medium text-gray-800">
                      {page.name}
                      {page.is_home && <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Home</span>}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">/{page.is_home ? '' : page.slug}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button 
                      onClick={() => navigate(`/admin/pages/builder/${page.id}`)}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Visual Builder
                    </button>
                    {!page.is_home && (
                      <button 
                        onClick={() => deletePage(page.id, page.is_home)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
