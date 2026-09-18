import React from 'react';
import { Radio, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '../utils/constants.js';

export const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-icon" size={20} />
          </div>
          <div className="brand-text-group">
            <span className="brand-title">{APP_NAME}</span>
            <span className="brand-badge">Architecture v1.0</span>
          </div>
        </div>

        <div className="nav-actions">
          <div className="status-pill status-pill--live">
            <span className="pulse-dot"></span>
            <span>MERN Stack Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
