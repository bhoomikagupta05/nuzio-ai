import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import NuzioLogo from '../../components/common/NuzioLogo.jsx';
import IconButton from '../../components/common/IconButton.jsx';
import Button from '../../components/common/Button.jsx';
import OnboardingProgress from './OnboardingProgress.jsx';

/**
 * Master Layout Shell for Nuzio AI Onboarding Flow
 * 
 * @param {Object} props
 * @param {number} [props.currentStep=1]
 * @param {number} [props.totalSteps=7]
 * @param {boolean} [props.showProgress=true]
 * @param {string} [props.backPath]
 * @param {Function} [props.onBack]
 * @param {string} [props.continueLabel='Continue']
 * @param {boolean} [props.continueDisabled=false]
 * @param {boolean} [props.continueLoading=false]
 * @param {Function} [props.onContinue]
 * @param {React.ReactNode} [props.customFooter]
 * @param {string} [props.className='']
 */
export const OnboardingLayout = ({
  currentStep = 1,
  totalSteps = 7,
  showProgress = true,
  backPath,
  onBack,
  continueLabel = 'Continue',
  continueDisabled = false,
  continueLoading = false,
  onContinue,
  customFooter,
  className = '',
  children,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`nuzio-onboarding-shell ${className}`}>
      {/* Ambient Purple Atmospheric Glow */}
      <div className="nuzio-shell__glow-backdrop" aria-hidden="true">
        <div className="nuzio-shell__glow-radial" />
      </div>

      <div className="nuzio-onboarding-card">
        {/* Top Header */}
        <header className="nuzio-onboarding-header">
          <div className="nuzio-onboarding-header__left">
            {(backPath || onBack) && (
              <IconButton
                ariaLabel="Go back"
                variant="ghost"
                size="small"
                onClick={handleBack}
                className="nuzio-onboarding-back-btn"
              >
                <ChevronLeft size={20} />
              </IconButton>
            )}
          </div>

          <div className="nuzio-onboarding-header__center">
            <NuzioLogo size="small" />
          </div>

          <div className="nuzio-onboarding-header__right">
            {showProgress && (
              <span className="nuzio-onboarding-step-badge">
                {currentStep}/{totalSteps}
              </span>
            )}
          </div>
        </header>

        {/* Progress Bar */}
        {showProgress && (
          <div className="nuzio-onboarding-progress-wrapper">
            <OnboardingProgress
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          </div>
        )}

        {/* Main Step Content */}
        <main className="nuzio-onboarding-body" id="onboarding-main">
          {children}
        </main>

        {/* Bottom CTA Action Bar */}
        <footer className="nuzio-onboarding-footer">
          {customFooter ? (
            customFooter
          ) : (
            onContinue && (
              <Button
                variant="primary"
                size="large"
                fullWidth
                disabled={continueDisabled}
                loading={continueLoading}
                onClick={onContinue}
                rightIcon={<ArrowRight size={18} />}
                className="nuzio-onboarding-continue-btn"
              >
                {continueLabel}
              </Button>
            )
          )}
        </footer>
      </div>
    </div>
  );
};

export default OnboardingLayout;
