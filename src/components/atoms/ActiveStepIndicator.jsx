import React from 'react';
import { motion } from 'framer-motion';

const ActiveStepIndicator = ({ className, ...motionProps }) => {
  return (
    <motion.div
      className={`w-3 h-3 bg-primary rounded-full ${className}`}
      {...motionProps}
    />
  );
};

export default ActiveStepIndicator;