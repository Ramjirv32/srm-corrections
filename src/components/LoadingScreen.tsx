// import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#F5A051]"></div>
        <div className="mt-4 text-center">
          <div className="text-xl text-white font-semibold">Loading...</div>
          <div className="text-sm text-gray-300 mt-1">Please wait while we prepare your experience</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
