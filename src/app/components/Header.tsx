// src/app/components/Header.tsx
import { useState, useEffect, useContext } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const [userId, setUserId] = useState('');
  const { showNotification } = useContext(AppContext);

  useEffect(() => {
    generateUserId();
  }, []);

  const generateUserId = () => {
    // Generate a unique user ID (you can replace this with your own logic)
    const newUserId = Math.random().toString(36).substring(7);
    setUserId(newUserId);
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    showNotification('User ID copied to clipboard');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Satoshi Tokens</h1>
      <div className="mt-2 flex items-center space-x-2">
        <span className="text-gray-600">User ID: {userId}</span>
        <button
          onClick={copyUserId}
          className="p-1 text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          <ClipboardDocumentIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;