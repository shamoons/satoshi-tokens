// src/app/components/Header.tsx
import { useState, useEffect, useContext } from 'react';
import { ClipboardDocumentIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const [userId, setUserId] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { balance, fetchBalance, showNotification } = useContext(AppContext);

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

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await fetchBalance();
    setIsRefreshing(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Satoshi Tokens</h1>
      <div className="mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Balance: {balance} satoshis</span>
          <button
            onClick={handleRefreshBalance}
            className="p-1 text-gray-500 hover:text-gray-600 focus:outline-none"
            disabled={isRefreshing}
          >
            <ArrowPathIcon
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={userId}
              readOnly
              className="w-full px-3 py-2 text-gray-700 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={copyUserId}
              className="absolute right-0 top-0 bottom-0 px-3 text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <ClipboardDocumentIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;