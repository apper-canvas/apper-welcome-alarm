import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const FeatureIconCircle = ({ iconName, colorClass, className }) => {
  return (
    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center ${className}`}>
      <ApperIcon name={iconName} className="w-6 h-6 text-white" />
    </div>
  );
};

export default FeatureIconCircle;