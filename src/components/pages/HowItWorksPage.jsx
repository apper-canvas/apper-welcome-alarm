import React from 'react';
import FeatureShowcase from '@/components/organisms/FeatureShowcase';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-background flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <FeatureShowcase />
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-12 space-x-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-surface-200 text-surface-700 rounded-xl font-medium hover:bg-surface-300 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;