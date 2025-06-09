import React, { useState, useEffect } from 'react';
import { pageContentService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import HomePageHero from '@/components/organisms/HomePageHero';
import FeatureShowcase from '@/components/organisms/FeatureShowcase';

const HomePage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await pageContentService.getAll();
        setContent(data[0]); // Get the first (and only) content item
      } catch (error) {
        console.error('Failed to load content:', error);
        // Fallback content
        setContent({
          logoUrl: '', // Not used directly, ApperIcon is fixed
          headline: 'Welcome to Apper – Your AI App Builder',
          introLine1: 'Transform your ideas into fully functional apps in minutes.',
          introLine2: 'No coding experience required - just describe what you want to build.',
          ctaText: 'Click Next to begin',
          nextUrl: '/getting-started'
        });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleNext = () => {
    // In a real app, this would navigate to the next step
    window.location.href = content?.nextUrl || '/getting-started';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-background flex flex-col items-center justify-center px-4 py-16 relative">
      <HomePageHero content={content} handleNext={handleNext} />
      <FeatureShowcase />
    </div>
  );
};

export default HomePage;