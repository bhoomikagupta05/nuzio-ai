import React from 'react';

/**
 * Reusable Nuzio PageHeader
 * 
 * @param {Object} props
 * @param {string} props.title
 * @param {string} [props.subtitle]
 * @param {React.ReactNode} [props.badge]
 * @param {React.ReactNode} [props.actions]
 * @param {React.ReactNode} [props.backAction]
 * @param {string} [props.className='']
 */
export const PageHeader = ({
  title,
  subtitle,
  badge,
  actions,
  backAction,
  className = '',
  children,
}) => {
  return (
    <div className={`nuzio-page-header ${className}`}>
      <div className="nuzio-page-header__left">
        {backAction && <div className="nuzio-page-header__back">{backAction}</div>}
        <div>
          <div className="nuzio-page-header__title-row">
            <h1 className="nuzio-page-header__title">{title}</h1>
            {badge && <div className="nuzio-page-header__badge">{badge}</div>}
          </div>
          {subtitle && <p className="nuzio-page-header__subtitle">{subtitle}</p>}
        </div>
      </div>

      {actions && <div className="nuzio-page-header__actions">{actions}</div>}
      {children}
    </div>
  );
};

export default PageHeader;
