// src/app/components/SendForm.tsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { User } from '@/types/user';


const SendForm = () => {
  const { balance, users, sendTokens } = useContext(AppContext);
  const [recipientId, setRecipientId] = React.useState('');
  const [amount, setAmount] = React.useState(0);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendTokens(recipientId, amount);
    setRecipientId('');
    setAmount(0);
  };

  return (
    <form onSubmit={handleSend}>
      <div className="mb-4">
        <label htmlFor="recipientId" className="block mb-2">
          Recipient:
        </label>
        <select
          id="recipientId"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Select a recipient</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        disabled={amount > balance || recipientId === ''}
      >
        Send
      </button>
    </form>
  );
};

export default SendForm;