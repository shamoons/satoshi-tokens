// src/app/components/GodModePanel.tsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const GodModePanel: React.FC = () => {
  const { users, currentUser, setCurrentUser } = useContext(AppContext);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-2">God Mode</h3>
      <div className="mb-4">
        <label htmlFor="userSelect" className="block mb-1">
          Select User:
        </label>
        <select
          id="userSelect"
          className="w-full px-2 py-1 border border-gray-300 rounded"
          value={currentUser?.shortId || ''}
          onChange={(e) => setCurrentUser(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.shortId} value={user.shortId}>
              {user.name} ({user.shortId})
            </option>
          ))}
        </select>
      </div>
      {currentUser && (
        <p className="text-sm">
          Current User: {currentUser.name} ({currentUser.shortId})
        </p>
      )}
    </div>
  );
};

export default GodModePanel;