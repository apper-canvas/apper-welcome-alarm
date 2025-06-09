import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ApperIconLogo = ({ className, ...motionProps }) => {
  return (
    <motion.div
      className={`w-24 h-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg ${className}`}
      {...motionProps}
    >
      <ApperIcon name="Zap" className="w-12 h-12 text-white" />
    </motion.div>
  );
};

export default ApperIconLogo;