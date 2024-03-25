// src/app/context/AppContext.tsx
"use client";
import { createContext, useState, useEffect } from 'react';
import { User } from '@/types/user';

interface AppContextProps {
  currentUser: User | null;
  balance: number;
  users: User[];
  notification: string;
  fetchUsers: () => void;
  fetchBalance: () => void;
  sendTokens: (recipientId: string, amount: number) => void;
  setCurrentUser: (userId: string) => void;
  showNotification: (message: string) => void;
  clearNotification: () => void;
}

export const AppContext = createContext<AppContextProps>({
  currentUser: null,
  balance: 0,
  users: [],
  notification: '',
  fetchUsers: () => { },
  fetchBalance: () => { },
  sendTokens: () => { },
  setCurrentUser: () => { },
  showNotification: () => { },
  clearNotification: () => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchBalance();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users.map((u: User) => ({ ...u, shortId: u.id.split('-')[0] })));
      setCurrentUser({
        ...data.users[0],
        shortId: data.users[0].id.split('-')[0],
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await fetch(`/api/balance?userId=${currentUser?.id}`);
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const sendTokens = async (recipientId: string, amount: number) => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderId: currentUser?.id, recipientId, amount }),
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

  const setCurrentUserHandler = (userId: string) => {
    const selectedUser = users.find((user) => user.shortId === userId);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  const showNotification = (message: string) => {
    setNotification(message);
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        balance,
        users,
        notification,
        fetchUsers,
        fetchBalance,
        sendTokens,
        setCurrentUser: setCurrentUserHandler,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};