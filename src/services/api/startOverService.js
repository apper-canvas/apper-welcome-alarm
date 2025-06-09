/**
 * Start Over Service
 * Handles application reset functionality and data backup operations
 */

import { toast } from 'react-toastify';

// Simulate API delays for realistic UX
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create and download a backup of all application data
 */
export const downloadBackup = async () => {
  await delay(2000); // Simulate backup creation time
  
  try {
    // Gather all application data
    const backupData = {
      metadata: {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        platform: 'Apper',
        type: 'full_backup'
      },
      userData: {
        preferences: JSON.parse(localStorage.getItem('userPreferences') || '{}'),
        settings: JSON.parse(localStorage.getItem('appSettings') || '{}'),
        progress: JSON.parse(localStorage.getItem('userProgress') || '{}')
      },
      courseData: JSON.parse(localStorage.getItem('courseContent') || '[]'),
      learningModules: JSON.parse(localStorage.getItem('learningModules') || '[]'),
      studyGuides: JSON.parse(localStorage.getItem('studyGuides') || '[]'),
      applicationState: {
        currentRoute: window.location.pathname,
        lastActiveDate: new Date().toISOString(),
        sessionData: JSON.parse(localStorage.getItem('sessionData') || '{}')
      }
    };

    // Create downloadable file
    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create download link
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `apper-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    return {
      success: true,
      message: 'Backup created successfully',
      filename: link.download
    };
  } catch (error) {
    console.error('Backup creation failed:', error);
    throw new Error('Failed to create backup. Please try again.');
  }
};

/**
 * Reset application to initial state
 */
export const resetApplication = async () => {
  await delay(3000); // Simulate reset process time
  
  try {
    // Clear all localStorage data
    const keysToRemove = [
      'userPreferences',
      'appSettings',
      'userProgress',
      'courseContent',
      'learningModules',
      'studyGuides',
      'sessionData',
      'authToken',
      'lastActivity',
      'customConfigurations'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear any cached data
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }
    
    // Reset application state
    window.history.replaceState({}, '', '/');
    
    return {
      success: true,
      message: 'Application reset completed successfully'
    };
  } catch (error) {
    console.error('Reset process failed:', error);
    throw new Error('Failed to reset application. Please contact support.');
  }
};

/**
 * Validate backup file before restore
 */
export const validateBackup = async (file) => {
  await delay(500);
  
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    
    // Check required structure
    const requiredFields = ['metadata', 'userData', 'courseData'];
    const isValid = requiredFields.every(field => field in data);
    
    if (!isValid) {
      throw new Error('Invalid backup file format');
    }
    
    return {
      valid: true,
      version: data.metadata?.version,
      timestamp: data.metadata?.timestamp,
      platform: data.metadata?.platform
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};

/**
 * Restore application from backup
 */
export const restoreFromBackup = async (file) => {
  await delay(2500);
  
  try {
    const validation = await validateBackup(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    const text = await file.text();
    const backupData = JSON.parse(text);
    
    // Restore data to localStorage
    if (backupData.userData) {
      Object.entries(backupData.userData).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
    
    if (backupData.courseData) {
      localStorage.setItem('courseContent', JSON.stringify(backupData.courseData));
    }
    
    if (backupData.learningModules) {
      localStorage.setItem('learningModules', JSON.stringify(backupData.learningModules));
    }
    
    if (backupData.studyGuides) {
      localStorage.setItem('studyGuides', JSON.stringify(backupData.studyGuides));
    }
    
    return {
      success: true,
      message: 'Backup restored successfully',
      restoredAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Restore failed:', error);
    throw new Error('Failed to restore from backup. Please check the file and try again.');
  }
};

/**
 * Get current application state summary
 */
export const getApplicationSummary = async () => {
  await delay(200);
  
  try {
    const summary = {
      dataSize: calculateDataSize(),
      lastModified: getLastModifiedDate(),
      itemCounts: {
        courses: JSON.parse(localStorage.getItem('courseContent') || '[]').length,
        modules: JSON.parse(localStorage.getItem('learningModules') || '[]').length,
        guides: JSON.parse(localStorage.getItem('studyGuides') || '[]').length
      },
      userProgress: {
        hasPreferences: !!localStorage.getItem('userPreferences'),
        hasSettings: !!localStorage.getItem('appSettings'),
        hasProgress: !!localStorage.getItem('userProgress')
      }
    };
    
    return summary;
  } catch (error) {
    console.error('Failed to get application summary:', error);
    return null;
  }
};

// Helper functions
const calculateDataSize = () => {
  let totalSize = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length;
    }
  }
  return Math.round(totalSize / 1024); // Convert to KB
};

const getLastModifiedDate = () => {
  const lastActivity = localStorage.getItem('lastActivity');
  return lastActivity ? new Date(lastActivity) : new Date();
};

// Export all functions
export default {
  downloadBackup,
  resetApplication,
  validateBackup,
  restoreFromBackup,
  getApplicationSummary
};