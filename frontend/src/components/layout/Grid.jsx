import React from 'react';

/**
 * Reusable Nuzio Responsive Grid
 * 
 * @param {Object} props
 * @param {1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'} [props.cols='auto-fit']
 * @param {number} [props.minWidth=260] - Min width in px for auto-fit/auto-fill
 * @param {1 | 2 | 3 | 4 | 5 | 6 | 8} [props.gap=4]
 * @param {string} [props.className='']
 * @param {React.ElementType} [props.as='div']
 */
export const Grid = ({
  cols = 'auto-fit',
  minWidth = 260,
  gap = 4,
  className = '',
  as: Component = 'div',
  style = {},
  children,
  ...rest
}) => {
  const isAuto = cols === 'auto-fit' || cols === 'auto-fill';
  const gridStyle = {
    ...style,
    gridTemplateColumns: isAuto
      ? `repeat(${cols}, minmax(min(100%, ${minWidth}px), 1fr))`
      : undefined,
  };

  return (
    <Component
      style={gridStyle}
      className={`nuzio-grid ${!isAuto ? `nuzio-grid--cols-${cols}` : ''} nuzio-grid--gap-${gap} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Grid;
