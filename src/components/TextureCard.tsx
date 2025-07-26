import React from 'react';
import { Texture } from '../types';

interface TextureCardProps {
  texture: Texture;
  onClick: () => void;
}

export const TextureCard: React.FC<TextureCardProps> = ({ texture, onClick }) => {
  return (
    <div
      className={`card-texture bg-gray-800 rounded-lg flex flex-col justify-between items-center ${
        texture.is_removed ? 'texture-removed' : ''
      }`}
      onClick={onClick}
    >
      <div className="image-container flex justify-center items-center flex-grow">
        <img
          className="object-contain flex-grow max-w-full max-h-full"
          src={texture.url}
          loading="lazy"
          alt={texture.id}
        />
      </div>

      <div className="text-gray-400 flex-shrink-0 leading-tight mt-2 text-xs">
        {texture.id}
      </div>
    </div>
  );
}; 