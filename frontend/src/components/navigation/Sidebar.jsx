import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Home,
  Compass,
  Bookmark,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Radio,
} from 'lucide-react';
import Avatar from '../common/Avatar.jsx';
import Badge from '../common/Badge.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { APP_NAME } from '../../utils/constants.js';

export const DEFAULT_NAV_ITEMS = [
  { id: 'home', label: 'Daily Brief', icon: Home, badge: 'Live', path: '/app/home' },
  { id: 'discover', label: 'Discover', icon: Compass, path: '/app/discover' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/app/settings' },
  { id: 'billing', label: 'Pro Plan', icon: CreditCard, badge: 'PRO', path: '/app/billing' },
];

export const Sidebar = ({
  items = DEFAULT_NAV_ITEMS,
  activeId = 'home',
  onSelect,
  collapsed = false,
  onToggleCollapse,
  className = '',
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNavClick = (item) => {
    if (onSelect) {
      onSelect(item.id);
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  const userName = user?.name || 'Alex Morgan';
  const userPlan = user?.plan === 'pro' ? 'Pro Member' : 'Free Tier';

  return (
    <aside
      className={`nuzio-sidebar ${collapsed ? 'nuzio-sidebar--collapsed' : ''} ${className}`}
      aria-label="Main Navigation Sidebar"
    >
      {/* Brand Header */}
      <div className="nuzio-sidebar__header">
        <div
          className="nuzio-sidebar__brand"
          onClick={() => navigate('/app/home')}
          role="button"
          tabIndex={0}
        >
          <div className="nuzio-sidebar__logo-icon">
            <Sparkles size={20} />
          </div>
          {!collapsed && (
            <div className="nuzio-sidebar__brand-text">
              <span className="nuzio-sidebar__brand-title">{APP_NAME}</span>
              <span className="nuzio-sidebar__brand-tag">AI News</span>
            </div>
          )}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="nuzio-sidebar__collapse-btn"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Nav List */}
      <nav className="nuzio-sidebar__nav">
        <ul className="nuzio-sidebar__menu">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;

            return (
              <li key={item.id} className="nuzio-sidebar__item">
                <button
                  type="button"
                  onClick={() => handleNavClick(item)}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.label : undefined}
                  className={`nuzio-sidebar__link ${
                    isActive ? 'nuzio-sidebar__link--active' : ''
                  }`}
                >
                  <span className="nuzio-sidebar__link-icon">
                    <Icon size={20} />
                  </span>

                  {!collapsed && (
                    <>
                      <span className="nuzio-sidebar__link-label">{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant={isActive ? 'purple' : 'muted'}
                          size="small"
                          className="nuzio-sidebar__link-badge"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer User Info */}
      <div
        className="nuzio-sidebar__footer"
        onClick={() => navigate('/app/settings')}
        role="button"
        tabIndex={0}
      >
        <div className="nuzio-sidebar__user">
          <Avatar name={userName} size={collapsed ? 'small' : 'medium'} status={user?.plan === 'pro' ? 'ai' : 'online'} />
          {!collapsed && (
            <div className="nuzio-sidebar__user-info">
              <span className="nuzio-sidebar__user-name">{userName}</span>
              <span className="nuzio-sidebar__user-tier">{userPlan}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
