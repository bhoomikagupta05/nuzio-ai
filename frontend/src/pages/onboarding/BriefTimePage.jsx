import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Sun, Moon } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Card from '../../components/common/Card.jsx';

export const TIME_SLOTS = [
  '6:00',
  '6:30',
  '7:00',
  '7:30',
  '8:00',
  '8:30',
  '9:00',
  '9:30',
];

export const BriefTimePage = () => {
  const navigate = useNavigate();
  const { onboardingData, setBriefTime } = useOnboarding();
  const [period, setPeriod] = useState('AM');

  // Parse time and period from context string
  const currentSlot = onboardingData.briefTime?.split(' ')[0] || '7:00';

  const handleSelectSlot = (slot) => {
    setBriefTime(`${slot} ${period}`);
  };

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    setBriefTime(`${currentSlot} ${newPeriod}`);
  };

  const handleContinue = () => {
    if (onboardingData.briefTime) {
      navigate('/onboarding/notifications');
    }
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={7}
      backPath="/onboarding/narrator"
      continueDisabled={!onboardingData.briefTime}
      onContinue={handleContinue}
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <span className="typo-overline">Step 5</span>
          <h1 className="onboarding-step__title">When do you<br />want your brief?</h1>
          <p className="onboarding-step__subtitle">
            Your personalized audio brief will be generated fresh at this time.
          </p>
        </div>

        {/* Selected Time Large Display */}
        <Card glow className="onboarding-time-display-card">
          <div className="onboarding-time-display">
            <Clock size={24} className="time-clock-icon" />
            <span className="time-value-text">{currentSlot}</span>
            <span className="time-period-text">{period}</span>
          </div>
          <span className="time-caption-text">Daily executive synthesis schedule</span>
        </Card>

        {/* AM / PM Segmented Control */}
        <div className="onboarding-period-selector">
          <button
            type="button"
            onClick={() => handlePeriodChange('AM')}
            className={`period-btn ${period === 'AM' ? 'period-btn--active' : ''}`}
          >
            <Sun size={15} />
            <span>AM (Morning)</span>
          </button>
          <button
            type="button"
            onClick={() => handlePeriodChange('PM')}
            className={`period-btn ${period === 'PM' ? 'period-btn--active' : ''}`}
          >
            <Moon size={15} />
            <span>PM (Evening)</span>
          </button>
        </div>

        {/* Time Slots Grid */}
        <div className="onboarding-time-grid">
          {TIME_SLOTS.map((slot) => {
            const isSelected = currentSlot === slot;

            return (
              <button
                key={slot}
                type="button"
                onClick={() => handleSelectSlot(slot)}
                className={`time-slot-btn ${isSelected ? 'time-slot-btn--active' : ''}`}
              >
                <span className="time-slot-num">{slot}</span>
                <span className="time-slot-period">{period}</span>
              </button>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default BriefTimePage;
