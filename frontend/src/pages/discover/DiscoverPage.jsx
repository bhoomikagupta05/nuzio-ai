import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, X, Bookmark, ArrowRight, Radio } from 'lucide-react';
import AppLayout from '../../layouts/AppLayout.jsx';
import CategoryTabs from '../../components/news/CategoryTabs.jsx';
import FeaturedNewsCard from '../../components/news/FeaturedNewsCard.jsx';
import NewsCard from '../../components/news/NewsCard.jsx';
import StoryDetailModal from '../../components/news/StoryDetailModal.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { CATEGORIES, TRENDING_TAGS } from '../../data/mockData.js';

export const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [savedStories, setSavedStories] = useState([]);
  
  const [liveStories, setLiveStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live stories when category or search changes
  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        
        const response = await fetch(`/api/news/discover?${params.toString()}`);
        const data = await response.json();
        
        if (data.success && data.data && data.data.articles) {
          setLiveStories(data.data.articles);
        }
      } catch (error) {
        console.error('Failed to fetch live news', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Debounce search slightly
    const timer = setTimeout(() => fetchNews(), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Filtered stories are now just the live stories returned by the backend API
  const filteredStories = liveStories;

  const featuredStory = liveStories.length > 0 ? liveStories[0] : null;

  const handleBookmark = (story) => {
    if (savedStories.includes(story.id)) {
      setSavedStories(savedStories.filter((id) => id !== story.id));
    } else {
      setSavedStories([...savedStories, story.id]);
    }
  };

  const handleTagClick = (tag) => {
    const rawTag = tag.replace('#', '').toLowerCase();
    setSearchQuery(rawTag);
  };

  return (
    <AppLayout activeNavId="discover" topBarTitle="Discover">
      <div className="nuzio-discover-container">
        {/* Page Header */}
        <section className="discover-header-section">
          <h1 className="nuzio-page-title">Discover & Explore</h1>
          <p className="nuzio-page-subtitle">
            Real-time synthesized intelligence across emerging technologies, venture capital, and macroeconomic policy.
          </p>

          {/* Quick Search Bar */}
          <div className="discover-search-bar-wrapper">
            <Search size={18} className="discover-search-icon" />
            <input
              type="text"
              placeholder="Search news by keyword, company, topic (e.g. OpenAI, TSMC, RBI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="discover-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="discover-search-clear"
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Trending Topic Pills */}
          <div className="discover-trending-pills-row">
            <span className="trending-label">Trending:</span>
            <div className="trending-chips-list">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="nuzio-trending-chip"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="discover-categories-section">
          <CategoryTabs
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categories={CATEGORIES}
          />
        </section>

        {/* Featured Story Hero (when viewing All with no search) */}
        {selectedCategory === 'all' && !searchQuery && (
          <section className="discover-featured-section">
            <FeaturedNewsCard
              story={featuredStory}
              onReadMore={(s) => setSelectedStory(s)}
            />
          </section>
        )}

        {/* Results Grid / List */}
        <section className="discover-grid-section">
          <div className="discover-grid-header">
            <span className="ds-subsection-title">
              {searchQuery
                ? `Search Results for "${searchQuery}" (${filteredStories.length})`
                : selectedCategory === 'all'
                ? 'All Recent Briefings'
                : `${CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Category'} (${filteredStories.length})`}
            </span>
          </div>

          {filteredStories.length > 0 ? (
            <div className="discover-stories-grid">
              {filteredStories.map((story) => (
                <NewsCard
                  key={story.id}
                  story={story}
                  onClick={(s) => setSelectedStory(s)}
                  onBookmark={handleBookmark}
                  isBookmarked={savedStories.includes(story.id)}
                />
              ))}
            </div>
          ) : (
            <Card padding="large" className="nuzio-empty-state-card">
              <div className="empty-state-icon-box">
                <Search size={32} />
              </div>
              <h3 className="empty-state-title">No briefings found</h3>
              <p className="empty-state-text">
                No verified intelligence stories match your search for "{searchQuery}". Try selecting a different topic tag or clearing your search.
              </p>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Search & Filters
              </Button>
            </Card>
          )}
        </section>

        {/* Story Detail Modal */}
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

export default DiscoverPage;
