import React from 'react';
import Sidebar, { DEFAULT_NAV_ITEMS } from './Sidebar.jsx';
import BottomNavigation from './BottomNavigation.jsx';

/**
 * Nuzio AppNavigation controller
 * 
 * Renders Sidebar on desktop/tablet and BottomNavigation on mobile.
 */
export const AppNavigation = ({
  items = DEFAULT_NAV_ITEMS,
  activeId = 'home',
  onSelect,
  collapsed = false,
  onToggleCollapse,
}) => {
  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <Sidebar
        items={items}
        activeId={activeId}
        onSelect={onSelect}
        collapsed={collapsed}
        onToggleCollapse={onToggleCollapse}
        className="nuzio-nav-desktop"
      />

      {/* Mobile-only Bottom Navigation */}
      <BottomNavigation
        items={items.slice(0, 4)}
        activeId={activeId}
        onSelect={onSelect}
        className="nuzio-nav-mobile"
      />
    </>
  );
};

export default AppNavigation;
