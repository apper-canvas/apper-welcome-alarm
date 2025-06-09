import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '../ApperIcon';
import MotionButton from '../atoms/MotionButton';

const HeroCallToAction = ({ ctaText, onClick, className, ...motionDivProps }) => {
  return (
    <motion.div className={className} {...motionDivProps}>
      <MotionButton
        onClick={onClick}
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
          {ctaText}
          <ApperIcon name="ArrowRight" className="w-5 h-5" />
        </span>
      </MotionButton>
    </motion.div>
  );
};

export default HeroCallToAction;