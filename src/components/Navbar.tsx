import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 mb-3">
      <div className="container mx-auto px-4">
        <div className="py-3">
          <span className="font-fg text-xl font-medium text-white">
            Overwatch Texture Viewer
          </span>
        </div>
      </div>
    </nav>
  );
}; 