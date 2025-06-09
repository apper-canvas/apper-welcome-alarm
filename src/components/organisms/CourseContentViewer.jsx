import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, User, Menu, Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { adminAuthService, courseContentService } from '@/services';
import ConfirmationDialog from '@/components/molecules/ConfirmationDialog';

const CourseContentViewer = ({ 
  topic, 
  loading,
  onToggleSidebar,
  sidebarCollapsed,
  onTopicUpdate,
  onShowModal,
  service = courseContentService
}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const adminStatus = await adminAuthService.isAdmin();
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Failed to check admin status:', error);
    }
  };

  const handleAddTopic = () => {
    onShowModal('add');
  };

  const handleEditTopic = () => {
    onShowModal('edit', topic);
  };

  const handleDeleteTopic = async () => {
    if (!topic) return;

try {
      setActionLoading(true);
      await service.deleteById(topic.id);
      toast.success('Topic deleted successfully');
      setShowDeleteDialog(false);
      onTopicUpdate();
    } catch (error) {
      console.error('Failed to delete topic:', error);
      toast.error('Failed to delete topic');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <LoadingSpinner />
      </div>
    );
  }

if (!topic) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-surface-400 mb-4">
            <BookOpen className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-surface-800 mb-2 font-heading">
            Select a Topic
          </h3>
          <p className="text-surface-600">
            Choose a topic from the sidebar to view its content and start learning.
          </p>
        </div>
      </div>
    );
  }

return (
    <div className="h-full flex flex-col bg-white document-viewer">
      {/* Header with Mobile Sidebar Toggle and Admin Controls */}
      <div className="border-b border-surface-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-2 text-surface-600 hover:text-surface-800 hover:bg-surface-100 rounded-lg transition-colors duration-200"
              title="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold text-surface-900 font-heading leading-tight flex-1">
                  {topic.title}
                </h1>
                
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={handleAddTopic}
                      disabled={actionLoading}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                      title="Add new topic"
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Add
                    </button>
                    
                    {topic && (
                      <>
                        <button
                          onClick={handleEditTopic}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-surface-700 bg-surface-100 hover:bg-surface-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                          title="Edit this topic"
                        >
                          <Edit2 className="w-4 h-4 mr-1.5" />
                          Edit
                        </button>
                        
                        <button
                          onClick={() => setShowDeleteDialog(true)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                          title="Delete this topic"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5" />
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {topic.description && (
                <p className="text-surface-600 text-lg mb-4 leading-relaxed">
                  {topic.description}
                </p>
              )}
              
              {/* Topic Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-surface-500">
                {topic.duration && (
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{topic.duration}</span>
                  </div>
                )}
                {topic.author && (
                  <div className="flex items-center space-x-1.5">
                    <User className="w-4 h-4" />
                    <span>{topic.author}</span>
                  </div>
                )}
                {topic.difficulty && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    topic.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-800'
                      : topic.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {topic.difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {topic.content ? (
            <div className="prose prose-slate max-w-none">
              <div 
                className="space-y-6 text-surface-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: topic.content.replace(/\n/g, '<br>') 
                }}
              />
              
              {/* Code Examples */}
              {topic.codeExamples && topic.codeExamples.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-surface-900 mb-4 font-heading">
                    Code Examples
                  </h3>
                  <div className="space-y-4">
                    {topic.codeExamples.map((example, index) => (
                      <div key={index} className="border border-surface-200 rounded-lg overflow-hidden">
                        {example.title && (
                          <div className="px-4 py-2 bg-surface-50 border-b border-surface-200">
                            <h4 className="text-sm font-medium text-surface-800">
                              {example.title}
                            </h4>
                          </div>
                        )}
                        <pre className="p-4 bg-surface-900 text-surface-100 overflow-x-auto text-sm">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Objectives */}
              {topic.objectives && topic.objectives.length > 0 && (
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="text-lg font-semibold text-primary mb-3 font-heading">
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {topic.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2 text-surface-700">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
) : (
            <div className="text-center py-16">
              <div className="text-surface-400 mb-4">
                <BookOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2 font-heading">
                No Content Available
              </h3>
              <p className="text-surface-600">
                This topic doesn't have any content yet.
              </p>
            </div>
          )}
        </div>
</div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteTopic}
        title="Delete Topic"
        message={`Are you sure you want to delete "${topic?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        loading={actionLoading}
      />
    </div>
  );
};

export default CourseContentViewer;