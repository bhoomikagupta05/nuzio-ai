import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from './theme/muiTheme.js';
import { AppProvider } from './context/AppContext.jsx';
import { OnboardingProvider } from './context/OnboardingContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { AudioProvider } from './context/AudioContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export const App = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppProvider>
        <AuthProvider>
          <AudioProvider>
            <OnboardingProvider>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AppRoutes />
              </BrowserRouter>
            </OnboardingProvider>
          </AudioProvider>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
