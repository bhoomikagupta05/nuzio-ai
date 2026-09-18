import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Input from '../../components/common/Input.jsx';
import NuzioLogo from '../../components/common/NuzioLogo.jsx';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Where to redirect after login (default to /app/home)
  const fromPath = location.state?.from?.pathname || '/app/home';

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
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      await login({
        email: formData.email.trim(),
        password: formData.password,
      });
      navigate(fromPath, { replace: true });
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        const errorsMap = {};
        err.errors.forEach((item) => {
          if (item.field) errorsMap[item.field] = item.message;
        });
        setFieldErrors(errorsMap);
      }
      setGeneralError(err.message || 'Invalid email or password. Please try again.');
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
            <h1 className="nuzio-auth-title typo-title-large">Welcome back.</h1>
            <p className="nuzio-auth-subtitle typo-body-medium">
              Sign in to continue to your daily brief.
            </p>
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
              id="login-email"
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
              autoFocus
            />

            <div className="nuzio-auth-password-group">
              <Input
                id="login-password"
                name="password"
                type="password"
                label="Password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                leftIcon={<Lock size={18} />}
                required
                autoComplete="current-password"
              />

              <div className="nuzio-auth-forgot-row">
                <button
                  type="button"
                  onClick={() => alert('Password reset will be available in an upcoming update.')}
                  className="nuzio-auth-forgot-link"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              loading={isSubmitting}
              rightIcon={!isSubmitting && <ArrowRight size={18} />}
              className="nuzio-auth-submit-btn"
            >
              Sign In
            </Button>
          </form>

          <div className="nuzio-auth-footer-prompt">
            <span className="typo-body-small">Don't have an account?</span>{' '}
            <Link to="/register" className="nuzio-auth-link">
              Create account
            </Link>
          </div>
        </Card>

        {/* Bottom Subtext */}
        <div className="nuzio-auth-bottom-info">
          <span>Protected with AES-256 & bcrypt security</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
