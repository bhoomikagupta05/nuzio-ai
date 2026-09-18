import React from 'react';

export const GlassCard = ({ children, className = '', glow = false, onClick, style = {} }) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`glass-card ${glow ? 'glass-card--glow' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
