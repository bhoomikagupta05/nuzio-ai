import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Radio } from 'lucide-react';

/**
 * Route protection wrapper.
 * Ensures user is authenticated before granting access to /app/* routes.
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="nuzio-auth-loading-screen">
        <div className="nuzio-shell__glow-backdrop" aria-hidden="true">
          <div className="nuzio-shell__glow-radial" />
        </div>
        <div className="nuzio-auth-loading-card">
          <div className="nuzio-auth-loading-spinner">
            <Radio size={24} className="nuzio-landing-pulse-icon" />
          </div>
          <p className="typo-body-medium" style={{ color: 'var(--color-text-secondary)', marginTop: 16 }}>
            Verifying Nuzio AI session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
