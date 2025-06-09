import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { learningModulesService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import CourseTopicSidebar from '@/components/organisms/CourseTopicSidebar';
import CourseContentViewer from '@/components/organisms/CourseContentViewer';
import CourseContentModal from '@/components/molecules/CourseContentModal';

const LearningModulesPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingTopic, setEditingTopic] = useState(null);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await learningModulesService.getAll();
      setTopics(data);
      if (data.length > 0 && !selectedTopic) {
        setSelectedTopic(data[0]);
      }
    } catch (error) {
      console.error('Failed to load learning modules:', error);
      toast.error('Failed to load learning modules');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = async (topic) => {
    if (selectedTopic?.id === topic.id) return;
    
    try {
      setContentLoading(true);
      const fullTopic = await learningModulesService.getById(topic.id);
      setSelectedTopic(fullTopic);
      
      // Smooth scroll to content area on mobile
      if (window.innerWidth < 768) {
        document.getElementById('content-area')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    } catch (error) {
      console.error('Failed to load learning module:', error);
      toast.error('Failed to load learning module content');
    } finally {
      setContentLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleShowModal = (mode, topic = null) => {
    setModalMode(mode);
    setEditingTopic(topic);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalMode('add');
    setEditingTopic(null);
  };

  const handleSaveTopic = async (topicData) => {
    try {
      if (modalMode === 'edit' && editingTopic) {
        await learningModulesService.update(editingTopic.id, topicData);
        toast.success('Learning module updated successfully');
        
        // Update selected topic if it's the one being edited
        if (selectedTopic?.id === editingTopic.id) {
          const updatedTopic = await learningModulesService.getById(editingTopic.id);
          setSelectedTopic(updatedTopic);
        }
      } else {
        const newTopic = await learningModulesService.create(topicData);
        toast.success('Learning module created successfully');
        setSelectedTopic(newTopic);
      }
      
      // Reload topics list
      await loadTopics();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save learning module:', error);
      toast.error(modalMode === 'edit' ? 'Failed to update learning module' : 'Failed to create learning module');
    }
  };

  const handleTopicUpdate = async () => {
    try {
      await loadTopics();
      // If current topic was deleted, select first available topic
      if (topics.length > 0) {
        const firstTopic = topics[0];
        const fullTopic = await learningModulesService.getById(firstTopic.id);
        setSelectedTopic(fullTopic);
      } else {
        setSelectedTopic(null);
      }
    } catch (error) {
      console.error('Failed to update learning modules:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Left Sidebar - Table of Contents */}
        <div className={`
          ${sidebarCollapsed ? 'w-0 md:w-16' : 'w-full md:w-80'} 
          transition-all duration-300 ease-in-out
          border-r border-surface-200 bg-white overflow-hidden
        `}>
          <div className="h-full flex flex-col document-sidebar">
            {/* Header with Collapse Toggle */}
            <div className="p-4 md:p-6 border-b border-surface-200">
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'hidden md:flex' : 'flex'}`}>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {!sidebarCollapsed && (
                    <div>
                      <h2 className="text-lg font-semibold text-surface-900 font-heading">
                        Learning Modules
                      </h2>
                      <p className="text-sm text-surface-600">
                        Interactive Learning Content
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors duration-200 hidden md:flex"
                  title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  {sidebarCollapsed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Table of Contents */}
            <div className="flex-1 overflow-y-auto document-nav">
              {topics.length === 0 ? (
                <div className={`p-6 text-center ${sidebarCollapsed ? 'hidden' : 'block'}`}>
                  <div className="text-surface-400 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-surface-600 text-sm">
                    No learning modules available yet.
                  </p>
                </div>
              ) : (
                <nav className={`${sidebarCollapsed ? 'p-2' : 'p-4'}`} role="navigation" aria-label="Learning modules">
                  <ul className="space-y-1">
                    {topics.map((topic, index) => {
                      const isSelected = selectedTopic?.id === topic.id;
                      return (
                        <li key={topic.id}>
                          <button
                            className={`
                              w-full text-left rounded-lg transition-all duration-200
                              border border-transparent
                              focus:outline-none focus:ring-2 focus:ring-primary/50
                              hover:bg-surface-50 hover:border-surface-200
                              hover:shadow-sm group
                              ${sidebarCollapsed ? 'p-2' : 'p-3'}
                              ${isSelected 
                                ? 'bg-primary/8 border-primary/20 text-primary font-medium shadow-sm' 
                                : 'text-surface-700 hover:text-surface-900'
                              }
                            `}
                            onClick={() => handleTopicSelect(topic)}
                            tabIndex={0}
                            aria-current={isSelected ? 'page' : undefined}
                            title={sidebarCollapsed ? topic.title : undefined}
                          >
                            {sidebarCollapsed ? (
                              <div className="flex items-center justify-center">
                                <span className={`
                                  text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center
                                  ${isSelected 
                                    ? 'bg-primary text-white' 
                                    : 'bg-surface-200 text-surface-600 group-hover:bg-surface-300'
                                  }
                                `}>
                                  {index + 1}
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <span className={`
                                      text-xs font-semibold px-2 py-1 rounded-full transition-colors duration-200
                                      ${isSelected 
                                        ? 'bg-primary text-white' 
                                        : 'bg-surface-200 text-surface-600 group-hover:bg-surface-300'
                                      }
                                    `}>
                                      {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="min-w-0 flex-1">
                                      <h3 className="text-sm font-medium line-clamp-2 mb-1">
                                        {topic.title}
                                      </h3>
                                      {topic.description && (
                                        <p className="text-xs text-surface-500 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                                          {topic.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <svg className={`
                                  w-4 h-4 transition-all duration-200 flex-shrink-0 ml-2
                                  ${isSelected 
                                    ? 'text-primary rotate-90 transform' 
                                    : 'text-surface-400 group-hover:text-surface-600'
                                  }
                                `} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>

            {/* Footer */}
            {!sidebarCollapsed && (
              <div className="p-4 border-t border-surface-200 bg-surface-50/50">
                <div className="text-xs text-surface-500 text-center">
                  {topics.length} {topics.length === 1 ? 'module' : 'modules'} available
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden" id="content-area">
          <CourseContentViewer
            topic={selectedTopic}
            loading={contentLoading}
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
            onTopicUpdate={handleTopicUpdate}
            onShowModal={handleShowModal}
          />
        </div>
      </div>

      {/* Learning Module Modal */}
      <CourseContentModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveTopic}
        topic={editingTopic}
        mode={modalMode}
      />
    </div>
  );
};

export default LearningModulesPage;