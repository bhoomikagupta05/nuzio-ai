import React from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import IconButton from '../common/IconButton.jsx';

export const AudioControls = ({ size = 'medium', showExtended = true, className = '' }) => {
  const {
    isPlaying,
    togglePlay,
    skip,
    playbackRate,
    cyclePlaybackRate,
    isMuted,
    toggleMute,
    openPlayerModal,
  } = useAudio();

  const isLarge = size === 'large';

  return (
    <div className={`nuzio-audio-controls ${className}`}>
      {/* Rewind 15s */}
      <IconButton
        ariaLabel="Rewind 15 seconds"
        variant="ghost"
        size={isLarge ? 'medium' : 'small'}
        onClick={() => skip(-15)}
        className="btn-audio-rewind"
      >
        <RotateCcw size={isLarge ? 20 : 16} />
      </IconButton>

      {/* Main Play/Pause Button */}
      <button
        type="button"
        aria-label={isPlaying ? 'Pause briefing' : 'Play briefing'}
        onClick={togglePlay}
        className={`nuzio-play-btn-circle ${isLarge ? 'nuzio-play-btn-circle--large' : 'nuzio-play-btn-circle--medium'} ${
          isPlaying ? 'nuzio-play-btn-circle--playing' : ''
        }`}
      >
        {isPlaying ? (
          <Pause size={isLarge ? 24 : 18} fill="#ffffff" />
        ) : (
          <Play size={isLarge ? 24 : 18} fill="#ffffff" style={{ marginLeft: 2 }} />
        )}
      </button>

      {/* Forward 30s */}
      <IconButton
        ariaLabel="Skip forward 30 seconds"
        variant="ghost"
        size={isLarge ? 'medium' : 'small'}
        onClick={() => skip(30)}
        className="btn-audio-forward"
      >
        <RotateCw size={isLarge ? 20 : 16} />
      </IconButton>

      {showExtended && (
        <>
          {/* Speed Selector Button */}
          <button
            type="button"
            aria-label="Change playback speed"
            onClick={cyclePlaybackRate}
            className="nuzio-audio-speed-btn"
          >
            {playbackRate}x
          </button>

          {/* Mute Toggle */}
          <IconButton
            ariaLabel={isMuted ? 'Unmute' : 'Mute'}
            variant="ghost"
            size="small"
            onClick={toggleMute}
            className="btn-audio-mute"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </IconButton>

          {/* Expand Fullscreen */}
          <IconButton
            ariaLabel="Open Fullscreen Player"
            variant="ghost"
            size="small"
            onClick={openPlayerModal}
            className="btn-audio-expand"
          >
            <Maximize2 size={15} />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default AudioControls;
