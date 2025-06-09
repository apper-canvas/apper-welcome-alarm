import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
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
};

export default LoadingSpinner;