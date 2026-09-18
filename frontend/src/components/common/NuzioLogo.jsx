import React from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Reusable Nuzio AI Logo
 * 
 * @param {Object} props
 * @param {'small' | 'medium' | 'large' | 'hero'} [props.size='medium']
 * @param {boolean} [props.showTagline=false]
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 */
export const NuzioLogo = ({
  size = 'medium',
  showTagline = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`nuzio-logo nuzio-logo--${size} ${onClick ? 'nuzio-logo--clickable' : ''} ${className}`}
    >
      <div className="nuzio-logo__icon-box">
        <Sparkles size={size === 'hero' ? 28 : size === 'large' ? 22 : size === 'small' ? 14 : 18} />
      </div>

      <div className="nuzio-logo__text-group">
        <div className="nuzio-logo__wordmark">
          <span className="nuzio-logo__brand">Nuzio</span>
          <span className="nuzio-logo__ai">AI</span>
        </div>
        {showTagline && (
          <span className="nuzio-logo__tagline">News on go</span>
        )}
      </div>
    </div>
  );
};

export default NuzioLogo;
