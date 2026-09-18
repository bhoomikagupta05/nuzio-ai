import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, Check, Volume2 } from 'lucide-react';
import { useOnboarding } from '../../context/OnboardingContext.jsx';
import OnboardingLayout from './OnboardingLayout.jsx';
import Card from '../../components/common/Card.jsx';
import Avatar from '../../components/common/Avatar.jsx';
import { NARRATOR_VOICES } from '../../data/mockData.js';

export const NarratorPage = () => {
  const navigate = useNavigate();
  const { onboardingData, setNarrator } = useOnboarding();
  const [playingId, setPlayingId] = useState(null);

  const toggleSample = (e, narratorName) => {
    e.stopPropagation();
    if (playingId === narratorName) {
      setPlayingId(null);
    } else {
      setPlayingId(narratorName);
    }
  };

  const handleContinue = () => {
    if (onboardingData.narrator) {
      navigate('/onboarding/brief-time');
    }
  };

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={7}
      backPath="/onboarding/interests"
      continueDisabled={!onboardingData.narrator}
      onContinue={handleContinue}
    >
      <div className="onboarding-step">
        <div className="onboarding-step__header">
          <span className="typo-overline">Step 4</span>
          <h1 className="onboarding-step__title">Pick a<br />narrator voice.</h1>
          <p className="onboarding-step__subtitle">
            Tap to hear a 10-second sample of your daily AI narrator.
          </p>
        </div>

        <div className="onboarding-cards-group">
          {NARRATOR_VOICES.map((narrator) => {
            const isSelected = onboardingData.narrator === narrator.name;
            const isPlaying = playingId === narrator.name;

            return (
              <Card
                key={narrator.id}
                interactive
                selected={isSelected}
                glow={isSelected}
                onClick={() => setNarrator(narrator.name)}
                className="onboarding-narrator-card"
              >
                <div className="onboarding-narrator-card__inner">
                  <div className="onboarding-narrator-card__left">
                    <Avatar
                      name={narrator.name}
                      size="medium"
                      status={isSelected ? 'ai' : 'online'}
                    />

                    <div className="onboarding-narrator-card__info">
                      <div className="onboarding-narrator-card__title-row">
                        <span className="onboarding-narrator-name">{narrator.name}</span>
                        <span className="onboarding-narrator-gender">{narrator.gender}</span>
                      </div>
                      <span className="onboarding-narrator-tone">{narrator.tone}</span>
                    </div>
                  </div>

                  <div className="onboarding-narrator-card__right">
                    <button
                      type="button"
                      aria-label={isPlaying ? `Pause ${narrator.name} sample` : `Play ${narrator.name} sample`}
                      onClick={(e) => toggleSample(e, narrator.name)}
                      className={`btn-play-sample ${isPlaying ? 'btn-play-sample--playing' : ''}`}
                    >
                      {isPlaying ? (
                        <div className="audio-wave-bars" title="Playing sample">
                          <span className="wave-bar bar-1" />
                          <span className="wave-bar bar-2" />
                          <span className="wave-bar bar-3" />
                        </div>
                      ) : (
                        <>
                          <Play size={16} />
                          <span className="sr-only">Play voice sample</span>
                        </>
                      )}
                    </button>

                    <div className={`onboarding-radio-indicator ${
                      isSelected ? 'onboarding-radio-indicator--active' : ''
                    }`}>
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                </div>

                {isPlaying && (
                  <div className="onboarding-narrator-sample-box">
                    <Volume2 size={14} className="sample-icon-pulse" />
                    <span className="sample-text">"{narrator.sampleText}"</span>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </OnboardingLayout>
  );
};

export default NarratorPage;
