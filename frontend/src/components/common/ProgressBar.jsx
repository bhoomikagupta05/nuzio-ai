import React from 'react';

/**
 * Reusable Nuzio ProgressBar
 * 
 * @param {Object} props
 * @param {number} [props.value=0] - 0 to 100
 * @param {boolean} [props.indeterminate=false]
 * @param {'purple' | 'success'} [props.variant='purple']
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {boolean} [props.showValue=false]
 * @param {string} [props.label]
 * @param {string} [props.className='']
 */
export const ProgressBar = ({
  value = 0,
  indeterminate = false,
  variant = 'purple',
  size = 'medium',
  showValue = false,
  label,
  className = '',
  ...rest
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`nuzio-progress-container ${className}`} {...rest}>
      {(label || showValue) && (
        <div className="nuzio-progress-header">
          {label && <span className="nuzio-progress-label">{label}</span>}
          {showValue && !indeterminate && (
            <span className="nuzio-progress-value">{clampedValue}%</span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
        className={`nuzio-progress-track nuzio-progress-track--${size}`}
      >
        <div
          className={`nuzio-progress-fill nuzio-progress-fill--${variant} ${
            indeterminate ? 'nuzio-progress-fill--indeterminate' : ''
          }`}
          style={indeterminate ? undefined : { width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
