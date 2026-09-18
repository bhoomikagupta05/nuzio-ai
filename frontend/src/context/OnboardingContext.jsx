import React, { createContext, useContext, useState } from 'react';

const INITIAL_STATE = {
  language: null,
  locationEnabled: false,
  userName: 'Aarav',
  profession: null,
  interests: [],
  narrator: null,
  briefTime: '7:00 AM',
  notificationsEnabled: false,
  notificationPreferences: {
    morningBrief: true,
    breakingAlerts: true,
    weeklyDigest: false,
  },
};

const OnboardingContext = createContext(null);

export const OnboardingProvider = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState(INITIAL_STATE);

  const setLanguage = (language) => {
    setOnboardingData((prev) => ({ ...prev, language }));
  };

  const setUserName = (userName) => {
    setOnboardingData((prev) => ({ ...prev, userName }));
  };

  const setLocationEnabled = (locationEnabled) => {
    setOnboardingData((prev) => ({ ...prev, locationEnabled }));
  };

  const setProfession = (profession) => {
    setOnboardingData((prev) => ({ ...prev, profession }));
  };

  const toggleInterest = (interest) => {
    setOnboardingData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return {
          ...prev,
          interests: prev.interests.filter((item) => item !== interest),
        };
      }
      if (prev.interests.length >= 7) {
        return prev; // Maximum 7 reached
      }
      return {
        ...prev,
        interests: [...prev.interests, interest],
      };
    });
  };

  const setInterests = (interests) => {
    setOnboardingData((prev) => ({
      ...prev,
      interests: interests.slice(0, 7),
    }));
  };

  const setNarrator = (narrator) => {
    setOnboardingData((prev) => ({ ...prev, narrator }));
  };

  const setBriefTime = (briefTime) => {
    setOnboardingData((prev) => ({ ...prev, briefTime }));
  };

  const setNotificationsEnabled = (notificationsEnabled) => {
    setOnboardingData((prev) => ({ ...prev, notificationsEnabled }));
  };

  const updateNotificationPreferences = (prefs) => {
    setOnboardingData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        ...prefs,
      },
    }));
  };

  const resetOnboarding = () => {
    setOnboardingData(INITIAL_STATE);
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setLanguage,
        setUserName,
        setLocationEnabled,
        setProfession,
        toggleInterest,
        setInterests,
        setNarrator,
        setBriefTime,
        setNotificationsEnabled,
        updateNotificationPreferences,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingContext;
