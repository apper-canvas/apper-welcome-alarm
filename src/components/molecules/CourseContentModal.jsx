import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

const CourseContentModal = ({ topic, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    duration: '',
    author: '',
    difficulty: 'Beginner',
    objectives: [],
    codeExamples: []
  });
  const [newObjective, setNewObjective] = useState('');
  const [newCodeExample, setNewCodeExample] = useState({ title: '', code: '' });

  useEffect(() => {
    if (topic) {
      setFormData({
        title: topic.title || '',
        description: topic.description || '',
        content: topic.content || '',
        duration: topic.duration || '',
        author: topic.author || '',
        difficulty: topic.difficulty || 'Beginner',
        objectives: topic.objectives || [],
        codeExamples: topic.codeExamples || []
      });
    }
  }, [topic]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setFormData(prev => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()]
      }));
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const handleAddCodeExample = () => {
    if (newCodeExample.code.trim()) {
      setFormData(prev => ({
        ...prev,
        codeExamples: [...prev.codeExamples, { ...newCodeExample }]
      }));
      setNewCodeExample({ title: '', code: '' });
    }
  };

  const handleRemoveCodeExample = (index) => {
    setFormData(prev => ({
      ...prev,
      codeExamples: prev.codeExamples.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-200">
          <h2 className="text-xl font-semibold text-surface-900 font-heading">
            {topic ? 'Edit Topic' : 'Add New Topic'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Enter topic title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="e.g., 15 minutes"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Brief description of the topic"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Enter the topic content here..."
              />
            </div>

            {/* Learning Objectives */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Learning Objectives
              </label>
              <div className="space-y-2">
                {formData.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm">
                      {objective}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    className="flex-1 px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Add learning objective"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddObjective())}
                  />
                  <button
                    type="button"
                    onClick={handleAddObjective}
                    className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Code Examples
              </label>
              <div className="space-y-4">
                {formData.codeExamples.map((example, index) => (
                  <div key={index} className="border border-surface-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-surface-800">
                        {example.title || `Code Example ${index + 1}`}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveCodeExample(index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-xs bg-surface-900 text-surface-100 p-3 rounded overflow-x-auto">
                      {example.code}
                    </pre>
                  </div>
                ))}
                <div className="border border-surface-200 rounded-lg p-4 space-y-3">
                  <input
                    type="text"
                    value={newCodeExample.title}
                    onChange={(e) => setNewCodeExample(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Code example title (optional)"
                  />
                  <textarea
                    value={newCodeExample.code}
                    onChange={(e) => setNewCodeExample(prev => ({ ...prev, code: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary font-mono text-sm"
                    placeholder="Paste your code here..."
                  />
                  <button
                    type="button"
                    onClick={handleAddCodeExample}
                    className="w-full px-4 py-2 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Code Example</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-surface-200 bg-surface-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-surface-700 bg-white border border-surface-300 rounded-lg hover:bg-surface-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{topic ? 'Update Topic' : 'Create Topic'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseContentModal;