import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { buildNewsNarration } from '../services/voiceService.js';
import aiService from '../services/aiService.js';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  
  // Real sync state
  const [progressPercent, setProgressPercent] = useState(0);
  
  const [voices, setVoices] = useState([]);
  
  const utteranceRef = useRef(null);
  const synth = window.speechSynthesis;

  // Load voices securely
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [synth]);

  // Handle Playback rate changes dynamically
  useEffect(() => {
    if (utteranceRef.current) {
      utteranceRef.current.rate = playbackRate;
      if (isPlaying && synth) {
        synth.pause();
        setTimeout(() => {
          if (isPlaying) synth.resume();
        }, 50);
      }
    }
  }, [playbackRate]);

  const speakText = useCallback((text, narratorName, onEndCallback) => {
    if (!synth) return;
    
    synth.cancel(); // Stop any ongoing speech
    setProgressPercent(0);

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Voice mapping (heuristic)
    if (voices.length > 0) {
      let selectedVoice = voices.find(v => v.name.toLowerCase().includes(narratorName.toLowerCase()));
      if (!selectedVoice) {
        if (narratorName === 'Aria' || narratorName === 'Sarah') {
          selectedVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Google US English'));
        } else if (narratorName === 'Marcus') {
          selectedVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Google UK English Male'));
        }
      }
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }
    
    utterance.rate = playbackRate;
    utterance.volume = isMuted ? 0 : 1;
    
    // Track exact progress
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.name === 'sentence') {
        const percent = Math.min(100, Math.floor((event.charIndex / text.length) * 100));
        setProgressPercent(percent);
      }
    };
    
    utterance.onend = () => {
      setProgressPercent(100);
      if (onEndCallback) onEndCallback();
    };
    
    utterance.onerror = (e) => {
      console.error('[VOICE] ERROR:', e);
      setIsPlaying(false);
    };

    synth.speak(utterance);
  }, [synth, voices, playbackRate, isMuted]);

  const playTrack = useCallback((track) => {
    if (!track) return;
    setCurrentTrack(track);
    setProgressPercent(0);
    setIsPlaying(true);
    setIsMiniPlayerVisible(true);
    
    // Play audio synchronously
    speakText(track.narrationText, track.narrator, () => {
      console.log('[VOICE] Playback ended');
      setIsPlaying(false);
    });
    
  }, [speakText]);

  const playDailyBrief = useCallback((briefing, narratorName = 'Aria') => {
    try {
      console.log('[VOICE] Request received to play daily brief');
      
      if (!briefing) {
        console.warn('[VOICE] No briefing provided to playDailyBrief');
        return;
      }
      
      const script = buildNewsNarration(briefing, narratorName);
      
      console.log(`[VOICE] Narration created. Length: ${script.narrationText.length} chars`);
      console.log(`[VOICE] Voice engine: Web Speech API TTS`);
      console.log(`[VOICE] Playback started`);
      
      const briefTrack = {
        id: 'daily-master-brief',
        title: script.title,
        categoryLabel: 'Daily Briefing',
        narrator: narratorName,
        source: 'Nuzio AI Executive Intelligence',
        publishedAt: 'Fresh this morning',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        narrationText: script.narrationText
      };
      
      playTrack(briefTrack);
    } catch (error) {
      console.error('[VOICE] ERROR:', error.message);
      setIsPlaying(false);
    }
  }, [playTrack]);

  const togglePlay = () => {
    if (!currentTrack) {
      console.warn('[VOICE] No current track to toggle');
      return;
    }
    
    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      synth.resume();
      setIsPlaying(true);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 1.5, 1.75, 2.0, 0.75];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? 1 : 0;
    }
  };

  const openPlayerModal = () => setIsPlayerModalOpen(true);
  const closePlayerModal = () => setIsPlayerModalOpen(false);

  const closeMiniPlayer = () => {
    synth.cancel();
    setIsPlaying(false);
    setIsMiniPlayerVisible(false);
  };

  const value = {
    currentTrack,
    isPlaying,
    playbackRate,
    progressPercent,
    isMuted,
    isPlayerModalOpen,
    isMiniPlayerVisible,
    playTrack,
    playDailyBrief,
    togglePlay,
    setPlaybackRate,
    cyclePlaybackRate,
    toggleMute,
    openPlayerModal,
    closePlayerModal,
    closeMiniPlayer,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
