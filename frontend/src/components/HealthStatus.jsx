import React from 'react';
import { RefreshCw, CheckCircle2, AlertTriangle, Server, Database, Cpu, Radio, ShieldCheck } from 'lucide-react';
import { useHealthCheck } from '../hooks/useHealthCheck.js';
import GlassCard from './GlassCard.jsx';

export const HealthStatus = () => {
  const { data, loading, error, refetch } = useHealthCheck();

  return (
    <GlassCard glow className="health-card">
      <div className="health-card__header">
        <div className="health-card__title-group">
          <div className="icon-badge icon-badge--primary">
            <Server size={22} />
          </div>
          <div>
            <h2 className="health-card__title">Backend API Verification</h2>
            <p className="health-card__subtitle">Real-time HTTP health check endpoint: <code>/api/health</code></p>
          </div>
        </div>

        <button
          onClick={refetch}
          disabled={loading}
          className="btn-refresh"
          title="Refresh Health Status"
        >
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          <span>{loading ? 'Checking...' : 'Re-check'}</span>
        </button>
      </div>

      {loading && !data && (
        <div className="health-state health-state--loading">
          <div className="spinner"></div>
          <p>Pinging backend service...</p>
        </div>
      )}

      {error && (
        <div className="health-state health-state--error">
          <div className="icon-badge icon-badge--error">
            <AlertTriangle size={24} />
          </div>
          <div className="health-state__details">
            <h4>Connection Error</h4>
            <p>{error}</p>
            <span className="hint-text">Ensure backend is running with <code>npm run dev</code> inside <code>backend/</code>.</span>
          </div>
        </div>
      )}

      {data && (
        <div className="health-details-grid">
          <div className="health-stat-box">
            <div className="stat-label">
              <Radio size={15} />
              <span>Service Status</span>
            </div>
            <div className="stat-value stat-value--success">
              <CheckCircle2 size={18} />
              <span>{data.status?.toUpperCase() || 'ONLINE'}</span>
            </div>
            <span className="stat-sub">{data.service}</span>
          </div>

          <div className="health-stat-box">
            <div className="stat-label">
              <Database size={15} />
              <span>Database (MongoDB)</span>
            </div>
            <div className={`stat-value ${data.database?.connected ? 'stat-value--success' : 'stat-value--warning'}`}>
              <span>{data.database?.status?.toUpperCase() || 'STANDBY'}</span>
            </div>
            <span className="stat-sub">
              {data.database?.connected ? 'Active Mongoose Session' : 'Ready (Graceful fallback)'}
            </span>
          </div>

          <div className="health-stat-box">
            <div className="stat-label">
              <Cpu size={15} />
              <span>Environment & Runtime</span>
            </div>
            <div className="stat-value">
              <span>{data.environment || 'development'}</span>
            </div>
            <span className="stat-sub">Node {data.system?.nodeVersion} • {data.system?.memoryUsageMB} MB heap</span>
          </div>

          <div className="health-stat-box">
            <div className="stat-label">
              <ShieldCheck size={15} />
              <span>Uptime & Sync</span>
            </div>
            <div className="stat-value">
              <span>{data.uptimeSeconds}s</span>
            </div>
            <span className="stat-sub">Verified at {new Date(data.timestamp).toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default HealthStatus;
