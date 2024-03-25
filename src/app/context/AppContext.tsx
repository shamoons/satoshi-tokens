// src/app/context/AppContext.tsx
"use client"
import { createContext, useState } from 'react';

interface AppContextProps {
  notification: string;
  showNotification: (message: string) => void;
  clearNotification: () => void;
}

export const AppContext = createContext<AppContextProps>({
  notification: '',
  showNotification: () => { },
  clearNotification: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState('');

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <AppContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
    </AppContext.Provider>
  );
};