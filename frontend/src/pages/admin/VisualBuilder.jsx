import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Toast } from '../../components/Toast';
import SectionRenderer from '../../components/cms/SectionRenderer';
import { ComponentRegistry } from '../../components/cms/ComponentRegistry';

export const VisualBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [saving, setSaving] = useState(false);
  
  // UI State
  const [activeTab, setActiveTab] = useState('components'); // 'components', 'properties'
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);

  useEffect(() => {
    fetchPageData();
  }, [id]);

  const fetchPageData = async () => {
    try {
      const res = await api.get(`/api/admin/pages/${id}`);
      setPage(res.data);
      setSections(res.data.sections || []);
    } catch (err) {
      setToast({ show: true, message: 'Failed to load page.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async () => {
    setSaving(true);
    try {
      await api.post(`/api/admin/pages/${id}/save`, sections);
      setToast({ show: true, message: 'Draft saved!', type: 'success' });
    } catch (err) {
      setToast({ show: true, message: 'Failed to save draft.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const publishPage = async () => {
    if (!window.confirm("Publish these changes to the live site?")) return;
    setSaving(true);
    try {
      // First save draft
      await api.post(`/api/admin/pages/${id}/save`, sections);
      // Then publish
      await api.post(`/api/admin/pages/${id}/publish`);
      setToast({ show: true, message: 'Page published!', type: 'success' });
      fetchPageData();
    } catch (err) {
      setToast({ show: true, message: 'Failed to publish.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const addSection = (type) => {
    const newSection = {
      type,
      content: getTemplateForType(type),
      styles: {
        backgroundColor: '#ffffff',
        paddingTop: '4rem',
        paddingBottom: '4rem',
        textColor: '#1f2937'
      }
    };
    setSections([...sections, newSection]);
    setSelectedSectionIndex(sections.length);
    setActiveTab('properties');
  };

  const getTemplateForType = (type) => {
    switch(type) {
      case 'hero': return { title: 'New Hero', subtitle: 'Catchy subtitle' };
      case 'richtext': return { html: '<p>Edit me...</p>' };
      case 'image': return { src: 'https://via.placeholder.com/800x400', alt: 'Placeholder' };
      default: return {};
    }
  };

  const updateSelectedSection = (key, value, isStyle = false) => {
    if (selectedSectionIndex === null) return;
    
    const newSections = [...sections];
    if (isStyle) {
      newSections[selectedSectionIndex].styles = {
        ...newSections[selectedSectionIndex].styles,
        [key]: value
      };
    } else {
      newSections[selectedSectionIndex].content = {
        ...newSections[selectedSectionIndex].content,
        [key]: value
      };
    }
    setSections(newSections);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
    setSelectedSectionIndex(null);
    setActiveTab('components');
  };

  const moveSection = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const newSections = [...sections];
      const temp = newSections[index - 1];
      newSections[index - 1] = newSections[index];
      newSections[index] = temp;
      setSections(newSections);
      setSelectedSectionIndex(index - 1);
    } else if (direction === 'down' && index < sections.length - 1) {
      const newSections = [...sections];
      const temp = newSections[index + 1];
      newSections[index + 1] = newSections[index];
      newSections[index] = temp;
      setSections(newSections);
      setSelectedSectionIndex(index + 1);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Visual Builder...</div>;
  if (!page) return <div className="p-8 text-center text-red-500">Page not found.</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
      
      {/* Topbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/admin/pages')} className="text-gray-500 hover:text-gray-700">
            &larr; Back
          </button>
          <div>
            <h1 className="font-bold text-gray-800">Editing: {page.name}</h1>
            <p className="text-xs text-gray-500">Status: {page.status}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={saveDraft} 
            disabled={saving}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            onClick={publishPage} 
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div className="bg-white min-h-[800px] shadow-sm relative">
            {sections.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 m-8 rounded">
                Drag or add components to start building
              </div>
            ) : (
              sections.map((section, idx) => (
                <div 
                  key={idx} 
                  className={`relative group cursor-pointer border-2 transition-all ${selectedSectionIndex === idx ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                  onClick={() => { setSelectedSectionIndex(idx); setActiveTab('properties'); }}
                >
                  <SectionRenderer section={section} />
                  
                  {/* Overlay Controls */}
                  {selectedSectionIndex === idx && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs flex space-x-1 p-1 z-10 rounded-bl shadow">
                      <button onClick={(e) => { e.stopPropagation(); moveSection(idx, 'up'); }} className="p-1 hover:bg-primary-dark" title="Move Up">↑</button>
                      <button onClick={(e) => { e.stopPropagation(); moveSection(idx, 'down'); }} className="p-1 hover:bg-primary-dark" title="Move Down">↓</button>
                      <button onClick={(e) => { e.stopPropagation(); removeSection(idx); }} className="p-1 bg-red-500 hover:bg-red-600 ml-2" title="Delete">X</button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0">
          <div className="flex border-b border-gray-200">
            <button 
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'components' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('components')}
            >
              Add Elements
            </button>
            <button 
              className={`flex-1 py-3 text-sm font-medium ${activeTab === 'properties' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('properties')}
            >
              Properties
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'components' && (
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Sections</h3>
                {Object.keys(ComponentRegistry).map(key => (
                  <div 
                    key={key} 
                    onClick={() => addSection(key)}
                    className="p-3 border border-gray-200 rounded cursor-pointer hover:border-primary hover:bg-blue-50 transition flex items-center justify-between"
                  >
                    <span className="capitalize text-gray-700">{key.replace('_', ' ')}</span>
                    <span className="text-primary text-xl">+</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'properties' && selectedSectionIndex !== null && sections[selectedSectionIndex] && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Component Settings</h3>
                  <div className="space-y-3 bg-gray-50 p-3 rounded border border-gray-200">
                    {/* Render inputs based on component content keys */}
                    {Object.keys(sections[selectedSectionIndex].content || {}).map(key => (
                      <div key={key}>
                        <label className="block text-xs text-gray-600 mb-1 capitalize">{key}</label>
                        {key === 'html' ? (
                           <textarea 
                             className="w-full p-2 border border-gray-300 rounded text-sm h-24"
                             value={sections[selectedSectionIndex].content[key] || ''}
                             onChange={(e) => updateSelectedSection(key, e.target.value)}
                           />
                        ) : (
                          <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            value={sections[selectedSectionIndex].content[key] || ''}
                            onChange={(e) => updateSelectedSection(key, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                    {Object.keys(sections[selectedSectionIndex].content || {}).length === 0 && (
                      <p className="text-xs text-gray-500">No content settings available for this block.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase font-bold text-gray-400 mb-2">Styles</h3>
                  <div className="space-y-3 bg-gray-50 p-3 rounded border border-gray-200">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                      <input 
                        type="color" 
                        className="w-full h-8"
                        value={sections[selectedSectionIndex].styles?.backgroundColor || '#ffffff'}
                        onChange={(e) => updateSelectedSection('backgroundColor', e.target.value, true)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Text Color</label>
                      <input 
                        type="color" 
                        className="w-full h-8"
                        value={sections[selectedSectionIndex].styles?.textColor || '#000000'}
                        onChange={(e) => updateSelectedSection('textColor', e.target.value, true)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Padding Top</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        value={sections[selectedSectionIndex].styles?.paddingTop || '0'}
                        onChange={(e) => updateSelectedSection('paddingTop', e.target.value, true)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Padding Bottom</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                        value={sections[selectedSectionIndex].styles?.paddingBottom || '0'}
                        onChange={(e) => updateSelectedSection('paddingBottom', e.target.value, true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'properties' && selectedSectionIndex === null && (
              <div className="text-center text-gray-400 mt-10">
                Select a section in the canvas to edit properties.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
