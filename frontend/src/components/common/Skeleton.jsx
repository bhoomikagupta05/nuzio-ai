import React from 'react';

/**
 * Reusable Nuzio Skeleton Shimmer Placeholder
 * 
 * @param {Object} props
 * @param {'text' | 'circular' | 'rectangular' | 'card'} [props.variant='text']
 * @param {string | number} [props.width]
 * @param {string | number} [props.height]
 * @param {string | number} [props.radius]
 * @param {string} [props.className='']
 * @param {number} [props.lines=1]
 */
export const Skeleton = ({
  variant = 'text',
  width,
  height,
  radius,
  className = '',
  lines = 1,
  style = {},
  ...rest
}) => {
  const customStyle = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(radius ? { borderRadius: radius } : {}),
    ...style,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`nuzio-skeleton-group ${className}`} {...rest}>
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className="nuzio-skeleton nuzio-skeleton--text"
            style={{
              ...customStyle,
              width: idx === lines - 1 && lines > 1 ? '70%' : customStyle.width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`nuzio-skeleton nuzio-skeleton--${variant} ${className}`}
      style={customStyle}
      aria-hidden="true"
      {...rest}
    />
  );
};

export default Skeleton;
