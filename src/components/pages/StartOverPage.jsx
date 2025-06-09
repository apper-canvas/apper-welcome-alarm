import React, { useState, useEffect } from 'react';
import { AlertTriangle, RotateCcw, Download, HelpCircle, ExternalLink, CheckCircle2, XCircle, Info } from 'lucide-react';
import { toast } from 'react-toastify';
import { startOverService } from '@/services';
import ConfirmationDialog from '@/components/molecules/ConfirmationDialog';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';

const StartOverPage = () => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationStep, setConfirmationStep] = useState(1);
  const [backupCompleted, setBackupCompleted] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview', icon: Info },
    { id: 'before-you-start', title: 'Before You Start', icon: AlertTriangle },
    { id: 'backup-data', title: 'Backup Your Data', icon: Download },
    { id: 'reset-process', title: 'Reset Process', icon: RotateCcw },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: HelpCircle },
    { id: 'help-resources', title: 'Help & Resources', icon: ExternalLink }
  ];

  const handleStartOver = () => {
    if (!backupCompleted) {
      toast.warning('Please complete the data backup process before proceeding with reset.');
      setSelectedSection('backup-data');
      return;
    }
    setShowConfirmation(true);
    setConfirmationStep(1);
  };

  const handleConfirmReset = async () => {
    if (confirmationStep < 3) {
      setConfirmationStep(confirmationStep + 1);
      return;
    }

    setLoading(true);
    try {
      await startOverService.resetApplication();
      toast.success('Application has been successfully reset to initial state!');
      setShowConfirmation(false);
      setConfirmationStep(1);
      setBackupCompleted(false);
      // Redirect to home or refresh application
      window.location.href = '/';
    } catch (error) {
      toast.error('Failed to reset application. Please try again or contact support.');
      console.error('Reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackupData = async () => {
    setLoading(true);
    try {
      await startOverService.downloadBackup();
      setBackupCompleted(true);
      toast.success('Data backup downloaded successfully!');
    } catch (error) {
      toast.error('Failed to create backup. Please try again.');
      console.error('Backup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Info className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">What does "Start Over" mean?</h3>
                  <p className="text-blue-800 leading-relaxed">
                    Starting over will reset your Apper application to its initial state, removing all custom configurations, 
                    user data, and progress. This is useful when you want to begin a completely new project or troubleshoot 
                    persistent issues.
                  </p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-surface-900 mb-4">What will be reset:</h3>
              <ul className="space-y-2 text-surface-600">
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>All user preferences and settings</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Course content and learning progress</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Custom configurations and integrations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Saved data and user-generated content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Authentication sessions and cached data</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-surface-900 mb-4 mt-8">What will remain:</h3>
              <ul className="space-y-2 text-surface-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Core Apper application structure</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>Default templates and components</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span>System configurations and dependencies</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'before-you-start':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Considerations</h3>
                  <p className="text-yellow-800 leading-relaxed">
                    Before proceeding with the reset, please carefully review the following checklist to ensure you don't lose important data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-surface-900 mb-4">Pre-Reset Checklist</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-0.5">1</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Review your current progress</h4>
                    <p className="text-surface-600 text-sm">Take note of any important configurations, customizations, or data you may want to recreate.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-0.5">2</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Document custom settings</h4>
                    <p className="text-surface-600 text-sm">Make a list of any custom configurations, API keys, or integrations you've set up.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-0.5">3</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Export important data</h4>
                    <p className="text-surface-600 text-sm">Use the backup feature to download all your data before proceeding with the reset.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium mt-0.5">4</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Inform team members</h4>
                    <p className="text-surface-600 text-sm">If you're working in a team, make sure to notify other members about the planned reset.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backup-data':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Download className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Data Backup</h3>
                  <p className="text-green-800 leading-relaxed">
                    Create a complete backup of your current application state before proceeding with the reset. This ensures you can recover your data if needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-surface-900 mb-4">Backup Process</h3>
              <div className="space-y-4">
                <p className="text-surface-600">
                  The backup will include all your user data, settings, course progress, and configurations in a downloadable JSON file.
                </p>
                
                <div className="bg-surface-50 rounded-lg p-4">
                  <h4 className="font-medium text-surface-900 mb-2">What's included in the backup:</h4>
                  <ul className="text-sm text-surface-600 space-y-1">
                    <li>• User preferences and settings</li>
                    <li>• Course content and progress data</li>
                    <li>• Learning modules and study guides</li>
                    <li>• Custom configurations</li>
                    <li>• Application state and metadata</li>
                  </ul>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-surface-900">Create Backup</h4>
                    <p className="text-sm text-surface-600">Download a complete backup of your current data</p>
                  </div>
                  <button
                    onClick={handleBackupData}
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>{loading ? 'Creating...' : 'Download Backup'}</span>
                  </button>
                </div>

                {backupCompleted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">Backup completed successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">Your backup file has been downloaded. You can now proceed with the reset process.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'reset-process':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <RotateCcw className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Reset Process</h3>
                  <p className="text-red-800 leading-relaxed">
                    The reset process will completely restore your Apper application to its initial state. This action cannot be undone without a backup.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-surface-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-surface-900 mb-4">What happens during reset:</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-medium mt-0.5">1</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Data Cleanup</h4>
                    <p className="text-surface-600 text-sm">All user-generated content and configurations will be removed from the application.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-medium mt-0.5">2</div>
                  <div>
                    <h4 className="font-medium text-surface-900">State Reset</h4>
                    <p className="text-surface-600 text-sm">Application state will be restored to the initial installation configuration.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-medium mt-0.5">3</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Cache Clearing</h4>
                    <p className="text-surface-600 text-sm">All cached data and temporary files will be cleared from the system.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-medium mt-0.5">4</div>
                  <div>
                    <h4 className="font-medium text-surface-900">Application Restart</h4>
                    <p className="text-surface-600 text-sm">The application will restart and present the initial welcome screen.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Important Note</h4>
                    <p className="text-yellow-800 text-sm">The reset process typically takes 30-60 seconds. Do not close the browser or navigate away during this time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Troubleshooting</h3>
                  <p className="text-blue-800 leading-relaxed">
                    Common issues you might encounter during the reset process and their solutions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-2">Reset process stuck or failed</h4>
                <p className="text-surface-600 text-sm mb-3">If the reset process appears to be stuck or fails to complete:</p>
                <ul className="text-surface-600 text-sm space-y-1 ml-4">
                  <li>• Refresh the browser and try again</li>
                  <li>• Clear your browser cache and cookies</li>
                  <li>• Ensure you have a stable internet connection</li>
                  <li>• Try using a different browser or incognito mode</li>
                </ul>
              </div>

              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-2">Backup download not working</h4>
                <p className="text-surface-600 text-sm mb-3">If you're unable to download the backup file:</p>
                <ul className="text-surface-600 text-sm space-y-1 ml-4">
                  <li>• Check your browser's download settings</li>
                  <li>• Disable popup blockers temporarily</li>
                  <li>• Try downloading from a different browser</li>
                  <li>• Contact support for manual backup assistance</li>
                </ul>
              </div>

              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-2">Application not responding after reset</h4>
                <p className="text-surface-600 text-sm mb-3">If the application doesn't load properly after reset:</p>
                <ul className="text-surface-600 text-sm space-y-1 ml-4">
                  <li>• Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)</li>
                  <li>• Clear all browser data for this site</li>
                  <li>• Wait a few minutes and try again</li>
                  <li>• Contact technical support if issues persist</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'help-resources':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <ExternalLink className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Help & Resources</h3>
                  <p className="text-green-800 leading-relaxed">
                    Additional resources and support options for the Apper platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-4">Documentation & Guides</h4>
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors duration-200">
                    <div>
                      <h5 className="font-medium text-surface-900">Getting Started Guide</h5>
                      <p className="text-surface-600 text-sm">Complete guide for new users</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-surface-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors duration-200">
                    <div>
                      <h5 className="font-medium text-surface-900">Configuration Manual</h5>
                      <p className="text-surface-600 text-sm">Advanced configuration options</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-surface-400" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-3 bg-surface-50 rounded-lg hover:bg-surface-100 transition-colors duration-200">
                    <div>
                      <h5 className="font-medium text-surface-900">API Documentation</h5>
                      <p className="text-surface-600 text-sm">Developer resources and API reference</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-surface-400" />
                  </a>
                </div>
              </div>

              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-4">Support Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-surface-900">Email Support</h5>
                      <p className="text-surface-600 text-sm">support@apper.com</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-surface-900">Community Forum</h5>
                      <p className="text-surface-600 text-sm">Get help from the community</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                    <div>
                      <h5 className="font-medium text-surface-900">Live Chat</h5>
                      <p className="text-surface-600 text-sm">Available 9 AM - 5 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-surface-200 rounded-lg p-6">
                <h4 className="font-semibold text-surface-900 mb-4">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  <details className="group">
                    <summary className="flex items-center justify-between p-3 bg-surface-50 rounded-lg cursor-pointer hover:bg-surface-100 transition-colors duration-200">
                      <span className="font-medium text-surface-900">Can I recover data after reset without a backup?</span>
                      <span className="transform group-open:rotate-180 transition-transform duration-200">↓</span>
                    </summary>
                    <div className="mt-2 p-3 text-surface-600 text-sm">
                      No, once the reset is complete, all data is permanently removed. This is why creating a backup is essential before proceeding.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between p-3 bg-surface-50 rounded-lg cursor-pointer hover:bg-surface-100 transition-colors duration-200">
                      <span className="font-medium text-surface-900">How long does the reset process take?</span>
                      <span className="transform group-open:rotate-180 transition-transform duration-200">↓</span>
                    </summary>
                    <div className="mt-2 p-3 text-surface-600 text-sm">
                      The reset process typically takes 30-60 seconds, depending on the amount of data being cleared.
                    </div>
                  </details>
                  <details className="group">
                    <summary className="flex items-center justify-between p-3 bg-surface-50 rounded-lg cursor-pointer hover:bg-surface-100 transition-colors duration-200">
                      <span className="font-medium text-surface-900">Will I need to reconfigure integrations?</span>
                      <span className="transform group-open:rotate-180 transition-transform duration-200">↓</span>
                    </summary>
                    <div className="mt-2 p-3 text-surface-600 text-sm">
                      Yes, all custom integrations and API configurations will need to be set up again after the reset.
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getConfirmationMessage = () => {
    switch (confirmationStep) {
      case 1:
        return "Are you absolutely sure you want to reset the application? This action cannot be undone.";
      case 2:
        return "This will permanently delete all your data, settings, and progress. Have you created a backup?";
      case 3:
        return "Last warning: All data will be lost forever. Type 'RESET' to confirm.";
      default:
        return "";
    }
  };

  const getConfirmationTitle = () => {
    return `Confirm Reset - Step ${confirmationStep} of 3`;
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 bg-white document-sidebar overflow-y-auto">
        <div className="p-6 border-b border-surface-200">
          <h1 className="text-2xl font-bold text-surface-900 font-heading">Start Over Guide</h1>
          <p className="text-surface-600 text-sm mt-2">Reset your Apper application to begin fresh</p>
        </div>
        
        <nav className="p-4 document-nav">
          <ul className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      selectedSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 document-viewer overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-sm border border-surface-200 overflow-hidden">
            {/* Header */}
            <div className="border-b border-surface-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-surface-900 font-heading">
                    {sections.find(s => s.id === selectedSection)?.title}
                  </h2>
                  <p className="text-surface-600 mt-1">
                    Complete guide for resetting your Apper application
                  </p>
                </div>
                {selectedSection === 'reset-process' && (
                  <button
                    onClick={handleStartOver}
                    disabled={loading}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <RotateCcw className="w-5 h-5" />
                    )}
                    <span>Start Over Process</span>
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setConfirmationStep(1);
        }}
        onConfirm={handleConfirmReset}
        title={getConfirmationTitle()}
        message={getConfirmationMessage()}
        confirmText={confirmationStep === 3 ? "RESET APPLICATION" : "Continue"}
        cancelText="Cancel"
        type="danger"
        loading={loading}
      />
    </div>
  );
};

export default StartOverPage;