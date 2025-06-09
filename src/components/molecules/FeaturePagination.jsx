import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import MotionButton from '@/components/atoms/MotionButton';
import PaginationDot from '@/components/atoms/PaginationDot';

const FeaturePagination = ({ stepsCount, currentStep, nextStep, setCurrentStep }) => {
  return (
    <>
      <div className="flex justify-center mt-8">
        <MotionButton
          onClick={nextStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            Next Step
            <ApperIcon name="ArrowRight" className="w-4 h-4" />
          </span>
        </MotionButton>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {[...Array(stepsCount)].map((_, index) => (
          <PaginationDot
            key={index}
            isActive={index === currentStep}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </>
  );
};

export default FeaturePagination;