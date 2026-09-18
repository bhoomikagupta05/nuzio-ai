import React from 'react';

/**
 * Reusable Nuzio Container
 * 
 * @param {Object} props
 * @param {'max' | 'narrow' | 'reading' | 'full'} [props.size='max']
 * @param {string} [props.className='']
 * @param {React.CSSProperties} [props.style]
 * @param {React.ElementType} [props.as='div']
 */
export const Container = ({
  size = 'max',
  className = '',
  style = {},
  as: Component = 'div',
  children,
  ...rest
}) => {
  return (
    <Component
      style={style}
      className={`nuzio-container nuzio-container--${size} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Container;
