import React from 'react';
import { Play, Pause, Sparkles, Clock, ArrowRight, Radio } from 'lucide-react';
import { useAudio } from '../../context/AudioContext.jsx';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import Button from '../common/Button.jsx';

export const FeaturedNewsCard = ({ story, onReadMore, className = '' }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  if (!story) return null;

  const isThisPlaying = isPlaying && currentTrack?.id === story.id;

  const handlePlayClick = (e) => {
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

  return (
    <Card
      glow
      padding="large"
      onClick={() => onReadMore?.(story)}
      className={`nuzio-featured-card ${className}`}
    >
      <div className="nuzio-featured-card__backdrop-overlay" />

      {story.imageUrl && (
        <img
          src={story.imageUrl}
          alt=""
          className="nuzio-featured-card__bg-image"
        />
      )}

      <div className="nuzio-featured-card__content">
        <div className="nuzio-featured-card__top-badge-row">
          <div className="nuzio-featured-live-pill">
            <Radio size={13} className="pulse-icon" />
            <span>High-Impact AI Briefing</span>
          </div>

          <Badge variant="purple" size="small">
            {story.categoryLabel || 'Featured'}
          </Badge>
        </div>

        <h2 className="nuzio-featured-card__title">
          {story.title}
        </h2>

        <p className="nuzio-featured-card__summary typo-body-medium">
          {story.summary}
        </p>

        <div className="nuzio-featured-card__meta-bar">
          <div className="meta-left">
            <span className="source-tag">{story.source?.name || story.source || 'Unknown'}</span>
            <span className="dot-divider">•</span>
            <Clock size={14} />
            <span>{story.publishedAt || 'Just now'}</span>
          </div>

          <div className="meta-right">
            <Button
              variant="primary"
              size="medium"
              leftIcon={isThisPlaying ? <Pause size={16} /> : <Play size={16} />}
              onClick={handlePlayClick}
              className="btn-featured-listen"
            >
              {isThisPlaying ? 'Playing Briefing...' : `Listen Brief (${story.audioDuration || '2m'})`}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedNewsCard;
