import React from 'react';

interface LoadingSpinnerProps {
  show: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="flex justify-center m-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}; 