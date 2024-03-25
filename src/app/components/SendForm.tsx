// src/app/components/SendForm.tsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { User } from '@/types/user';

const SendForm = () => {
  const { balance, users, sendTokens } = useContext(AppContext);
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipientId(value);
    setError('');

    if (value.trim() !== '') {
      const filteredSuggestions = users.filter((user) =>
        user.id.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: User) => {
    setRecipientId(suggestion.id);
    setSuggestions([]);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmount(value);
    setError('');
  };

  const handleAmountClick = (percentage: number) => {
    const calculatedAmount = Math.floor((balance * percentage) / 100);
    setAmount(calculatedAmount);
    setError('');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount > balance) {
      setError('Insufficient balance');
      return;
    }

    setIsSending(true);
    await sendTokens(recipientId, amount);
    setRecipientId('');
    setAmount(0);
    setIsSending(false);
  };

  const isButtonDisabled = amount <= 0 || amount > balance || recipientId === '' || isSending;

  return (
    <form onSubmit={handleSend} className="space-y-6">
      <div>
        <label htmlFor="recipientId" className="block text-sm font-medium text-gray-700">
          Recipient
        </label>
        <div className="mt-1 relative">
          <input
            type="text"
            id="recipientId"
            value={recipientId}
            onChange={handleRecipientChange}
            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${error ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600`}
            required
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.shortId}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.shortId} ({suggestion.name})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <div className="mt-1">
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className={`block w-full px-4 py-2 text-gray-700 bg-white border ${error ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600`}
            required
          />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => handleAmountClick(25)}
          >
            25%
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => handleAmountClick(50)}
          >
            50%
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onClick={() => handleAmountClick(100)}
          >
            100%
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ${isButtonDisabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
            }`}
          disabled={isButtonDisabled}
        >
          {isSending ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              Sending...
            </div>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </form>
  );
};

export default SendForm;