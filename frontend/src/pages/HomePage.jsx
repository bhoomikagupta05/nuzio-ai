import React from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  FolderTree,
  Palette,
  Terminal,
  Smartphone,
  Monitor,
  Tablet,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import HealthStatus from '../components/HealthStatus.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { APP_NAME, APP_TAGLINE, SUPPORTED_VIEWPORTS } from '../utils/constants.js';

export const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={15} />
          <span>Foundation Architecture Active</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-gradient-text">{APP_NAME}</span>
        </h1>
        <p className="hero-tagline">{APP_TAGLINE}</p>

        <p className="hero-description">
          Production-grade MERN architecture configured with Vite, React 18, React Router,
          Express, MongoDB Mongoose schema foundations, and a centralized purple-glow dark design system.
        </p>
      </section>

      {/* Live Communication Check */}
      <section className="section-block">
        <HealthStatus />
      </section>

      {/* Architecture Verification Grid */}
      <section className="section-block">
        <div className="section-header">
          <div>
            <h2 className="section-title">Architecture & System Foundation</h2>
            <p className="section-subtitle">Verified structural components and readiness checklist</p>
          </div>
        </div>

        <div className="features-grid">
          <GlassCard className="feature-card">
            <div className="feature-card__icon feature-card__icon--purple">
              <FolderTree size={20} />
            </div>
            <h3 className="feature-card__title">Standardized Folder Hierarchy</h3>
            <p className="feature-card__text">
              Modular <code>frontend/src</code> and <code>backend/src</code> directories with dedicated folders for components, layouts, pages, routes, services, hooks, context, theme, controllers, middleware, and models.
            </p>
            <div className="pill-group">
              <span className="tech-pill">frontend/src/</span>
              <span className="tech-pill">backend/src/</span>
            </div>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-card__icon feature-card__icon--cyan">
              <Palette size={20} />
            </div>
            <h3 className="feature-card__title">Centralized Design Tokens</h3>
            <p className="feature-card__text">
              Approximation palette with <code>#08090B</code> background, <code>#15151B</code> card surfaces, <code>#7657FF</code> violet accent, and atmospheric purple glow effects.
            </p>
            <div className="color-swatches">
              <span className="swatch" style={{ background: '#08090B' }} title="Background #08090B" />
              <span className="swatch" style={{ background: '#111217' }} title="Surface #111217" />
              <span className="swatch" style={{ background: '#15151B' }} title="Card #15151B" />
              <span className="swatch" style={{ background: '#7657FF' }} title="Primary #7657FF" />
              <span className="swatch" style={{ background: '#3DDC97' }} title="Success #3DDC97" />
            </div>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-card__icon feature-card__icon--mint">
              <Cpu size={20} />
            </div>
            <h3 className="feature-card__title">Client-Server Communication</h3>
            <p className="feature-card__text">
              Configured Axios instance with response/error normalization, CORS middleware on Express, and Vite dev server proxying <code>/api</code> calls.
            </p>
            <div className="pill-group">
              <span className="tech-pill">Axios 1.7</span>
              <span className="tech-pill">Express 4.21</span>
              <span className="tech-pill">CORS Enabled</span>
            </div>
          </GlassCard>

          <GlassCard className="feature-card">
            <div className="feature-card__icon feature-card__icon--purple">
              <Zap size={20} />
            </div>
            <h3 className="feature-card__title">Adaptive Responsive Layouts</h3>
            <p className="feature-card__text">
              Enforces mobile single-column touch controls, tablet constrained grids, and desktop multi-column container constraints across all 12 target breakpoints.
            </p>
            <div className="device-icons">
              <Smartphone size={16} title="Mobile (320px - 430px)" />
              <Tablet size={16} title="Tablet (768px - 834px)" />
              <Monitor size={16} title="Desktop (1024px - 1920px)" />
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Target Viewports Grid */}
      <section className="section-block">
        <GlassCard className="viewports-card">
          <div className="viewports-header">
            <div>
              <h3 className="viewports-title">Supported Target Viewports</h3>
              <p className="viewports-subtitle">Configured breakpoints matching the design specifications</p>
            </div>
          </div>
          <div className="viewports-grid">
            {SUPPORTED_VIEWPORTS.map((vp) => (
              <div key={vp.width} className="viewport-chip">
                <span className="viewport-chip__dot"></span>
                <span>{vp.label}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
};

export default HomePage;
