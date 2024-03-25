// src/app/components/Header.tsx
import { useState, useEffect } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [userId, setUserId] = useState('');

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
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">Satoshi Tokens</h1>
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">User ID: {userId}</span>
        <button
          onClick={copyUserId}
          className="p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <ClipboardDocumentIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;