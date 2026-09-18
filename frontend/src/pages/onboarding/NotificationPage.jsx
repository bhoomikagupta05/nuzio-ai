import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sparkles, Radio, Zap, ShieldCheck } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Toggle from '../../components/common/Toggle.jsx';

export const NotificationPage = () => {
  const navigate = useNavigate();
  const {
    onboardingData,
    setNotificationsEnabled,
    updateNotificationPreferences,
  } = useOnboarding();

  const handleAllow = () => {
    setNotificationsEnabled(true);
    navigate('/onboarding/ready');
  };

  const handleSkip = () => {
    setNotificationsEnabled(false);
    navigate('/onboarding/ready');
  };

  const { notificationPreferences } = onboardingData;

  return (
    <OnboardingLayout
      currentStep={7}
      totalSteps={7}
      backPath="/onboarding/brief-time"
      customFooter={
        <div className="onboarding-notification-actions">
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={handleAllow}
            leftIcon={<Bell size={18} />}
          >
            Allow notifications
          </Button>

          <Button
            variant="ghost"
            size="medium"
            fullWidth
            onClick={handleSkip}
            className="btn-skip-notifs"
          >
            Not now
          </Button>
        </div>
      }
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <span className="typo-overline">Step 6</span>
          <h1 className="onboarding-step__title">Stay in<br />the loop.</h1>
          <p className="onboarding-step__subtitle">
            Turn on notifications so you never miss your morning executive brief.
          </p>
        </div>

        {/* Realistic Mobile Push Notification Preview */}
        <Card glow className="onboarding-notification-preview-card">
          <div className="notif-mockup">
            <div className="notif-mockup__header">
              <div className="notif-mockup__app-tag">
                <div className="notif-mockup__logo-mini">
                  <Sparkles size={12} />
                </div>
                <span>NUZIO AI</span>
              </div>
              <span className="notif-mockup__time">{onboardingData.briefTime || '7:00 AM'}</span>
            </div>

            <div className="notif-mockup__body">
              <h4 className="notif-mockup__title">Your morning brief is ready</h4>
              <p className="notif-mockup__text">
                5 min audio • {onboardingData.profession || 'Executive'} briefing on {onboardingData.interests[0] || 'Top Stories'}.
              </p>
            </div>
          </div>
        </Card>

        {/* Detailed Preferences */}
        <div className="onboarding-notif-toggles">
          <span className="ds-subsection-title">What you'll receive</span>

          <Card padding="medium" className="onboarding-toggles-card">
            <div className="toggle-list">
              <Toggle
                checked={notificationPreferences.morningBrief}
                onChange={(checked) => updateNotificationPreferences({ morningBrief: checked })}
                label="Daily brief ready"
                description="Your morning audio & text summary"
              />

              <div className="toggle-divider" />

              <Toggle
                checked={notificationPreferences.breakingAlerts}
                onChange={(checked) => updateNotificationPreferences({ breakingAlerts: checked })}
                label="Breaking alerts"
                description="High priority events affecting your industry"
              />

              <div className="toggle-divider" />

              <Toggle
                checked={notificationPreferences.weeklyDigest}
                onChange={(checked) => updateNotificationPreferences({ weeklyDigest: checked })}
                label="Weekly intelligence digest"
                description="Sunday evening macro recap"
              />
            </div>
          </Card>
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default NotificationPage;
