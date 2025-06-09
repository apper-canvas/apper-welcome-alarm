import React from 'react';
import { motion } from 'framer-motion';
import FeatureIconCircle from '@/components/atoms/FeatureIconCircle';
import ActiveStepIndicator from '@/components/atoms/ActiveStepIndicator';

const FeatureStepCard = ({
  title,
  description,
  iconName,
  colorClass,
  isActive
}) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
        isActive
          ? 'border-primary bg-primary/5'
          : 'border-gray-200 bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-4">
        <FeatureIconCircle iconName={iconName} colorClass={colorClass} />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
        {isActive && (
          <ActiveStepIndicator
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default FeatureStepCard;