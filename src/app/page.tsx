// src/app/page.tsx
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import SendForm from './components/SendForm';
import Toast from './components/Toast';

const HomePage = () => {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchBalance();
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientId, amount }),
      });

      if (response.ok) {
        // Transaction successful, update balance
        fetchBalance();
        setRecipientId('');
        setAmount(0);
      } else {
        console.error('Transaction failed');
      }
    } catch (error) {
      console.error('Error sending tokens:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <Header />
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <SendForm
                // recipientId={recipientId}
                // setRecipientId={setRecipientId}
                // amount={amount}
                // setAmount={setAmount}
                // balance={balance}
                // onSubmit={handleSend}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default HomePage;