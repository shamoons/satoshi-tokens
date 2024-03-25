// src/app/context/AppContext.tsx
"use client"
import { User } from '@/types/user';
import { createContext, useState, useEffect } from 'react';

interface AppContextProps {
  balance: number;
  users: User[];
  notification: string;
  fetchBalance: () => void;
  fetchUsers: () => void;
  sendTokens: (recipientId: string, amount: number) => void;
  showNotification: (message: string) => void;
  clearNotification: () => void;
}

export const AppContext = createContext<AppContextProps>({
  balance: 0,
  users: [],
  notification: '',
  fetchBalance: () => { },
  fetchUsers: () => { },
  sendTokens: () => { },
  showNotification: () => { },
  clearNotification: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchBalance();
    fetchUsers();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/balance');
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const sendTokens = async (recipientId: string, amount: number) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientId, amount }),
      });

      if (response.ok) {
        fetchBalance();
        showNotification('Tokens sent successfully');
      } else {
        showNotification('Failed to send tokens');
      }
    } catch (error) {
      console.error('Error sending tokens:', error);
      showNotification('Error sending tokens');
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <AppContext.Provider value={{ balance, users, notification, fetchBalance, fetchUsers, sendTokens, showNotification, clearNotification }}>
      {children}
    </AppContext.Provider>
  );
};