import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, Globe } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Toggle from '../../components/common/Toggle.jsx';

export const LanguagePage = () => {
  const navigate = useNavigate();
  const { onboardingData, setLanguage, setLocationEnabled } = useOnboarding();

  const handleContinue = () => {
    if (onboardingData.language) {
      navigate('/onboarding/welcome');
    }
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={7}
      backPath="/"
      continueDisabled={!onboardingData.language}
      onContinue={handleContinue}
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <span className="typo-overline">Step 1</span>
          <h1 className="onboarding-step__title">Choose your<br />language</h1>
          <p className="onboarding-step__subtitle">
            Select the primary language for your daily synthesized news briefings.
          </p>
        </div>

        <div className="onboarding-cards-group">
          {/* English Option */}
          <Card
            interactive
            selected={onboardingData.language === 'en'}
            glow={onboardingData.language === 'en'}
            onClick={() => setLanguage('en')}
            className="onboarding-select-card"
          >
            <div className="onboarding-select-card__inner">
              <div className="onboarding-select-card__text">
                <div className="onboarding-select-card__title-row">
                  <span className="onboarding-select-card__title">English</span>
                  <span className="onboarding-select-card__badge">Default</span>
                </div>
                <p className="onboarding-select-card__sub">
                  Personalized daily audio & text briefing
                </p>
              </div>

              <div className={`onboarding-radio-indicator ${
                onboardingData.language === 'en' ? 'onboarding-radio-indicator--active' : ''
              }`}>
                {onboardingData.language === 'en' && <Check size={14} />}
              </div>
            </div>
          </Card>

          {/* Hindi Option */}
          <Card
            interactive
            selected={onboardingData.language === 'hi'}
            glow={onboardingData.language === 'hi'}
            onClick={() => setLanguage('hi')}
            className="onboarding-select-card"
          >
            <div className="onboarding-select-card__inner">
              <div className="onboarding-select-card__text">
                <div className="onboarding-select-card__title-row">
                  <span className="onboarding-select-card__title">हिन्दी</span>
                  <span className="onboarding-select-card__badge">Hindi</span>
                </div>
                <p className="onboarding-select-card__sub">
                  हिंदी में आपका दैनिक ब्रीफ और समाचार विश्लेषण
                </p>
              </div>

              <div className={`onboarding-radio-indicator ${
                onboardingData.language === 'hi' ? 'onboarding-radio-indicator--active' : ''
              }`}>
                {onboardingData.language === 'hi' && <Check size={14} />}
              </div>
            </div>
          </Card>
        </div>

        {/* Location Toggle */}
        <div className="onboarding-location-box">
          <div className="onboarding-location-box__icon">
            <MapPin size={18} />
          </div>
          <div className="onboarding-location-box__content">
            <Toggle
              checked={onboardingData.locationEnabled}
              onChange={setLocationEnabled}
              label="Enable Local Intelligence"
              description="Surface verified city & regional business updates"
            />
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default LanguagePage;
