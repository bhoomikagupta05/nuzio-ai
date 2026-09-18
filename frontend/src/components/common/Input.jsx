import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

/**
 * Reusable Nuzio Input
 */
export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = 'text',
      size = 'medium',
      fullWidth = true,
      disabled = false,
      required = false,
      id,
      className = '',
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);
    const isPassword = type === 'password';
    const computedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div
        className={`nuzio-input-group ${fullWidth ? 'nuzio-input-group--full' : ''} ${
          error ? 'nuzio-input-group--error' : ''
        } ${disabled ? 'nuzio-input-group--disabled' : ''} ${className}`}
      >
        {label && (
          <label htmlFor={inputId} className="nuzio-input-label">
            {label}
            {required && <span className="nuzio-input-label__required">*</span>}
          </label>
        )}

        <div className={`nuzio-input-wrapper nuzio-input-wrapper--${size}`}>
          {leftIcon && <span className="nuzio-input-icon nuzio-input-icon--left">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            type={computedType}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? `${inputId}-desc` : undefined}
            className="nuzio-input"
            {...rest}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="nuzio-input-icon nuzio-input-icon--right nuzio-input-toggle-pwd"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : rightIcon ? (
            <span className="nuzio-input-icon nuzio-input-icon--right">{rightIcon}</span>
          ) : null}
        </div>

        {(error || helperText) && (
          <span
            id={`${inputId}-desc`}
            className={`nuzio-input-helper ${error ? 'nuzio-input-helper--error' : ''}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
