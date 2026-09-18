import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Chip from '../../components/common/Chip.jsx';
import Badge from '../../components/common/Badge.jsx';

export const INTEREST_TOPICS = [
  'AI & Technology',
  'Financial Markets',
  'Indian Business',
  'Global Politics',
  'Startups',
  'Science',
  'Geopolitics',
  'Health & Medicine',
  'Climate & Energy',
  'Culture & Arts',
  'Legal & Policy',
  'Education',
];

export const InterestsPage = () => {
  const navigate = useNavigate();
  const { onboardingData, toggleInterest } = useOnboarding();
  const selectedCount = onboardingData.interests.length;

  const handleContinue = () => {
    if (selectedCount >= 1) {
      navigate('/onboarding/narrator');
    }
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={7}
      backPath="/onboarding/profession"
      continueDisabled={selectedCount === 0}
      onContinue={handleContinue}
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <div className="onboarding-step__header-top">
            <span className="typo-overline">Step 3</span>
            <Badge
              variant={selectedCount === 7 ? 'purple' : 'muted'}
              size="small"
              className="onboarding-counter-badge"
            >
              {selectedCount}/7 Selected
            </Badge>
          </div>

          <h1 className="onboarding-step__title">What moves<br />your world?</h1>
          <p className="onboarding-step__subtitle">
            Pick up to 7 niches to focus your personal AI news filter.
          </p>
        </div>

        <div className="onboarding-chips-grid">
          {INTEREST_TOPICS.map((topic) => {
            const isSelected = onboardingData.interests.includes(topic);
            const isMaxReached = selectedCount >= 7 && !isSelected;

            return (
              <Chip
                key={topic}
                size="large"
                selected={isSelected}
                showCheck={isSelected}
                disabled={isMaxReached}
                onClick={() => toggleInterest(topic)}
                className={`onboarding-interest-chip ${
                  isMaxReached ? 'onboarding-interest-chip--dimmed' : ''
                }`}
              >
                {topic}
              </Chip>
            );
          })}
        </div>

        {selectedCount >= 7 && (
          <p className="onboarding-limit-notice">
            Maximum of 7 niches selected. Tap any chosen niche to deselect.
          </p>
        )}
      </div>
    </OnboardingLayout>
  );
};

export default InterestsPage;
