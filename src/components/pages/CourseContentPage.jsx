import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { courseContentService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import CourseTopicSidebar from '@/components/organisms/CourseTopicSidebar';
import CourseContentViewer from '@/components/organisms/CourseContentViewer';
import CourseContentModal from '@/components/molecules/CourseContentModal';

const CourseContentPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await courseContentService.getAll();
      setTopics(data);
      if (data.length > 0 && !selectedTopic) {
        setSelectedTopic(data[0]);
      }
    } catch (error) {
      console.error('Failed to load topics:', error);
      toast.error('Failed to load course content');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = async (topic) => {
    if (selectedTopic?.id === topic.id) return;
    
    try {
      setContentLoading(true);
      const fullTopic = await courseContentService.getById(topic.id);
      setSelectedTopic(fullTopic);
      
      // Smooth scroll to content area on mobile
      if (window.innerWidth < 768) {
        document.getElementById('content-area')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }
    } catch (error) {
      console.error('Failed to load topic:', error);
      toast.error('Failed to load topic content');
    } finally {
      setContentLoading(false);
    }
};

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden" id="content-area">
          <CourseContentViewer
            topic={selectedTopic}
            loading={contentLoading}
            onToggleSidebar={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseContentPage;