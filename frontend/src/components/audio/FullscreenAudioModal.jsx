import React from 'react';
import { X, Volume2, Radio, Sparkles, Share2, Bookmark } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import Modal from '../common/Modal.jsx';
import AudioControls from './AudioControls.jsx';
import Badge from '../common/Badge.jsx';
import IconButton from '../common/IconButton.jsx';

export const FullscreenAudioModal = () => {
  const {
    currentTrack,
    isPlayerModalOpen,
    closePlayerModal,
    progressPercent,
    isPlaying,
  } = useAudio();

  if (!currentTrack) return null;

  const handleSeek = (e) => {
    // Cannot seek TTS natively
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={isPlayerModalOpen}
      onClose={closePlayerModal}
      size="large"
      title="Audio Intelligence Player"
      subtitle={`Narrated by ${currentTrack.narrator || 'Aria'} (Neural AI Voice)`}
      className="nuzio-audio-modal"
    >
      <div className="nuzio-audio-modal-body">
        {/* Artwork & Header */}
        <div className="audio-modal-hero">
          {currentTrack.imageUrl && (
            <div className="audio-modal-image-wrapper">
              <img
                src={currentTrack.imageUrl}
                alt={currentTrack.title}
                className="audio-modal-image"
              />
              <div className="audio-modal-image-overlay" />
            </div>
          )}

          <div className="audio-modal-info">
            <div className="audio-modal-badge-row">
              <Badge variant="purple" size="small">
                {currentTrack.categoryLabel || 'Executive Briefing'}
              </Badge>
              <span className="audio-modal-source">{currentTrack.source}</span>
            </div>

            <h2 className="audio-modal-title">{currentTrack.title}</h2>
          </div>
        </div>

        {/* Animated Waveform Visualizer */}
        <div className="audio-waveform-container" aria-hidden="true">
          {[...Array(28)].map((_, i) => {
            const heightFactor = Math.sin((i / 28) * Math.PI) * 0.85 + 0.15;
            const dynamicHeight = isPlaying ? Math.max(12, Math.floor(heightFactor * 48)) : 8;

            return (
              <span
                key={i}
                className={`waveform-bar ${isPlaying ? 'waveform-bar--animated' : ''}`}
                style={{
                  height: `${dynamicHeight}px`,
                  animationDelay: `${(i % 5) * 0.15}s`,
                }}
              />
            );
          })}
        </div>

        {/* Scrubber & Time Display */}
        <div className="audio-modal-scrubber-group">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleSeek}
            aria-label="Seek audio timeline"
            className="audio-modal-slider"
          />

          <div className="audio-modal-time-row">
            <span>TTS Live Sync</span>
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* Center Control Panel */}
        <div className="audio-modal-controls-wrapper">
          <AudioControls size="large" showExtended={true} />
        </div>

        {/* Executive Takeaways / Key Points */}
        {currentTrack.bullets && currentTrack.bullets.length > 0 && (
          <div className="audio-modal-takeaways">
            <span className="ds-subsection-title">Executive Takeaways</span>
            <ul className="audio-modal-bullets">
              {currentTrack.bullets.map((bullet, idx) => (
                <li key={idx} className="audio-modal-bullet-item">
                  <span className="bullet-dot" />
                  <p className="typo-body-small">{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Controls */}
        <div className="audio-modal-actions-bar">
          <IconButton
            ariaLabel="Bookmark briefing"
            variant="ghost"
            size="medium"
            tooltip="Save Briefing"
            onClick={() => alert('Briefing saved to bookmarks.')}
          >
            <Bookmark size={18} />
          </IconButton>

          <IconButton
            ariaLabel="Share briefing"
            variant="ghost"
            size="medium"
            tooltip="Share Link"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
          >
            <Share2 size={18} />
          </IconButton>
        </div>
      </div>
    </Modal>
  );
};

export default FullscreenAudioModal;
