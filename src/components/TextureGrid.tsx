import React from 'react';
import { TextureCard } from './TextureCard';
import { Texture } from '../types';

interface TextureGridProps {
  textures: Texture[];
  isLargeImage: boolean;
  loading: boolean;
}

export const TextureGrid: React.FC<TextureGridProps> = ({
  textures,
  isLargeImage,
  loading,
}) => {
  const handleItemClick = (item: Texture) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.id);
    } else {
      const input = document.createElement('input');
      input.value = item.id;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    console.log(item);
  };

  if (textures.length === 0 && !loading) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded w-1/4 mx-auto">
        No matches found.
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center gap-2 select-none mb-5 px-4 ${isLargeImage ? 'large-img' : ''}`}>
      {textures.map((item) => (
        <TextureCard
          key={item.id}
          texture={item}
          onClick={() => handleItemClick(item)}
        />
      ))}
    </div>
  );
}; 