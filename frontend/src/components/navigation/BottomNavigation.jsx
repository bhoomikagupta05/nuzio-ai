import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass, Settings, CreditCard } from 'lucide-react';
import { DEFAULT_NAV_ITEMS } from './Sidebar.jsx';

export const BottomNavigation = ({
  items = DEFAULT_NAV_ITEMS,
  activeId = 'home',
  onSelect,
  className = '',
}) => {
  const navigate = useNavigate();

  const handleNavClick = (item) => {
    if (onSelect) {
      onSelect(item.id);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <nav
      className={`nuzio-bottom-nav ${className}`}
      aria-label="Mobile Bottom Navigation"
    >
      <div className="nuzio-bottom-nav__inner">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              aria-current={isActive ? 'page' : undefined}
              className={`nuzio-bottom-nav__btn ${
                isActive ? 'nuzio-bottom-nav__btn--active' : ''
              }`}
            >
              <div className="nuzio-bottom-nav__icon-wrapper">
                <Icon size={20} />
                {isActive && <span className="nuzio-bottom-nav__indicator" />}
              </div>
              <span className="nuzio-bottom-nav__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
