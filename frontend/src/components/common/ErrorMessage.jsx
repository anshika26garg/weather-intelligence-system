import React from 'react';
import { FiXCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
    <FiXCircle className="text-5xl text-red-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
    <p className="text-gray-400 max-w-md">{message}</p>
  </div>
);

export default ErrorMessage;
