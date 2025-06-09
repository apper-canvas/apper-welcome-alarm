import React from 'react';
import { motion } from 'framer-motion';

const PaginationDot = ({ isActive, onClick, className }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.2 : 1,
        backgroundColor: isActive ? '#6366F1' : '#E5E7EB' // Tailwind primary/gray-200 colors
      }}
      className={`w-2 h-2 rounded-full cursor-pointer ${className}`}
      onClick={onClick}
    />
  );
};

export default PaginationDot;