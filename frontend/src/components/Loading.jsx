// src/components/Loading.jsx - Fixed with proper imports
import React from 'react';
import { Watch } from 'lucide-react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-gray-600 border-t-blue-500 mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Watch className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <p className="text-white text-lg mt-4">{message}</p>
        <p className="text-gray-400 text-sm mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;