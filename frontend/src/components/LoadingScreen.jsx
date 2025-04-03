import React from 'react';
import Loader from './Loader';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <Loader size="large" color="primary" />
        <p className="mt-4 text-gray-700 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;