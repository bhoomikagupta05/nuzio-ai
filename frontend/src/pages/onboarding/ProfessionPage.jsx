import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Briefcase } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Chip from '../../components/common/Chip.jsx';

export const PROFESSIONS = [
  'Technology',
  'Finance & Banking',
  'Consulting',
  'Healthcare & Biotech',
  'Venture Capital',
  'Legal & Policy',
  'Marketing & Media',
  'Real Estate',
  'Education',
  'Research / Science',
];

export const ProfessionPage = () => {
  const navigate = useNavigate();
  const { onboardingData, setProfession } = useOnboarding();

  const handleContinue = () => {
    if (onboardingData.profession) {
      navigate('/onboarding/interests');
    }
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={7}
      backPath="/onboarding/welcome"
      continueDisabled={!onboardingData.profession}
      onContinue={handleContinue}
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <span className="typo-overline">Step 2</span>
          <h1 className="onboarding-step__title">What's your<br />profession?</h1>
          <p className="onboarding-step__subtitle">
            We'll tune every brief to what actually moves your day.
          </p>
        </div>

        <div className="onboarding-chips-grid">
          {PROFESSIONS.map((prof) => {
            const isSelected = onboardingData.profession === prof;

            return (
              <Chip
                key={prof}
                size="large"
                selected={isSelected}
                showCheck={isSelected}
                onClick={() => setProfession(prof)}
                className="onboarding-profession-chip"
              >
                {prof}
              </Chip>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default ProfessionPage;
