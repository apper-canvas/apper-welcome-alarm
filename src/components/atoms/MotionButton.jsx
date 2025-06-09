import React from 'react';
import { motion } from 'framer-motion';

const MotionButton = ({ children, className, onClick, ...motionProps }) => {
  return (
    <motion.button
      onClick={onClick}
      className={className}
      {...motionProps} // Pass framer-motion props
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;