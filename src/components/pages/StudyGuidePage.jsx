import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { studyGuideService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import CourseTopicSidebar from '@/components/organisms/CourseTopicSidebar';
import CourseContentViewer from '@/components/organisms/CourseContentViewer';
import CourseContentModal from '@/components/molecules/CourseContentModal';

const StudyGuidePage = () => {
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
      const data = await studyGuideService.getAll();
      setTopics(data);
      if (data.length > 0 && !selectedTopic) {
        setSelectedTopic(data[0]);
      }
    } catch (error) {
      console.error('Failed to load study guides:', error);
      toast.error('Failed to load study guides');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = async (topic) => {
    if (selectedTopic?.id === topic.id) return;
    
    try {
      setContentLoading(true);
      const fullTopic = await studyGuideService.getById(topic.id);
      setSelectedTopic(fullTopic);
      
      // Smooth scroll to content area on mobile
      if (window.innerWidth < 768) {
        document.getElementById('content-area')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    } catch (error) {
      console.error('Failed to load study guide:', error);
      toast.error('Failed to load study guide content');
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
        await studyGuideService.update(editingTopic.id, topicData);
        toast.success('Study guide updated successfully');
        
        // Update selected topic if it's the one being edited
        if (selectedTopic?.id === editingTopic.id) {
          const updatedTopic = await studyGuideService.getById(editingTopic.id);
          setSelectedTopic(updatedTopic);
        }
      } else {
        const newTopic = await studyGuideService.create(topicData);
        toast.success('Study guide created successfully');
        setSelectedTopic(newTopic);
      }
      
      // Reload topics list
      await loadTopics();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save study guide:', error);
      toast.error(modalMode === 'edit' ? 'Failed to update study guide' : 'Failed to create study guide');
    }
  };

  const handleTopicUpdate = async () => {
    try {
      await loadTopics();
      // If current topic was deleted, select first available topic
      if (topics.length > 0) {
        const firstTopic = topics[0];
        const fullTopic = await studyGuideService.getById(firstTopic.id);
        setSelectedTopic(fullTopic);
      } else {
        setSelectedTopic(null);
      }
    } catch (error) {
      console.error('Failed to update study guides:', error);
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
          <CourseTopicSidebar
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
            collapsed={sidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            title="Study Guides"
            subtitle="Comprehensive Learning Materials"
          />
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
            service={studyGuideService}
          />
        </div>
      </div>

      {/* Study Guide Content Modal */}
      {showModal && (
        <CourseContentModal
          topic={editingTopic}
          onSave={handleSaveTopic}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default StudyGuidePage;