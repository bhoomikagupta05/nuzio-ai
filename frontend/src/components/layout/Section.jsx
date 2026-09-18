import React from 'react';

/**
 * Reusable Nuzio Section
 * 
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.action]
 * @param {string} [props.className='']
 */
export const Section = ({
  title,
  subtitle,
  action,
  className = '',
  children,
  ...rest
}) => {
  return (
    <section className={`nuzio-section ${className}`} {...rest}>
      {(title || action) && (
        <div className="nuzio-section__header">
          <div>
            {title && <h2 className="nuzio-section__title">{title}</h2>}
            {subtitle && <p className="nuzio-section__subtitle">{subtitle}</p>}
          </div>
          {action && <div className="nuzio-section__action">{action}</div>}
        </div>
      )}
      <div className="nuzio-section__content">{children}</div>
    </section>
  );
};

export default Section;
