import React from 'react';

/**
 * Segmented Onboarding Progress Indicator
 * 
 * @param {Object} props
 * @param {number} props.currentStep - 1-based index
 * @param {number} [props.totalSteps=7]
 * @param {string} [props.className='']
 */
export const OnboardingProgress = ({
  currentStep = 1,
  totalSteps = 7,
  className = '',
}) => {
  return (
    <div
      className={`nuzio-onboarding-progress ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Onboarding step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const stepNum = idx + 1;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;

        return (
          <div
            key={idx}
            className={`nuzio-onboarding-progress__segment ${
              isCompleted ? 'nuzio-onboarding-progress__segment--completed' : ''
            } ${isCurrent ? 'nuzio-onboarding-progress__segment--current' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default OnboardingProgress;
