import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout.jsx';
import Button from '../../components/common/Button.jsx';
import Card from '../../components/common/Card.jsx';
import Input from '../../components/common/Input.jsx';
import { useOnboarding } from '../../context/OnboardingContext.jsx';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const { onboardingData, setUserName } = useOnboarding();

  const handleContinue = () => {
    navigate('/onboarding/profession');
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={7}
      backPath="/onboarding/language"
      continueLabel="Set up your briefing"
      onContinue={handleContinue}
    >
      <div className="onboarding-step onboarding-welcome-step">
        <div className="onboarding-welcome-hero">
          <div className="onboarding-welcome-badge">
            <Sparkles size={14} />
            <span>AI Audio & Executive Briefings</span>
          </div>

          <h1 className="onboarding-welcome-title">
            Good morning.<br />
            <span className="onboarding-welcome-accent">News on go.</span>
          </h1>

          <p className="onboarding-welcome-desc">
            Personalized audio news for Indian professionals — curated every morning from hundreds of verified global and local sources.
          </p>
        </div>

        {/* Value Prop Highlights Card */}
        <Card padding="medium" className="onboarding-welcome-card">
          <div className="onboarding-prop-list">
            <div className="onboarding-prop-item">
              <div className="onboarding-prop-icon">
                <CheckCircle2 size={16} />
              </div>
              <div className="onboarding-prop-text">
                <strong>5-Minute Audio Synthesis:</strong> Crystal clear neural voices tailored to your commute.
              </div>
            </div>

            <div className="onboarding-prop-item">
              <div className="onboarding-prop-icon">
                <CheckCircle2 size={16} />
              </div>
              <div className="onboarding-prop-text">
                <strong>Zero Clickbait:</strong> Distilled high-signal insights across markets, tech, and policy.
              </div>
            </div>

            <div className="onboarding-prop-item">
              <div className="onboarding-prop-icon">
                <Shield size={16} />
              </div>
              <div className="onboarding-prop-text">
                <strong>Fact-Checked Precision:</strong> Multi-source verification algorithm.
              </div>
            </div>
          </div>
        </Card>

        <div className="onboarding-identity-section" style={{ marginTop: 'var(--space-6)' }}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label className="typo-label" htmlFor="nameInput" style={{ display: 'block', marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
              How should your AI refer to you?
            </label>
            <Input
              id="nameInput"
              placeholder="Enter your name"
              value={onboardingData.userName || ''}
              onChange={(e) => setUserName(e.target.value)}
              size="large"
            />
          </div>
          {/* Avatar selection is handled by the backend/later phases, just name for now based on context defaults */}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default WelcomePage;
