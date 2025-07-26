import React from 'react';

interface ErrorMessageProps {
  show: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-auto max-w-md">
      Error loading data.
    </div>
  );
}; 