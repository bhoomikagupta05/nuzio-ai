import React, { useState } from 'react';
import { X, Play, Pause, Clock, ExternalLink, Bookmark, Share2, Sparkles, Volume2 } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import Modal from '../common/Modal.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';
import IconButton from '../common/IconButton.jsx';

export const StoryDetailModal = ({ story, isOpen, onClose, onBookmark, onShare }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [bookmarked, setBookmarked] = useState(false);

  if (!story) return null;

  const isThisPlaying = isPlaying && currentTrack?.id === story.id;

  const handleAudioClick = () => {
    if (currentTrack?.id === story.id) {
      togglePlay();
    } else {
      let narrative = story.fullContent || story.summary || '';
      // Remove any HTML tags if they exist
      narrative = narrative.replace(/<[^>]*>?/gm, '');

      let speechText = `${story.title}. ${narrative}`;
      
      if (story.bullets && story.bullets.length > 0) {
        speechText += ' Key takeaways: ' + story.bullets.join(' ');
      }
      
      const trackForAudio = {
        ...story,
        narrationText: speechText,
        narrator: 'Aria'
      };
      playTrack(trackForAudio);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(story);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(story);
    } else {
      navigator.clipboard?.writeText(window.location.origin + `/app/story/${story.id}`);
      alert('Story briefing link copied to clipboard!');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="large"
      title="Executive Briefing Breakdown"
      subtitle={`Source: ${story.source?.name || story.source || 'Unknown'} • Multi-source verified`}
      footer={
        <div className="story-modal-footer-actions">
          <div className="story-modal-footer-left">
            <IconButton
              ariaLabel="Save story"
              variant="ghost"
              size="medium"
              tooltip={bookmarked ? 'Saved to Bookmarks' : 'Bookmark'}
              onClick={handleBookmark}
            >
              <Bookmark size={18} fill={bookmarked ? 'var(--color-primary-light)' : 'none'} />
            </IconButton>

            <IconButton
              ariaLabel="Share briefing"
              variant="ghost"
              size="medium"
              tooltip="Share Link"
              onClick={handleShare}
            >
              <Share2 size={18} />
            </IconButton>

            {story.sourceUrl && (
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-story-source-link"
                title="View original publisher report"
              >
                <span>Original Report</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <Button
            variant="primary"
            size="medium"
            leftIcon={isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
            onClick={handleAudioClick}
          >
            {isThisPlaying ? 'Pause Audio Brief' : `Play Brief (${story.audioDuration || '2 min'})`}
          </Button>
        </div>
      }
    >
      <div className="nuzio-story-detail-body">
        {/* Header Metadata */}
        <div className="story-detail-meta-row">
          <Badge variant="purple" size="small">
            {story.categoryLabel || story.category}
          </Badge>

          <div className="story-detail-time">
            <Clock size={14} />
            <span>{story.publishedAt || '15m ago'}</span>
            <span className="dot-divider">•</span>
            <span>{story.readTimeMinutes || 2} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="story-detail-title typo-title-large">
          {story.title}
        </h1>

        {/* Hero Image */}
        {story.imageUrl && (
          <div className="story-detail-image-container">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="story-detail-hero-image"
            />
          </div>
        )}

        {/* AI Key Takeaways Box */}
        {story.bullets && story.bullets.length > 0 && (
          <div className="story-detail-takeaways-card">
            <div className="takeaways-header">
              <Sparkles size={16} className="takeaways-sparkle" />
              <span>AI Executive Takeaways</span>
            </div>

            <ul className="takeaways-list">
              {story.bullets.map((bullet, idx) => (
                <li key={idx} className="takeaway-item">
                  <span className="takeaway-bullet-num">{idx + 1}</span>
                  <p className="takeaway-text">{bullet}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Full Narrative Content */}
        <div className="story-detail-narrative">
          <span className="ds-subsection-title">Synthesized Narrative</span>
          <p className="story-narrative-paragraph">
            {story.fullContent || story.summary}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default StoryDetailModal;
