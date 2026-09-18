import React from 'react';
import { X, Check } from 'lucide-react';

/**
 * Reusable Nuzio Chip / Tag
 * 
 * @param {Object} props
 * @param {'default' | 'selected' | 'success'} [props.variant='default']
 * @param {'small' | 'medium' | 'large'} [props.size='medium']
 * @param {boolean} [props.selected=false]
 * @param {boolean} [props.showCheck=false]
 * @param {React.ReactNode} [props.icon]
 * @param {string | number} [props.count]
 * @param {Function} [props.onClick]
 * @param {Function} [props.onRemove]
 * @param {boolean} [props.disabled=false]
 * @param {string} [props.className='']
 */
export const Chip = ({
  variant = 'default',
  size = 'medium',
  selected = false,
  showCheck = false,
  icon,
  count,
  onClick,
  onRemove,
  disabled = false,
  className = '',
  children,
  ...rest
}) => {
  const isSelected = selected || variant === 'selected';
  const isInteractive = Boolean(onClick) && !disabled;
  const computedVariant = isSelected ? 'selected' : variant;

  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <span
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={handleKeyDown}
      aria-pressed={isInteractive ? isSelected : undefined}
      className={`nuzio-chip nuzio-chip--${computedVariant} nuzio-chip--${size} ${
        isInteractive ? 'nuzio-chip--clickable' : ''
      } ${disabled ? 'nuzio-chip--disabled' : ''} ${className}`}
      {...rest}
    >
      {showCheck && isSelected && (
        <Check size={size === 'small' ? 12 : 14} className="nuzio-chip__check" />
      )}
      {!showCheck && icon && <span className="nuzio-chip__icon">{icon}</span>}
      <span className="nuzio-chip__label">{children}</span>
      {count !== undefined && <span className="nuzio-chip__count">{count}</span>}
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(e);
          }}
          className="nuzio-chip__remove-btn"
        >
          <X size={13} />
        </button>
      )}
    </span>
  );
};

export default Chip;
