import React, { useEffect, useRef } from 'react';
import { BookOpen, ChevronRight, Menu, X } from 'lucide-react';

const CourseTopicSidebar = ({ topics, selectedTopic, onTopicSelect, collapsed, onToggleCollapse, title = "Course Content", subtitle = "Getting Started with Apper" }) => {
  const selectedRef = useRef(null);

  useEffect(() => {
    // Scroll selected topic into view
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedTopic]);

  const handleKeyDown = (event, topic) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onTopicSelect(topic);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const currentIndex = topics.findIndex(t => t.id === topic.id);
      const nextIndex = Math.min(currentIndex + 1, topics.length - 1);
      const nextElement = event.currentTarget.parentElement.children[nextIndex];
      nextElement?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const currentIndex = topics.findIndex(t => t.id === topic.id);
      const prevIndex = Math.max(currentIndex - 1, 0);
      const prevElement = event.currentTarget.parentElement.children[prevIndex];
      prevElement?.focus();
    }
  };

return (
    <div className="h-full flex flex-col document-sidebar">
      {/* Header with Collapse Toggle */}
      <div className="p-4 md:p-6 border-b border-surface-200">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${collapsed ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
{!collapsed && (
              <div>
                <h2 className="text-lg font-semibold text-surface-900 font-heading">
                  {title}
                </h2>
                <p className="text-sm text-surface-600">
                  {subtitle}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-2 text-surface-500 hover:text-surface-700 hover:bg-surface-100 rounded-lg transition-colors duration-200 hidden md:flex"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

{/* Table of Contents */}
      <div className="flex-1 overflow-y-auto document-nav">
        {topics.length === 0 ? (
          <div className={`p-6 text-center ${collapsed ? 'hidden' : 'block'}`}>
            <div className="text-surface-400 mb-2">
              <BookOpen className="w-12 h-12 mx-auto mb-3" />
            </div>
            <p className="text-surface-600 text-sm">
              No course topics available yet.
            </p>
          </div>
        ) : (
          <nav className={`${collapsed ? 'p-2' : 'p-4'}`} role="navigation" aria-label="Course topics">
            <ul className="space-y-1">
              {topics.map((topic, index) => {
                const isSelected = selectedTopic?.id === topic.id;
                return (
                  <li key={topic.id}>
                    <button
                      ref={isSelected ? selectedRef : null}
                      className={`
                        w-full text-left rounded-lg transition-all duration-200
                        border border-transparent
                        focus:outline-none focus:ring-2 focus:ring-primary/50
                        hover:bg-surface-50 hover:border-surface-200
                        hover:shadow-sm group
                        ${collapsed ? 'p-2' : 'p-3'}
                        ${isSelected 
                          ? 'bg-primary/8 border-primary/20 text-primary font-medium shadow-sm' 
                          : 'text-surface-700 hover:text-surface-900'
                        }
                      `}
                      onClick={() => onTopicSelect(topic)}
                      onKeyDown={(e) => handleKeyDown(e, topic)}
                      tabIndex={0}
                      aria-current={isSelected ? 'page' : undefined}
                      title={collapsed ? topic.title : undefined}
                    >
                      {collapsed ? (
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
                          <ChevronRight className={`
                            w-4 h-4 transition-all duration-200 flex-shrink-0 ml-2
                            ${isSelected 
                              ? 'text-primary rotate-90 transform' 
                              : 'text-surface-400 group-hover:text-surface-600'
                            }
                          `} />
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
      {!collapsed && (
        <div className="p-4 border-t border-surface-200 bg-surface-50/50">
          <div className="text-xs text-surface-500 text-center">
            {topics.length} {topics.length === 1 ? 'topic' : 'topics'} available
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseTopicSidebar;