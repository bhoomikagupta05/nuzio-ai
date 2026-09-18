import React from 'react';

/**
 * Reusable Nuzio Avatar
 * 
 * @param {Object} props
 * @param {string} [props.src]
 * @param {string} [props.name]
 * @param {React.ReactNode} [props.icon]
 * @param {'xs' | 'small' | 'medium' | 'large' | 'xl'} [props.size='medium']
 * @param {'online' | 'offline' | 'ai' | 'none'} [props.status='none']
 * @param {string} [props.className='']
 */
export const Avatar = ({
  src,
  name,
  icon,
  size = 'medium',
  status = 'none',
  className = '',
  ...rest
}) => {
  const getInitials = (text) => {
    if (!text) return 'N';
    const parts = text.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  return (
    <div className={`nuzio-avatar nuzio-avatar--${size} ${className}`} {...rest}>
      <div className="nuzio-avatar__inner">
        {src ? (
          <img src={src} alt={name || 'Avatar'} className="nuzio-avatar__img" />
        ) : icon ? (
          <span className="nuzio-avatar__icon">{icon}</span>
        ) : (
          <span className="nuzio-avatar__initials">{getInitials(name)}</span>
        )}
      </div>

      {status !== 'none' && (
        <span
          className={`nuzio-avatar__badge nuzio-avatar__badge--${status}`}
          title={`Status: ${status}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

export default Avatar;
