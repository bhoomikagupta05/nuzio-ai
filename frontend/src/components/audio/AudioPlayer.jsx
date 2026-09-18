import React from 'react';
import { Volume2, X, Maximize2, Radio } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import AudioControls from './AudioControls.jsx';
import IconButton from '../common/IconButton.jsx';

export const AudioPlayer = () => {
  const {
    currentTrack,
    isMiniPlayerVisible,
    isPlaying,
    progressPercent,
    closeMiniPlayer,
    openPlayerModal,
  } = useAudio();

  if (!isMiniPlayerVisible || !currentTrack) {
    return null;
  }

  const handleSeekChange = (e) => {
    // Cannot seek TTS
    e.preventDefault();
  };

  return (
    <aside className="nuzio-floating-audio-player" aria-label="Persistent Audio Player">
      {/* Top Scrubber Line */}
      <div className="audio-mini-scrubber-track">
        <div
          className="audio-mini-scrubber-fill"
          style={{ width: `${progressPercent}%` }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={progressPercent}
          onChange={handleSeekChange}
          aria-label="Seek audio timeline"
          className="audio-mini-scrubber-input"
        />
      </div>

      <div className="nuzio-floating-audio-player__inner">
        {/* Track Metadata & Artwork */}
        <div
          className="audio-player-meta-group"
          onClick={openPlayerModal}
          role="button"
          tabIndex={0}
          title="Click to expand audio briefing view"
        >
          {currentTrack.imageUrl ? (
            <img
              src={currentTrack.imageUrl}
              alt=""
              className="audio-player-artwork"
            />
          ) : (
            <div className="audio-player-artwork-placeholder">
              <Radio size={16} className={isPlaying ? 'pulse-icon' : ''} />
            </div>
          )}

          <div className="audio-player-text-details">
            <span className="audio-player-title ellipsis--ellipsis--IdJAr">
              {currentTrack.title}
            </span>
            <div className="audio-player-subtitle-row">
              <span className="audio-player-category">{currentTrack.categoryLabel || 'Briefing'}</span>
              <span className="audio-player-divider">•</span>
              <span className="audio-player-time">
                TTS Live Sync: {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <AudioControls size="medium" showExtended={true} />
        
        {/* Close/Expand Action */}
        <div className="audio-player-actions">
           <IconButton 
            icon={<Maximize2 size={16} />} 
            onClick={openPlayerModal}
            variant="ghost" 
            ariaLabel="Expand audio player"
          />
          <IconButton 
            icon={<X size={18} />} 
            onClick={closeMiniPlayer}
            variant="ghost" 
            ariaLabel="Close audio player"
          />
        </div>
      </div>
    </aside>
  );
};

export default AudioPlayer;
