import React from 'react';
import Navbar from '../components/Navbar.jsx';

export const MainLayout = ({ children }) => {
  return (
    <div className="app-shell">
      {/* Background ambient purple glows */}
      <div className="glow-orb glow-orb--top-left" />
      <div className="glow-orb glow-orb--top-right" />
      <div className="glow-orb glow-orb--bottom" />

      <Navbar />

      <main className="main-content">
        <div className="app-container">
          {children}
        </div>
      </main>

      <footer className="footer-container">
        <div className="footer-inner">
          <p>© 2026 Nuzio AI. Personalized AI-powered daily news briefings.</p>
          <div className="footer-links">
            <span>Phase 1 Architecture Complete</span>
            <span>•</span>
            <span>React + Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
