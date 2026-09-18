import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Volume2,
  Clock,
  Bell,
  Globe,
  Check,
} from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';

export const ReadyPage = () => {
  const navigate = useNavigate();
  const { onboardingData } = useOnboarding();

  const {
    userName = 'Aarav',
    language = 'en',
    profession = 'Technology',
    interests = ['AI & Technology', 'Financial Markets'],
    narrator = 'Aria',
    briefTime = '7:00 AM',
    notificationsEnabled = true,
  } = onboardingData;

  const handleStartListening = () => {
    navigate('/register');
  };

  return (
    <OnboardingLayout
      showProgress={false}
      backPath="/onboarding/notifications"
      customFooter={
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleStartListening}
          rightIcon={<ArrowRight size={18} />}
          className="nuzio-btn-start-listening"
        >
          Create account & start listening
        </Button>
      }
    >
      <div className="onboarding-step onboarding-ready-step">
        {/* Glowing Success Hero */}
        <div className="onboarding-ready-hero">
          <div className="onboarding-ready-icon-halo">
            <div className="onboarding-ready-icon-center">
              <Check size={32} />
            </div>
          </div>

          <h1 className="onboarding-ready-title">
            You're ready,<br />
            <span className="onboarding-ready-name">{userName}.</span>
          </h1>

          <p className="onboarding-ready-subtitle">
            Your first brief will be ready tomorrow at <strong>{briefTime}</strong>.
          </p>
        </div>

        {/* Dynamic Preferences Summary Card */}
        <Card padding="medium" className="onboarding-summary-card">
          <div className="summary-list">
            {/* Language */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Globe size={16} />
                </div>
                <div>
                  <span className="summary-label">Language</span>
                  <p className="summary-value">
                    {language === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
                  </p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>

            <div className="summary-divider" />

            {/* Profession */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Briefcase size={16} />
                </div>
                <div>
                  <span className="summary-label">Profession Focus</span>
                  <p className="summary-value">{profession || 'Technology'}</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>

            <div className="summary-divider" />

            {/* Selected Interests */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Layers size={16} />
                </div>
                <div>
                  <span className="summary-label">Selected Niches</span>
                  <p className="summary-value">
                    {interests.length > 0 ? interests.join(', ') : 'AI & Technology, Financial Markets'}
                  </p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>

            <div className="summary-divider" />

            {/* Narrator */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Volume2 size={16} />
                </div>
                <div>
                  <span className="summary-label">AI Narrator</span>
                  <p className="summary-value">{narrator || 'Aria'} (Neural Voice)</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>

            <div className="summary-divider" />

            {/* Brief Time */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="summary-label">Daily Brief Schedule</span>
                  <p className="summary-value">{briefTime || '7:00 AM'}</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>

            <div className="summary-divider" />

            {/* Notifications */}
            <div className="summary-row">
              <div className="summary-row__left">
                <div className="summary-icon-box">
                  <Bell size={16} />
                </div>
                <div>
                  <span className="summary-label">Notifications</span>
                  <p className="summary-value">
                    {notificationsEnabled ? 'Enabled (Instant Alerts)' : 'Silent Mode'}
                  </p>
                </div>
              </div>
              <CheckCircle2 size={16} className="summary-check-icon" />
            </div>
          </div>
        </Card>
      </div>
    </OnboardingLayout>
  );
};

export default ReadyPage;
