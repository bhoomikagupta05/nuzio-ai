import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Radio } from 'lucide-react';
import Button from '../../components/common/Button.jsx';
import NuzioLogo from '../../components/common/NuzioLogo.jsx';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="nuzio-landing-screen">
      {/* Subtle Purple Atmospheric Glow */}
      <div className="nuzio-shell__glow-backdrop" aria-hidden="true">
        <div className="nuzio-shell__glow-radial" />
      </div>

      <div className="nuzio-landing-content">
        {/* Animated Logo Hero */}
        <div className="nuzio-landing-hero">
          <div className="nuzio-landing-logo-box">
            <NuzioLogo size="hero" />
          </div>

          <p className="nuzio-landing-tagline">
            Personalized AI-powered daily news briefing for modern professionals.
          </p>

          <div className="nuzio-landing-pill">
            <Radio size={14} className="nuzio-landing-pulse-icon" />
            <span>Curated every morning at 7:00 AM</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="nuzio-landing-actions">
          <Button
            variant="primary"
            size="large"
            fullWidth
            rightIcon={<ArrowRight size={18} />}
            onClick={() => navigate('/onboarding/language')}
            className="nuzio-landing-cta"
          >
            Get Started
          </Button>

          <div className="nuzio-landing-login-row" style={{ marginTop: '12px', textAlign: 'center' }}>
            <span className="typo-body-small" style={{ color: 'var(--text-secondary)' }}>
              Already have an account?{' '}
            </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="nuzio-auth-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Sign in
            </button>
          </div>

          <p className="nuzio-landing-subtext">
            Takes less than 60 seconds to personalize
          </p>
        </div>
      </div>

      {/* Subtle Bottom Metadata */}
      <div className="nuzio-landing-footer">
        <span>Audio & Text Executive Briefings • India & Global</span>
      </div>
    </div>
  );
};

export default LandingPage;
