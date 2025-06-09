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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [isAdmin] = useState(true); // Mock admin status - replace with actual auth

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

  const handleAddTopic = () => {
    setEditingTopic(null);
    setIsModalOpen(true);
  };

  const handleEditTopic = () => {
    if (!selectedTopic) return;
    setEditingTopic(selectedTopic);
    setIsModalOpen(true);
  };

  const handleDeleteTopic = async () => {
    if (!selectedTopic || !window.confirm('Are you sure you want to delete this topic?')) {
      return;
    }

    try {
      await courseContentService.delete(selectedTopic.id);
      toast.success('Topic deleted successfully');
      
      const updatedTopics = topics.filter(t => t.id !== selectedTopic.id);
      setTopics(updatedTopics);
      setSelectedTopic(updatedTopics.length > 0 ? updatedTopics[0] : null);
    } catch (error) {
      console.error('Failed to delete topic:', error);
      toast.error('Failed to delete topic');
    }
  };

  const handleSaveTopic = async (topicData) => {
    try {
      if (editingTopic) {
        // Update existing topic
        const updatedTopic = await courseContentService.update(editingTopic.id, topicData);
        const updatedTopics = topics.map(t => 
          t.id === editingTopic.id ? updatedTopic : t
        );
        setTopics(updatedTopics);
        setSelectedTopic(updatedTopic);
        toast.success('Topic updated successfully');
      } else {
        // Create new topic
        const newTopic = await courseContentService.create(topicData);
        const updatedTopics = [...topics, newTopic];
        setTopics(updatedTopics);
        setSelectedTopic(newTopic);
        toast.success('Topic created successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save topic:', error);
      toast.error('Failed to save topic');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Sidebar - Table of Contents */}
        <div className="w-full md:w-80 border-r border-surface-200 bg-white">
          <CourseTopicSidebar
            topics={topics}
            selectedTopic={selectedTopic}
            onTopicSelect={handleTopicSelect}
          />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden" id="content-area">
          <CourseContentViewer
            topic={selectedTopic}
            loading={contentLoading}
            isAdmin={isAdmin}
            onAdd={handleAddTopic}
            onEdit={handleEditTopic}
            onDelete={handleDeleteTopic}
          />
        </div>
      </div>

      {/* Content Management Modal */}
      {isModalOpen && (
        <CourseContentModal
          topic={editingTopic}
          onSave={handleSaveTopic}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseContentPage;