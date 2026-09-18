import React from 'react';

/**
 * Reusable Nuzio Stack (Flex layout)
 * 
 * @param {Object} props
 * @param {'row' | 'column'} [props.direction='column']
 * @param {1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12} [props.gap=4]
 * @param {'start' | 'center' | 'end' | 'stretch'} [props.align='stretch']
 * @param {'start' | 'center' | 'end' | 'between' | 'around'} [props.justify='start']
 * @param {boolean} [props.wrap=false]
 * @param {string} [props.className='']
 * @param {React.ElementType} [props.as='div']
 */
export const Stack = ({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  as: Component = 'div',
  children,
  style = {},
  ...rest
}) => {
  return (
    <Component
      style={style}
      className={`nuzio-stack nuzio-stack--${direction} nuzio-stack--gap-${gap} nuzio-stack--align-${align} nuzio-stack--justify-${justify} ${
        wrap ? 'nuzio-stack--wrap' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Stack;
