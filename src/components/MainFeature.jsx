import { motion } from 'framer-motion';
import { useState } from 'react';
import ApperIcon from './ApperIcon';

const MainFeature = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Describe Your App",
      description: "Tell Apper what you want to build in plain English",
      icon: "MessageSquare",
      color: "from-primary to-secondary"
    },
    {
      title: "AI Builds Your App",
      description: "Watch as Apper creates your app with advanced AI",
      icon: "Cpu",
      color: "from-secondary to-accent"
    },
    {
      title: "Launch & Share",
      description: "Your app is ready to use and share with the world",
      icon: "Rocket",
      color: "from-accent to-primary"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          How Apper Works
        </h2>
        <p className="text-gray-600">
          Building apps has never been this simple
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{
              opacity: index === currentStep ? 1 : 0.5,
              scale: index === currentStep ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-xl border-2 transition-all duration-300 ${
              index === currentStep
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                <ApperIcon name={step.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              {index === currentStep && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <motion.button
          onClick={nextStep}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <span className="flex items-center gap-2">
            Next Step
            <ApperIcon name="ArrowRight" className="w-4 h-4" />
          </span>
        </motion.button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: index === currentStep ? 1.2 : 1,
              backgroundColor: index === currentStep ? '#6366F1' : '#E5E7EB'
            }}
            className="w-2 h-2 rounded-full cursor-pointer"
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainFeature;