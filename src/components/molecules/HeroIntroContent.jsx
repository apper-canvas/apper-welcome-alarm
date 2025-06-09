import React from 'react';
import { motion } from 'framer-motion';
import ApperIconLogo from '@/components/atoms/ApperIconLogo';

const HeroIntroContent = ({ headline, introLine1, introLine2 }) => {
  return (
    <>
      {/* Logo */}
      <ApperIconLogo
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-12"
      />

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-8 tracking-tight"
      >
        {headline}
      </motion.h1>

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-12 space-y-2"
      >
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {introLine1}
        </p>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {introLine2}
        </p>
      </motion.div>
    </>
  );
};

export default HeroIntroContent;