import React from 'react';

/**
 * Reusable Nuzio IconButton
 * 
 * @param {Object} props
 * @param {string} props.ariaLabel - Required accessible label
 * @param {'default' | 'filled' | 'ghost' | 'primary'} [props.variant='ghost']
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {boolean} [props.active=false]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.tooltip]
 * @param {Function} [props.onClick]
 * @param {string} [props.className='']
 * @param {React.ReactNode} props.children
 */
export const IconButton = ({
  ariaLabel,
  variant = 'ghost',
  size = 'medium',
  active = false,
  disabled = false,
  tooltip,
  onClick,
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel || tooltip}
      title={tooltip || ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`nuzio-icon-btn nuzio-icon-btn--${variant} nuzio-icon-btn--${size} ${
        active ? 'nuzio-icon-btn--active' : ''
      } ${className}`}
      {...rest}
    >
      <span className="nuzio-icon-btn__icon">{children}</span>
    </button>
  );
};

export default IconButton;
