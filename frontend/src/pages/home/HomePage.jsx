import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Radio,
  Play,
  Pause,
  Clock,
  Volume2,
  TrendingUp,
  RotateCcw,
  Layout,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAudio } from '../../context/AudioContext.jsx';
import AppLayout from '../../layouts/AppLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import NewsCard from '../../components/news/NewsCard.jsx';
import StoryDetailModal from '../../components/news/StoryDetailModal.jsx';
import aiService from '../../services/aiService.js';

export const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    currentTrack,
    isPlaying,
    playDailyBrief,
    togglePlay,
    progressPercent,
    playbackRate,
    cyclePlaybackRate,
    openPlayerModal,
  } = useAudio();

  const [selectedStory, setSelectedStory] = useState(null);
  const [savedStories, setSavedStories] = useState(user?.savedArticles || []);
  const [briefing, setBriefing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = React.useRef(false);

  React.useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    
    const fetchBriefing = async () => {
      try {
        setIsLoading(true);
        const data = await aiService.getDailyBriefing();
        setBriefing(data);
        setError(null);
      } catch (err) {
        setError('Failed to generate daily intelligence synthesis. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBriefing();
  }, []);

  // Authenticated user personalization metadata
  const userName = user?.name || 'Aarav';
  const userNarrator = user?.narrator?.name || (typeof user?.narrator === 'string' ? user?.narrator : 'Aria');
  const userBriefTime = user?.briefTime || '7:00 AM';
  const userLanguage = user?.language === 'hi' ? 'हिन्दी (Hindi)' : 'English';
  const userPlan = user?.plan || 'free';

  // Formatted date string
  const todayDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isMasterBriefPlaying = isPlaying && currentTrack?.id === 'daily-master-brief';

  const handleMasterBriefPlay = () => {
    if (currentTrack?.id === 'daily-master-brief') {
      togglePlay();
    } else {
      playDailyBrief(briefing, userNarrator);
    }
  };

  const handleBookmark = (story) => {
    if (savedStories.includes(story.id)) {
      setSavedStories(savedStories.filter((id) => id !== story.id));
    } else {
      setSavedStories([...savedStories, story.id]);
    }
  };

  return (
    <AppLayout activeNavId="home" topBarTitle="Daily Briefing">
      <div className="nuzio-home-container">
        {/* Executive Header Section */}
        <section className="home-executive-header">
          <div className="home-executive-header__top">
            <div className="home-executive-badge-row">
              <div className="nuzio-live-status-pill">
                <Radio size={13} className="pulse-icon" />
                <span>AI Audio Intelligence Active</span>
              </div>

              <div className="home-market-pulse-pill">
                <TrendingUp size={13} />
                <span>Markets: Bullish +0.8% • AI Pulse: Verified</span>
              </div>
            </div>

            <span className="home-date-display typo-overline">{todayDateString}</span>
          </div>

          <div className="home-greeting-row">
            <div>
              <h1 className="home-greeting-title">
                Good morning, <span className="hero-gradient-text">{userName}</span>.
              </h1>
              <p className="home-greeting-sub typo-body-medium">
                Here is your morning brief in {userLanguage}, narrated by <strong>{userNarrator}</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Master Audio Briefing Card */}
        <Card glow padding="large" className="home-master-audio-card">
          <div className="master-audio-card__inner">
            <div className="master-audio-card__header">
              <div className="master-audio-card__title-group">
                <div className="master-audio-icon-box">
                  <Sparkles size={22} />
                </div>
                <div>
                  <h2 className="master-audio-title">
                    {isLoading ? 'Synthesizing Briefing...' : (briefing?.headline || "Today's Executive Synthesis")}
                  </h2>
                  <p className="master-audio-subtitle">
                    {isLoading ? 'Our AI is analyzing the top stories matching your preferences.' : (briefing?.overview || 'Curated briefing covering global and domestic developments.')}
                  </p>
                </div>
              </div>

              <div className="master-audio-voice-badge">
                <Volume2 size={15} />
                <span>Narrator: {userNarrator}</span>
              </div>
            </div>

            {/* Play Trigger & Interactive Audio Scrubber */}
            <div className="master-audio-playback-row">
              <button
                type="button"
                onClick={handleMasterBriefPlay}
                className={`master-play-button ${isMasterBriefPlaying ? 'master-play-button--playing' : ''}`}
                aria-label={isMasterBriefPlaying ? 'Pause Daily Briefing' : 'Play Daily Briefing'}
              >
                {isMasterBriefPlaying ? (
                  <>
                    <Pause size={20} fill="#ffffff" />
                    <span>Pause Briefing</span>
                  </>
                ) : (
                  <>
                    <Play size={20} fill="#ffffff" style={{ marginLeft: 2 }} />
                    <span>Play Daily Brief</span>
                  </>
                )}
              </button>

              <div className="master-audio-scrubber-box">
                <div className="master-audio-progress-bar">
                  <div
                    className="master-audio-progress-fill"
                    style={{ width: `${isMasterBriefPlaying ? progressPercent : 0}%` }}
                  />
                </div>
                <div className="master-audio-time-meta">
                  <span>TTS Live Sync</span>
                  <span>{isMasterBriefPlaying ? `${progressPercent}%` : ''}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={cyclePlaybackRate}
                className="master-audio-speed-chip"
                title="Change playback speed"
              >
                {playbackRate}x
              </button>
            </div>
          </div>
        </Card>

        {/* Curated Stories Section */}
        <section className="home-stories-section">
          <div className="home-section-header">
            <div>
              <h2 className="nuzio-section-heading">Top Curated Briefings</h2>
              <p className="nuzio-section-sub">
                Synthesized across global technology frontiers, macroeconomic policy, and Indian markets.
              </p>
            </div>

            <Button
              variant="ghost"
              size="small"
              rightIcon={<ArrowRight size={15} />}
              onClick={() => navigate('/app/discover')}
            >
              Explore Discover Feed
            </Button>
          </div>

          <div className="home-stories-grid">
            {isLoading && (
              <div style={{ color: 'var(--color-text-secondary)', padding: '20px' }}>
                <Sparkles size={16} style={{ display: 'inline', marginRight: '8px' }} />
                AI is synthesizing your personalized stories...
              </div>
            )}
            
            {error && (
              <div style={{ color: 'var(--color-danger)', padding: '20px' }}>
                {error}
              </div>
            )}

            {!isLoading && !error && briefing?.topStories?.map((story) => (
              <NewsCard
                key={story.storyId}
                story={{
                  id: story.storyId,
                  title: story.title,
                  summary: story.summary,
                  categoryLabel: story.category,
                  source: story.source,
                  imageUrl: story.imageUrl,
                  // Keep legacy fields so NewsCard doesn't break
                  publishedAt: 'Just now',
                  readTimeMinutes: 2
                }}
                onClick={(s) => setSelectedStory(s)}
                onBookmark={handleBookmark}
                isBookmarked={savedStories.includes(story.storyId)}
              />
            ))}
          </div>
        </section>

        {/* Detail Breakdown Modal */}
        <StoryDetailModal
          story={selectedStory}
          isOpen={Boolean(selectedStory)}
          onClose={() => setSelectedStory(null)}
          onBookmark={handleBookmark}
        />
      </div>
    </AppLayout>
  );
};

export default HomePage;
