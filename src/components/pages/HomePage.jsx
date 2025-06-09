import React, { useState, useEffect } from 'react';
import { pageContentService } from '@/services';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import HomePageHero from '@/components/organisms/HomePageHero';

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
          nextUrl: '/how-it-works'
        });
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleNext = () => {
    // Navigate to the how it works page
    window.location.href = content?.nextUrl || '/how-it-works';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-background flex flex-col items-center justify-center px-4 py-16 relative">
      <HomePageHero content={content} handleNext={handleNext} />
    </div>
  );
};

export default HomePage;