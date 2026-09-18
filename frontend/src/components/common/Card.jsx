import React from 'react';

/**
 * Reusable Nuzio Card
 * 
 * @param {Object} props
 * @param {'default' | 'elevated' | 'highlighted'} [props.variant='default']
 * @param {boolean} [props.glow=false]
 * @param {boolean} [props.interactive=false]
 * @param {boolean} [props.selected=false]
 * @param {'none' | 'small' | 'medium' | 'large'} [props.padding='medium']
 * @param {string} [props.className='']
 * @param {Object} [props.style={}]
 * @param {Function} [props.onClick]
 * @param {React.ElementType} [props.as='div']
 */
export const Card = ({
  variant = 'default',
  glow = false,
  interactive = false,
  selected = false,
  padding = 'medium',
  className = '',
  style = {},
  onClick,
  as: Component = 'div',
  children,
  ...rest
}) => {
  const isInteractive = interactive || Boolean(onClick);

  return (
    <Component
      onClick={onClick}
      style={style}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e);
              }
            }
          : undefined
      }
      className={`nuzio-card nuzio-card--${variant} nuzio-card--pad-${padding} ${
        glow ? 'nuzio-card--glow' : ''
      } ${isInteractive ? 'nuzio-card--interactive' : ''} ${
        selected ? 'nuzio-card--selected' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;
