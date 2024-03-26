// src/app/components/Toast.tsx
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Toast = () => {
  const { notification, clearNotification } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          clearNotification();
        }, 500); // Wait for the fade-out animation to complete before clearing the notification
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification, clearNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div
      className={`fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow flex items-center justify-between transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <span>{notification}</span>
      <button
        className="ml-4 text-white hover:text-gray-100 focus:outline-none"
        onClick={clearNotification}
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;