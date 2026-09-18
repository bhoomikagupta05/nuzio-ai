import React from 'react';

/**
 * Reusable Nuzio Badge
 * 
 * @param {Object} props
 * @param {'purple' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'} [props.variant='purple']
 * @param {'small' | 'medium'} [props.size='medium']
 * @param {boolean} [props.dot=false]
 * @param {React.ReactNode} [props.icon]
 * @param {string} [props.className='']
 */
export const Badge = ({
  variant = 'purple',
  size = 'medium',
  dot = false,
  icon,
  className = '',
  children,
  ...rest
}) => {
  return (
    <span
      className={`nuzio-badge nuzio-badge--${variant} nuzio-badge--${size} ${className}`}
      {...rest}
    >
      {dot && <span className="nuzio-badge__dot" aria-hidden="true" />}
      {icon && <span className="nuzio-badge__icon">{icon}</span>}
      <span className="nuzio-badge__text">{children}</span>
    </span>
  );
};

export default Badge;
