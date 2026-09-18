import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState({
    theme: 'dark',
    activeTab: 'home',
    networkStatus: 'idle',
  });

  const updateState = (updates) => {
    setAppState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{ appState, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
