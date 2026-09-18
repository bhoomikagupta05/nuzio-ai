import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Landing Page
import LandingPage from '../pages/landing/LandingPage.jsx';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';

// Onboarding Pages
import LanguagePage from '../pages/onboarding/LanguagePage.jsx';
import WelcomePage from '../pages/onboarding/WelcomePage.jsx';
import ProfessionPage from '../pages/onboarding/ProfessionPage.jsx';
import InterestsPage from '../pages/onboarding/InterestsPage.jsx';
import NarratorPage from '../pages/onboarding/NarratorPage.jsx';
import BriefTimePage from '../pages/onboarding/BriefTimePage.jsx';
import NotificationPage from '../pages/onboarding/NotificationPage.jsx';
import ReadyPage from '../pages/onboarding/ReadyPage.jsx';

// Protected App Core Pages
import ProtectedRoute from './ProtectedRoute.jsx';
import HomePage from '../pages/home/HomePage.jsx';
import DiscoverPage from '../pages/discover/DiscoverPage.jsx';
import SettingsPage from '../pages/settings/SettingsPage.jsx';
import BillingPage from '../pages/billing/BillingPage.jsx';
import DesignSystemPage from '../pages/DesignSystemPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Screen */}
      <Route path="/" element={<LandingPage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 8-Step Onboarding Flow */}
      <Route path="/onboarding/language" element={<LanguagePage />} />
      <Route path="/onboarding/welcome" element={<WelcomePage />} />
      <Route path="/onboarding/profession" element={<ProfessionPage />} />
      <Route path="/onboarding/interests" element={<InterestsPage />} />
      <Route path="/onboarding/narrator" element={<NarratorPage />} />
      <Route path="/onboarding/brief-time" element={<BriefTimePage />} />
      <Route path="/onboarding/notifications" element={<NotificationPage />} />
      <Route path="/onboarding/ready" element={<ReadyPage />} />

      {/* Protected App Routes */}
      <Route
        path="/app/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/discover"
        element={
          <ProtectedRoute>
            <DiscoverPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/billing"
        element={
          <ProtectedRoute>
            <BillingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/*"
        element={
          <ProtectedRoute>
            <Navigate to="/app/home" replace />
          </ProtectedRoute>
        }
      />

      {/* Development Design System Showcase */}
      <Route path="/design-system" element={<DesignSystemPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
