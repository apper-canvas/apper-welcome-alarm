import React from 'react';
import { motion } from 'framer-motion';
import HeroIntroContent from '@/components/molecules/HeroIntroContent';
import HeroCallToAction from '@/components/molecules/HeroCallToAction';

const HomePageHero = ({ content, handleNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center max-w-2xl mx-auto"
    >
      <HeroIntroContent
        headline={content?.headline}
        introLine1={content?.introLine1}
        introLine2={content?.introLine2}
      />

      <HeroCallToAction
        ctaText={content?.ctaText}
        onClick={handleNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />

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
  );
};

export default HomePageHero;