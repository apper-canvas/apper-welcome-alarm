import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'info'
  loading = false 
}) => {
  if (!isOpen) return null;

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && !loading) {
      onConfirm();
    }
  };

  const typeStyles = {
    danger: {
      icon: 'text-red-600',
      button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      border: 'border-red-200'
    },
    warning: {
      icon: 'text-yellow-600',
      button: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      border: 'border-yellow-200'
    },
    info: {
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      border: 'border-blue-200'
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
    >
      <div className={`bg-white rounded-xl shadow-xl w-full max-w-md border-2 ${currentStyle.border}`}>
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-surface-100`}>
              <AlertTriangle className={`w-6 h-6 ${currentStyle.icon}`} />
            </div>
            <h3 
              id="dialog-title"
              className="text-lg font-semibold text-surface-900 font-heading"
            >
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-surface-400 hover:text-surface-600 hover:bg-surface-100 rounded-lg transition-colors duration-200"
            disabled={loading}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p 
            id="dialog-message"
            className="text-surface-600 leading-relaxed mb-6"
          >
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-surface-700 bg-white border border-surface-300 rounded-lg hover:bg-surface-50 focus:outline-none focus:ring-2 focus:ring-surface-500 transition-colors duration-200"
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${currentStyle.button}`}
              disabled={loading}
              autoFocus
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;