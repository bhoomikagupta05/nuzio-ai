import React, { useState } from 'react';
import AppNavigation from '../components/navigation/AppNavigation.jsx';
import TopBar from '../components/navigation/TopBar.jsx';
import Container from '../components/layout/Container.jsx';
import AudioPlayer from '../components/audio/AudioPlayer.jsx';
import FullscreenAudioModal from '../components/audio/FullscreenAudioModal.jsx';

/**
 * Nuzio AI Master Application Shell
 * 
 * Enforces responsive layouts across Mobile (320-430px), Tablet (768-834px),
 * Desktop (1024-1440px), and Large Desktop (1920px).
 */
export const AppLayout = ({
  children,
  activeNavId = 'home',
  onSelectNav,
  showTopBar = true,
  topBarTitle,
  containerSize = 'max',
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`nuzio-shell ${sidebarCollapsed ? 'nuzio-shell--collapsed' : ''}`}>
      {/* Ambient Purple Atmospheric Glow */}
      <div className="nuzio-shell__glow-backdrop" aria-hidden="true">
        <div className="nuzio-shell__glow-radial" />
      </div>

      {/* Navigation (Sidebar on Desktop/Tablet, BottomNav on Mobile) */}
      <AppNavigation
        activeId={activeNavId}
        onSelect={onSelectNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="nuzio-shell__main-wrapper">
        {showTopBar && (
          <TopBar
            title={topBarTitle}
            showSidebarToggle={false}
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        <main className="nuzio-shell__content" id="main-content">
          <Container size={containerSize} className="nuzio-shell__container">
            {children}
          </Container>
        </main>
      </div>

      {/* Persistent Floating Mini Audio Player Bar */}
      <AudioPlayer />

      {/* Fullscreen Audio Sheet / Modal */}
      <FullscreenAudioModal />
    </div>
  );
};

export default AppLayout;
