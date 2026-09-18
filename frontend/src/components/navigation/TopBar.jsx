import React from 'react';
import { Sparkles, Bell, Search, Menu } from 'lucide-react';
import IconButton from '../common/IconButton.jsx';
import Avatar from '../common/Avatar.jsx';
import SearchInput from '../common/SearchInput.jsx';
import { APP_NAME } from '../../utils/constants.js';

/**
 * Reusable Nuzio TopBar
 * 
 * @param {Object} props
 * @param {Function} [props.onToggleSidebar]
 * @param {boolean} [props.showSidebarToggle=false]
 * @param {string} [props.title]
 * @param {boolean} [props.showSearch=true]
 */
export const TopBar = ({
  onToggleSidebar,
  showSidebarToggle = false,
  title,
  showSearch = true,
  className = '',
}) => {
  return (
    <header className={`nuzio-topbar ${className}`}>
      <div className="nuzio-topbar__inner">
        <div className="nuzio-topbar__left">
          {showSidebarToggle && (
            <IconButton
              ariaLabel="Toggle Navigation Sidebar"
              variant="ghost"
              size="medium"
              onClick={onToggleSidebar}
              className="nuzio-topbar__menu-btn"
            >
              <Menu size={20} />
            </IconButton>
          )}

          <div className="nuzio-topbar__brand">
            <div className="nuzio-topbar__logo-icon">
              <Sparkles size={18} />
            </div>
            <span className="nuzio-topbar__brand-title">{title || APP_NAME}</span>
          </div>
        </div>

        {showSearch && (
          <div className="nuzio-topbar__search">
            <SearchInput
              size="small"
              placeholder="Search news & topics..."
              shortcutKey="⌘K"
            />
          </div>
        )}

        <div className="nuzio-topbar__right">
          <IconButton
            ariaLabel="View notifications"
            variant="ghost"
            size="medium"
            tooltip="Notifications"
            className="nuzio-topbar__notif-btn"
          >
            <Bell size={19} />
            <span className="nuzio-topbar__notif-dot" />
          </IconButton>

          <Avatar
            name={title ? 'Nuzio AI' : (typeof window !== 'undefined' ? (localStorage.getItem('nuzio_auth_token') ? 'Member' : 'Guest') : 'User')}
            size="small"
            status="online"
            className="nuzio-topbar__avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
