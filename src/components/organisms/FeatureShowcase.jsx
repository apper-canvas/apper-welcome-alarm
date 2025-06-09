import React, { useState } from 'react';
import FeatureStepCard from '@/components/molecules/FeatureStepCard';
import FeaturePagination from '@/components/molecules/FeaturePagination';

const FeatureShowcase = () => {
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
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto mt-16">
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
          <FeatureStepCard
            key={index}
            title={step.title}
            description={step.description}
            iconName={step.icon}
            colorClass={step.color}
            isActive={index === currentStep}
          />
        ))}
      </div>

      <FeaturePagination
        stepsCount={steps.length}
        currentStep={currentStep}
        nextStep={nextStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

export default FeatureShowcase;