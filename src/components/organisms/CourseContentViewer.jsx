import React from 'react';
import { Plus, Edit, Trash2, BookOpen, Clock, User } from 'lucide-react';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

const CourseContentViewer = ({ 
  topic, 
  loading, 
  isAdmin, 
  onAdd, 
  onEdit, 
  onDelete 
}) => {
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
          {isAdmin && (
            <button
              onClick={onAdd}
              className="mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
            >
              Add First Topic
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header with Admin Controls */}
      <div className="border-b border-surface-200 bg-white sticky top-0 z-10">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-surface-900 mb-2 font-heading">
                {topic.title}
              </h1>
              {topic.description && (
                <p className="text-surface-600 text-lg">
                  {topic.description}
                </p>
              )}
              
              {/* Topic Metadata */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-surface-500">
                {topic.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{topic.duration}</span>
                  </div>
                )}
                {topic.author && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{topic.author}</span>
                  </div>
                )}
                {topic.difficulty && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onAdd}
                  className="p-2 text-surface-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200"
                  title="Add New Topic"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={onEdit}
                  className="p-2 text-surface-600 hover:text-secondary hover:bg-secondary/5 rounded-lg transition-colors duration-200"
                  title="Edit Topic"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-surface-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete Topic"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            )}
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
            <div className="text-center py-12">
              <div className="text-surface-400 mb-4">
                <BookOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-surface-800 mb-2 font-heading">
                No Content Available
              </h3>
              <p className="text-surface-600 mb-4">
                This topic doesn't have any content yet.
              </p>
              {isAdmin && (
                <button
                  onClick={onEdit}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  Add Content
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContentViewer;