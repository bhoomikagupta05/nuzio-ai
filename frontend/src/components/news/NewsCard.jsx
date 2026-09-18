import React, { useState } from 'react';
import { Play, Pause, Clock, Bookmark, Share2, Sparkles, ExternalLink } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import IconButton from '../common/IconButton.jsx';

export const NewsCard = ({ story, onClick, onBookmark, onShare, isBookmarked = false, className = '' }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const isThisPlaying = isPlaying && currentTrack?.id === story.id;

  const handleAudioClick = (e) => {
    e.stopPropagation();
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

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmark?.(story);
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    if (onShare) {
      onShare(story);
    } else {
      navigator.clipboard?.writeText(window.location.origin + `/app/story/${story.id}`);
      alert('Story briefing link copied to clipboard!');
    }
  };

  return (
    <Card
      interactive
      glow={isThisPlaying}
      padding="medium"
      onClick={() => onClick?.(story)}
      className={`nuzio-news-card ${isThisPlaying ? 'nuzio-news-card--playing' : ''} ${className}`}
    >
      <div className="nuzio-news-card__header">
        <div className="nuzio-news-card__category-group">
          <Badge variant="purple" size="small">
            {story.categoryLabel || story.category}
          </Badge>
          <span className="nuzio-news-card__source">{story.source?.name || story.source || 'Unknown'}</span>
        </div>

        <div className="nuzio-news-card__meta">
          <Clock size={13} className="meta-icon" />
          <span>{story.publishedAt || '15m ago'}</span>
        </div>
      </div>

      <div className="nuzio-news-card__body">
        {story.imageUrl && (
          <div className="nuzio-news-card__thumb-wrapper">
            <img
              src={story.imageUrl}
              alt=""
              loading="lazy"
              className="nuzio-news-card__thumb"
            />
          </div>
        )}

        <div className="nuzio-news-card__content">
          <h3 className="nuzio-news-card__title">{story.title}</h3>

          <p className="nuzio-news-card__summary typo-body-small">
            {story.summary}
          </p>

          {story.bullets && story.bullets.length > 0 && (
            <ul className="nuzio-news-card__bullets">
              {story.bullets.slice(0, 2).map((bullet, idx) => (
                <li key={idx} className="nuzio-news-card__bullet-item">
                  <span className="bullet-point-dot" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="nuzio-news-card__footer">
        <button
          type="button"
          onClick={handleAudioClick}
          className={`btn-listen-story ${isThisPlaying ? 'btn-listen-story--active' : ''}`}
          aria-label={isThisPlaying ? 'Pause audio brief' : 'Listen to 2-min audio brief'}
        >
          {isThisPlaying ? (
            <>
              <Pause size={14} fill="currentColor" />
              <span>Playing brief...</span>
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              <span>Listen ({story.audioDuration || '2 min'})</span>
            </>
          )}
        </button>

        <div className="nuzio-news-card__actions">
          <IconButton
            ariaLabel="Bookmark story"
            variant="ghost"
            size="small"
            tooltip={bookmarked ? 'Remove Bookmark' : 'Save Story'}
            onClick={handleBookmarkClick}
            className={bookmarked ? 'btn-bookmarked-active' : ''}
          >
            <Bookmark size={16} fill={bookmarked ? 'var(--color-primary-light)' : 'none'} />
          </IconButton>

          <IconButton
            ariaLabel="Share briefing link"
            variant="ghost"
            size="small"
            tooltip="Share Briefing"
            onClick={handleShareClick}
          >
            <Share2 size={16} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default NewsCard;
