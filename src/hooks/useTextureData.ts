import { useState, useEffect } from 'react';
import { Texture, Version, TextureInfo } from '../types';

export const useTextureData = () => {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTextureId = (id: number): string => {
    const hexId = id.toString(16).toUpperCase();
    return hexId.padStart(12, '0');
  };

  const getImageUrl = (id: string): string => {
    return `https://assets.overwatchitemtracker.com/textures/${id}.png`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(false);

        // 尝试直接请求，如果失败则使用 CORS 代理
        let response;
        try {
          response = await fetch('https://assets.overwatchitemtracker.com/data/texture_info.json', {
            mode: 'cors',
          });
        } catch (corsError) {
          // 使用公共 CORS 代理作为备选方案
          response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://assets.overwatchitemtracker.com/data/texture_info.json'));
          if (response.ok) {
            const proxyData = await response.json();
            response = new Response(proxyData.contents, {
              status: 200,
              statusText: 'OK',
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch texture data');
        }

        const textureInfo: TextureInfo = await response.json();

        const processedTextures: Texture[] = textureInfo.textures.map((texId, i) => {
          const textureId = getTextureId(texId);
          const versionAddedId = textureInfo.tex_ver_added[i];
          const versionRemovedId = textureInfo.tex_ver_removed[i];
          const versionUpdatedId = textureInfo.tex_ver_updated[i];

          return {
            id: textureId,
            id_raw: texId,
            version_added_id: versionAddedId,
            version_removed_id: versionRemovedId,
            version_updated_id: versionUpdatedId,
            version_added: textureInfo.versions[versionAddedId - 1] || '',
            version_removed: textureInfo.versions[versionRemovedId - 1] || '',
            version_updated: textureInfo.versions[versionUpdatedId - 1] || '',
            is_removed: versionRemovedId !== 0,
            is_new: versionAddedId === textureInfo.versions.length,
            is_updated: versionUpdatedId === textureInfo.versions.length,
            url: getImageUrl(textureId),
          };
        });

        const processedVersions: Version[] = [
          { id: 0, name: 'All' },
          ...textureInfo.versions.map((name, i) => ({ id: i + 1, name })),
        ];

        setTextures(processedTextures);
        setVersions(processedVersions);
        console.log('Loaded textures', processedTextures);
      } catch (err) {
        console.error('Failed to load textures', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    textures,
    versions,
    loading,
    error,
  };
}; 