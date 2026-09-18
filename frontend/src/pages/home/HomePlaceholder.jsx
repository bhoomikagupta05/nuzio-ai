import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Radio, Play, RotateCcw, Layout, LogOut, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import AppLayout from '../../layouts/AppLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';

export const HomePlaceholder = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { resetOnboarding } = useOnboarding();

  // Combine authenticated user record with onboarding defaults
  const displayName = user?.name || 'Aarav';
  const displayEmail = user?.email || '';
  const displayLanguage = user?.language === 'hi' ? 'हिन्दी' : 'English';
  const displayNarrator = user?.narrator?.name || (typeof user?.narrator === 'string' ? user?.narrator : 'Aria');
  const displayBriefTime = user?.briefTime || '7:00 AM';
  const displayInterests = user?.interests && user.interests.length > 0
    ? user.interests
    : ['AI & Technology', 'Financial Markets'];
  const displayPlan = user?.plan || 'free';

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const handleRestartOnboarding = () => {
    resetOnboarding();
    navigate('/onboarding/language');
  };

  return (
    <AppLayout
      activeNavId="home"
      topBarTitle="Daily Briefing"
    >
      <div className="home-placeholder-container">
        {/* Hero Card */}
        <Card glow padding="large" className="home-placeholder-hero-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div className="home-placeholder-badge">
              <Radio size={14} className="pulse-icon" />
              <span>AI Audio Intelligence Active</span>
            </div>

            <Badge variant={displayPlan === 'pro' ? 'purple' : 'neutral'} size="small">
              <ShieldCheck size={12} style={{ marginRight: 4 }} />
              {displayPlan.toUpperCase()} TIER
            </Badge>
          </div>

          <h1 className="home-placeholder-title">
            Good morning, <span className="hero-gradient-text">{displayName}</span>.
          </h1>

          <p className="home-placeholder-subtitle">
            Your personalized briefing is configured for <strong>{displayBriefTime}</strong> in {displayLanguage}, narrated by <strong>{displayNarrator}</strong>.
          </p>

          {displayEmail && (
            <p className="typo-body-small" style={{ color: 'var(--text-muted)', marginTop: '-8px' }}>
              Connected account: <code>{displayEmail}</code>
            </p>
          )}

          <div className="home-placeholder-interests-pills">
            {displayInterests.map((interest) => (
              <Badge key={interest} variant="purple" size="small">
                {interest}
              </Badge>
            ))}
          </div>

          <div className="home-placeholder-actions">
            <Button
              variant="primary"
              size="medium"
              leftIcon={<Play size={18} />}
              onClick={() => alert(`Playing morning brief preview narrated by ${displayNarrator}...`)}
            >
              Play Morning Brief Sample
            </Button>

            <Button
              variant="secondary"
              size="medium"
              leftIcon={<RotateCcw size={16} />}
              onClick={handleRestartOnboarding}
            >
              Re-run Onboarding
            </Button>

            <Button
              variant="ghost"
              size="medium"
              leftIcon={<Layout size={16} />}
              onClick={() => navigate('/design-system')}
            >
              View Design System
            </Button>

            <Button
              variant="danger"
              size="medium"
              leftIcon={<LogOut size={16} />}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </Card>

        {/* Phase Note */}
        <div className="home-placeholder-phase-note">
          <span className="typo-overline">Phase 4 Complete • MongoDB Authenticated</span>
          <p className="typo-body-small">
            Real MongoDB authentication, JWT authorization, and onboarding preference syncing are operational. News APIs, Gemini synthesis, and daily audio streams will be implemented in subsequent phases.
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePlaceholder;
