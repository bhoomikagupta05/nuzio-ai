import React from 'react';

/**
 * Reusable Nuzio Toggle Switch
 * 
 * @param {Object} props
 * @param {boolean} props.checked
 * @param {Function} props.onChange
 * @param {string} [props.label]
 * @param {string} [props.description]
 * @param {boolean} [props.disabled=false]
 * @param {'small' | 'medium'} [props.size='medium']
 * @param {string} [props.id]
 * @param {string} [props.className='']
 */
export const Toggle = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  size = 'medium',
  id,
  className = '',
  ...rest
}) => {
  const switchId = id || (label ? `toggle-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div
      className={`nuzio-toggle-container ${disabled ? 'nuzio-toggle-container--disabled' : ''} ${className}`}
    >
      {(label || description) && (
        <div className="nuzio-toggle-text">
          {label && (
            <label htmlFor={switchId} className="nuzio-toggle-label">
              {label}
            </label>
          )}
          {description && <p className="nuzio-toggle-desc">{description}</p>}
        </div>
      )}

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label || 'Toggle switch'}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={`nuzio-toggle-track nuzio-toggle-track--${size} ${
          checked ? 'nuzio-toggle-track--checked' : ''
        }`}
        {...rest}
      >
        <span className="nuzio-toggle-thumb" aria-hidden="true" />
      </button>
    </div>
  );
};

export default Toggle;
