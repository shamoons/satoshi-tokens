import React from 'react';

const SendForm = ({
  recipientId,
  setRecipientId,
  amount,
  setAmount,
  balance,
  onSubmit,
}: {
  recipientId: string;
  setRecipientId: (value: string) => void;
  amount: number;
  setAmount: (value: number) => void;
  balance: number;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label htmlFor="recipientId" className="block mb-2">
          Recipient ID:
        </label>
        <input
          type="text"
          id="recipientId"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
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
        disabled={amount > balance}
      >
        Send
      </button>
    </form>
  );
};

export default SendForm;