import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CheckCircle2, ArrowRight, AlertCircle, Sparkles, Sliders } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import Badge from '../../components/common/Badge.jsx';
import NuzioLogo from '../../components/common/NuzioLogo.jsx';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { onboardingData } = useOnboarding();

  const [formData, setFormData] = useState({
    name: onboardingData.userName && onboardingData.userName !== 'Aarav' ? onboardingData.userName : '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user came with onboarding preferences
  const hasOnboardingPrefs = Boolean(
    onboardingData.language ||
    onboardingData.profession ||
    (onboardingData.interests && onboardingData.interests.length > 0) ||
    onboardingData.narrator
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (generalError) {
      setGeneralError(null);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError(null);

    // Bundle onboarding preferences with registration
    const registrationPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    if (onboardingData.language) {
      registrationPayload.language = onboardingData.language;
    }
    if (onboardingData.profession) {
      registrationPayload.profession = onboardingData.profession;
    }
    if (onboardingData.interests && onboardingData.interests.length > 0) {
      registrationPayload.interests = onboardingData.interests;
    }
    if (onboardingData.narrator) {
      registrationPayload.narrator = {
        name: onboardingData.narrator,
        voiceId: onboardingData.narrator.toLowerCase(),
      };
    }
    if (onboardingData.briefTime) {
      registrationPayload.briefTime = onboardingData.briefTime;
    }
    if (typeof onboardingData.notificationsEnabled === 'boolean') {
      registrationPayload.notificationsEnabled = onboardingData.notificationsEnabled;
    }

    try {
      await register(registrationPayload);
      navigate('/app/home', { replace: true });
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const errorsMap = {};
        err.errors.forEach((item) => {
          if (item.field) errorsMap[item.field] = item.message;
        });
        setFieldErrors(errorsMap);
      }
      setGeneralError(err.message || 'Failed to create account. Please check your information.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="nuzio-auth-screen">
      {/* Subtle Atmospheric Purple Glow */}
      <div className="nuzio-shell__glow-backdrop" aria-hidden="true">
        <div className="nuzio-shell__glow-radial" />
      </div>

      <div className="nuzio-auth-container">
        {/* Brand Header */}
        <div className="nuzio-auth-brand-header">
          <NuzioLogo size="large" onClick={() => navigate('/')} />
        </div>

        {/* Main Card */}
        <Card glow padding="large" className="nuzio-auth-card">
          <div className="nuzio-auth-header">
            <h1 className="nuzio-auth-title typo-title-large">Create your account.</h1>
            <p className="nuzio-auth-subtitle typo-body-medium">
              Your personalized executive briefing will be ready every morning.
            </p>

            {hasOnboardingPrefs && (
              <div className="nuzio-auth-linked-prefs">
                <Badge variant="purple" size="small" dot>
                  ✦ Personalization linked
                </Badge>
              </div>
            )}
          </div>

          {/* General Error Notification */}
          {generalError && (
            <div className="nuzio-auth-error-banner" role="alert">
              <AlertCircle size={18} className="nuzio-auth-error-icon" />
              <span>{generalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="nuzio-auth-form" noValidate>
            <Input
              id="register-name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={handleChange}
              error={fieldErrors.name}
              leftIcon={<User size={18} />}
              required
              autoComplete="name"
              autoFocus
            />

            <Input
              id="register-email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              leftIcon={<Mail size={18} />}
              required
              autoComplete="email"
            />

            <Input
              id="register-password"
              name="password"
              type="password"
              label="Password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              error={fieldErrors.password}
              helperText={!fieldErrors.password ? 'Must be at least 6 characters' : undefined}
              leftIcon={<Lock size={18} />}
              required
              autoComplete="new-password"
            />

            <Input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={fieldErrors.confirmPassword}
              leftIcon={<Lock size={18} />}
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isSubmitting}
              rightIcon={!isSubmitting && <ArrowRight size={18} />}
              className="nuzio-auth-submit-btn"
            >
              Create Account & Start Briefing
            </Button>
          </form>

          <div className="nuzio-auth-footer-prompt">
            <span className="typo-body-small">Already have an account?</span>{' '}
            <Link to="/login" className="nuzio-auth-link">
              Sign in
            </Link>
          </div>
        </Card>

        {/* Bottom Subtext */}
        <div className="nuzio-auth-bottom-info">
          <span>By continuing, you agree to Nuzio AI Terms & Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
