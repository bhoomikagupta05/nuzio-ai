import React from 'react';

/**
 * Reusable Nuzio Button
 * 
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.leftIcon]
 * @param {React.ReactNode} [props.rightIcon]
 * @param {string} [props.className='']
 * @param {Function} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {string} [props.ariaLabel]
 */
export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  children,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-label={ariaLabel}
      className={`nuzio-btn nuzio-btn--${variant} nuzio-btn--${size} ${
        fullWidth ? 'nuzio-btn--full' : ''
      } ${loading ? 'nuzio-btn--loading' : ''} ${className}`}
      {...rest}
    >
      {loading && <span className="nuzio-btn__spinner" aria-hidden="true" />}
      {!loading && leftIcon && <span className="nuzio-btn__icon nuzio-btn__icon--left">{leftIcon}</span>}
      <span className="nuzio-btn__text">{children}</span>
      {!loading && rightIcon && <span className="nuzio-btn__icon nuzio-btn__icon--right">{rightIcon}</span>}
    </button>
  );
};

export default Button;
