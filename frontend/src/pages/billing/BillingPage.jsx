import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, Zap, ArrowRight, Star, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AppLayout from '../../layouts/AppLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import { SUBSCRIPTION_PLANS } from '../../data/mockData.js';

export const BillingPage = () => {
  const { user, updateProfile } = useAuth();
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [isUpgrading, setIsUpgrading] = useState(false);

  const currentPlan = user?.plan || 'free';

  const handleUpgrade = async (planId) => {
    if (planId === currentPlan) return;

    setIsUpgrading(true);
    try {
      // Simulate tier upgrade service
      await new Promise((resolve) => setTimeout(resolve, 800));
      await updateProfile({ plan: planId });
      alert('Congratulations! Your account has been upgraded to Pro Executive Briefing.');
    } catch (err) {
      alert('Subscription update failed. Please try again.');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <AppLayout activeNavId="billing" topBarTitle="Subscription Plans">
      <div className="nuzio-billing-container">
        {/* Header Hero */}
        <section className="billing-header-section">
          <div className="billing-badge-pill">
            <Sparkles size={14} />
            <span>Executive Intelligence Tiers</span>
          </div>

          <h1 className="nuzio-page-title">
            Upgrade your daily briefing.
          </h1>
          <p className="nuzio-page-subtitle">
            Unlock unlimited AI news synthesis, all 4 neural voice narrators, minute-level schedules, and offline listening.
          </p>

          {/* Monthly / Annual Segmented Toggle */}
          <div className="billing-cycle-toggle-wrapper">
            <div className="billing-cycle-toggle">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`billing-cycle-btn ${billingCycle === 'monthly' ? 'billing-cycle-btn--active' : ''}`}
              >
                Monthly billing
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`billing-cycle-btn ${billingCycle === 'annual' ? 'billing-cycle-btn--active' : ''}`}
              >
                <span>Annual billing</span>
                <span className="discount-tag">Save 20%</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="billing-plans-grid">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;
            const period = billingCycle === 'annual' ? plan.periodAnnual : plan.periodMonthly;

            return (
              <Card
                key={plan.id}
                glow={plan.isPopular}
                padding="large"
                className={`nuzio-plan-card ${plan.isPopular ? 'nuzio-plan-card--pro' : ''} ${
                  isCurrent ? 'nuzio-plan-card--current' : ''
                }`}
              >
                {plan.badge && (
                  <div className="plan-popular-badge">
                    <Star size={12} />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="plan-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc typo-body-small">{plan.description}</p>
                </div>

                <div className="plan-price-block">
                  <div className="plan-price-row">
                    <span className="plan-price-val">{price}</span>
                    <span className="plan-period">/ {period}</span>
                  </div>
                  {billingCycle === 'annual' && plan.id === 'pro' && (
                    <span className="plan-billed-yearly">Billed as $79.99 annually</span>
                  )}
                </div>

                <div className="plan-features-list">
                  <span className="ds-subsection-title">Included Features</span>
                  <ul className="features-checklist">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`feature-item ${feature.included ? 'feature-item--included' : 'feature-item--excluded'}`}
                      >
                        <div className="feature-check-circle">
                          {feature.included ? <Check size={13} /> : <span className="dash-icon">—</span>}
                        </div>
                        <span className="feature-text typo-body-small">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant={plan.isPopular ? 'primary' : 'secondary'}
                  size="large"
                  fullWidth
                  disabled={isCurrent}
                  loading={isUpgrading && plan.id === 'pro'}
                  onClick={() => handleUpgrade(plan.id)}
                  className="plan-cta-btn"
                >
                  {isCurrent ? 'Current Plan' : plan.ctaText}
                </Button>
              </Card>
            );
          })}
        </section>

        {/* Enterprise & Security FAQ Note */}
        <section className="billing-trust-note">
          <div className="trust-note-item">
            <ShieldCheck size={20} className="trust-icon" />
            <div>
              <h4 className="trust-title">Enterprise Security Standard</h4>
              <p className="trust-text typo-body-small">
                End-to-end encrypted briefing delivery, zero telemetry sharing, and SOC2-compliant model execution.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default BillingPage;
