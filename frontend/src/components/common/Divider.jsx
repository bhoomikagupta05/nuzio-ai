import React from 'react';

/**
 * Reusable Nuzio Divider
 * 
 * @param {Object} props
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal']
 * @param {string} [props.label]
 * @param {string} [props.className='']
 */
export const Divider = ({
  orientation = 'horizontal',
  label,
  className = '',
  ...rest
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={`nuzio-divider-vertical ${className}`}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={`nuzio-divider-with-label ${className}`}
        {...rest}
      >
        <span className="nuzio-divider-line" />
        <span className="nuzio-divider-label">{label}</span>
        <span className="nuzio-divider-line" />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      className={`nuzio-divider ${className}`}
      {...rest}
    />
  );
};

export default Divider;
