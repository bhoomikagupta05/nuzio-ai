import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Volume2,
  Clock,
  Globe,
  Bell,
  Briefcase,
  Layers,
  ShieldCheck,
  LogOut,
  Sparkles,
  Check,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AppLayout from '../../layouts/AppLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import Badge from '../../components/common/Badge.jsx';
import Toggle from '../../components/common/Toggle.jsx';
import Chip from '../../components/common/Chip.jsx';
import Avatar from '../../components/common/Avatar.jsx';
import { NARRATOR_VOICES, CATEGORIES } from '../../data/mockData.js';

export const ALL_PROFESSIONS = [
  'Technology',
  'Finance & Banking',
  'Consulting',
  'Healthcare & Biotech',
  'Venture Capital',
  'Legal & Policy',
  'Marketing & Media',
  'Real Estate',
  'Education',
  'Research / Science',
];

export const ALL_INTEREST_TOPICS = [
  'AI & Technology',
  'Financial Markets',
  'Indian Business',
  'Global Politics',
  'Startups',
  'Science',
  'Geopolitics',
  'Health & Medicine',
  'Climate & Energy',
  'Culture & Arts',
  'Legal & Policy',
  'Education',
];

export const TIME_OPTIONS = [
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
];

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [name, setName] = useState(user?.name || 'Aarav');
  const [language, setLanguage] = useState(user?.language || 'en');
  const [profession, setProfession] = useState(user?.profession || 'Technology');
  const [interests, setInterests] = useState(user?.interests || ['AI & Technology', 'Financial Markets']);
  const [narrator, setNarrator] = useState(
    user?.narrator?.name || (typeof user?.narrator === 'string' ? user?.narrator : 'Aria')
  );
  const [briefTime, setBriefTime] = useState(user?.briefTime || '7:00 AM');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    user?.notificationsEnabled !== undefined ? user.notificationsEnabled : true
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const toggleTopic = (topic) => {
    if (interests.includes(topic)) {
      setInterests(interests.filter((t) => t !== topic));
    } else {
      if (interests.length < 7) {
        setInterests([...interests, topic]);
      }
    }
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfile({
        name,
        language,
        profession,
        interests,
        narrator: {
          name: narrator,
          voiceId: narrator.toLowerCase(),
        },
        briefTime,
        notificationsEnabled,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppLayout activeNavId="settings" topBarTitle="Settings">
      <div className="nuzio-settings-container">
        {/* Page Header */}
        <section className="settings-header-section">
          <div className="settings-title-group">
            <h1 className="nuzio-page-title">Settings & Personalization</h1>
            <p className="nuzio-page-subtitle">
              Configure your daily delivery schedule, neural voice narrator, and news filtering priorities.
            </p>
          </div>

          <Button
            variant="primary"
            size="medium"
            loading={isSaving}
            leftIcon={saveSuccess ? <Check size={16} /> : <Save size={16} />}
            onClick={handleSavePreferences}
            className="btn-save-settings"
          >
            {saveSuccess ? 'Changes Saved' : 'Save Changes'}
          </Button>
        </section>

        {/* User Account Overview Card */}
        <Card glow padding="large" className="settings-profile-card">
          <div className="settings-profile-inner">
            <Avatar name={name} size="large" status="online" />

            <div className="settings-profile-details">
              <div className="settings-profile-name-row">
                <h2 className="settings-profile-name">{name}</h2>
                <Badge variant={user?.plan === 'pro' ? 'purple' : 'neutral'} size="small">
                  <ShieldCheck size={12} style={{ marginRight: 4 }} />
                  {user?.plan === 'pro' ? 'PRO EXECUTIVE' : 'FREE TIER'}
                </Badge>
              </div>

              <span className="settings-profile-email">{user?.email || 'user@example.com'}</span>
            </div>

            {user?.plan !== 'pro' && (
              <Button
                variant="secondary"
                size="small"
                onClick={() => navigate('/app/billing')}
                className="btn-settings-upgrade"
              >
                Upgrade to Pro
              </Button>
            )}
          </div>
        </Card>

        {/* 1. Language & Localization */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Globe size={18} className="section-icon" />
            <h3 className="settings-section-title">Briefing Language</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-language-grid">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`settings-pill-option ${language === 'en' ? 'settings-pill-option--active' : ''}`}
              >
                <span>English (Global & India)</span>
                {language === 'en' && <Check size={16} />}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`settings-pill-option ${language === 'hi' ? 'settings-pill-option--active' : ''}`}
              >
                <span>हिन्दी (Hindi Edition)</span>
                {language === 'hi' && <Check size={16} />}
              </button>
            </div>
          </Card>
        </section>

        {/* 2. AI Voice Narrator */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Volume2 size={18} className="section-icon" />
            <h3 className="settings-section-title">AI Narrator Voice</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-narrator-grid">
              {NARRATOR_VOICES.map((v) => {
                const isSelected = narrator === v.name;

                return (
                  <div
                    key={v.id}
                    onClick={() => setNarrator(v.name)}
                    className={`settings-narrator-tile ${isSelected ? 'settings-narrator-tile--active' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <Avatar name={v.name} size="medium" status={isSelected ? 'ai' : 'online'} />

                    <div className="narrator-tile-info">
                      <div className="narrator-tile-title-row">
                        <span className="narrator-tile-name">{v.name}</span>
                        <span className="narrator-tile-gender">{v.gender}</span>
                      </div>
                      <span className="narrator-tile-tone">{v.tone}</span>
                    </div>

                    <div className={`onboarding-radio-indicator ${isSelected ? 'onboarding-radio-indicator--active' : ''}`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* 3. Schedule & Delivery Timing */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Clock size={18} className="section-icon" />
            <h3 className="settings-section-title">Daily Briefing Schedule</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-time-selector-row">
              {TIME_OPTIONS.map((slot) => {
                const isSelected = briefTime === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setBriefTime(slot)}
                    className={`settings-time-chip ${isSelected ? 'settings-time-chip--active' : ''}`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        {/* 4. Profession & Niche Priorities */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Briefcase size={18} className="section-icon" />
            <h3 className="settings-section-title">Profession Focus</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-chips-container">
              {ALL_PROFESSIONS.map((prof) => {
                const isSelected = profession === prof;

                return (
                  <Chip
                    key={prof}
                    size="medium"
                    selected={isSelected}
                    showCheck={isSelected}
                    onClick={() => setProfession(prof)}
                  >
                    {prof}
                  </Chip>
                );
              })}
            </div>
          </Card>
        </section>

        {/* 5. Topic Niches (Max 7) */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Layers size={18} className="section-icon" />
            <h3 className="settings-section-title">Selected Topic Niches ({interests.length}/7)</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-chips-container">
              {ALL_INTEREST_TOPICS.map((topic) => {
                const isSelected = interests.includes(topic);

                return (
                  <Chip
                    key={topic}
                    size="medium"
                    selected={isSelected}
                    showCheck={isSelected}
                    onClick={() => toggleTopic(topic)}
                  >
                    {topic}
                  </Chip>
                );
              })}
            </div>
          </Card>
        </section>

        {/* 6. Push Notifications */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Bell size={18} className="section-icon" />
            <h3 className="settings-section-title">Notification Channels</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-toggle-group">
              <Toggle
                checked={notificationsEnabled}
                onChange={setNotificationsEnabled}
                label="Executive Push Alerts"
                description="Receive notifications when your morning brief is synthesized and ready"
              />
            </div>
          </Card>
        </section>

        {/* 7. Appearance */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <Sparkles size={18} className="section-icon" />
            <h3 className="settings-section-title">Appearance / Dark Mode</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-toggle-group">
              <Toggle
                checked={true}
                onChange={() => alert('Light mode is currently in development.')}
                label="Dark Mode Executive Theme"
                description="Preserve the dark glassmorphic UI designed for optimal low-light reading"
              />
            </div>
          </Card>
        </section>

        {/* 8. Data & Privacy Options */}
        <section className="settings-section-block">
          <div className="settings-section-title-row">
            <ShieldCheck size={18} className="section-icon" />
            <h3 className="settings-section-title">Data & Privacy</h3>
          </div>

          <Card padding="medium" className="settings-options-card">
            <div className="settings-toggle-group">
              <Toggle
                checked={false}
                onChange={() => {}}
                label="Share Anonymous Telemetry"
                description="Help us improve Nuzio AI by sharing anonymized usage patterns"
              />
            </div>
          </Card>
        </section>

        {/* 9. Account Actions */}
        <section className="settings-section-block settings-danger-zone">
          <Button
            variant="danger"
            size="large"
            fullWidth
            leftIcon={<LogOut size={18} />}
            onClick={handleSignOut}
          >
            Sign Out of Account
          </Button>
        </section>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
