import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ApperIcon from '../components/ApperIcon';
import { pageContentService } from '../services';

const Home = () => {
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
          logoUrl: '',
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
          <p className="text-gray-500">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <ApperIcon name="Zap" className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-8 tracking-tight"
        >
          {content?.headline}
        </motion.h1>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-12 space-y-2"
        >
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {content?.introLine1}
          </p>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {content?.introLine2}
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            onClick={handleNext}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)"
            }}
            whileTap={{ 
              scale: 0.95,
              y: 2
            }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-primary via-secondary to-accent text-white font-semibold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent/20"
          >
            <span className="flex items-center gap-3">
              {content?.ctaText}
              <ApperIcon name="ArrowRight" className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full blur-3xl"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;