import React, { useState, useEffect, useMemo } from 'react';
import { TextureViewer } from './components/TextureViewer';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useUrlParams } from './hooks/useUrlParams';
import { useTextureData } from './hooks/useTextureData';
import { Texture, Version } from './types';

function App() {
  const {
    searchText,
    setSearchText,
    filterVersion,
    setFilterVersion,
    filterState,
    setFilterState,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage
  } = useUrlParams();

  const [isLargeImage, setIsLargeImage] = useState(false);
  const { textures, versions, loading, error } = useTextureData();

  const filteredTextures = useMemo(() => {
    return textures.filter((item: Texture) => {
      let shouldShow = true;

      if (searchText) {
        const searchTextLower = searchText.toLowerCase();
        shouldShow = item.id.toLowerCase().includes(searchTextLower) || item.id_raw.toString() === searchText;
      }

      if (filterState > 0 && filterVersion > 0) {
        if (filterState === 2) {
          shouldShow = item.version_removed_id === filterVersion;
        } else if (filterState === 3) {
          shouldShow = item.version_updated_id === filterVersion;
        } else {
          shouldShow = item.version_added_id === filterVersion;
        }
      } else {
        if (shouldShow && filterVersion > 0) {
          shouldShow = item.version_added_id === filterVersion || 
                      item.version_removed_id === filterVersion || 
                      item.version_updated_id === filterVersion;
        }

        if (shouldShow && filterState > 0) {
          shouldShow = filterState === 2 ? item.is_removed : 
                      filterState === 3 ? item.is_updated : item.is_new;
        }
      }

      return shouldShow;
    });
  }, [textures, searchText, filterVersion, filterState]);

  const paginatedTextures = useMemo(() => {
    if (pageSize === filteredTextures.length) {
      return filteredTextures;
    }
    const startIndex = (currentPage - 1) * pageSize;
    return filteredTextures.slice(startIndex, startIndex + pageSize);
  }, [filteredTextures, currentPage, pageSize]);

  const toggleImageSize = () => {
    setIsLargeImage(!isLargeImage);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-1 pb-8">
        <div className="text-gray-400 mb-3 text-center text-xs px-4">
          Select a version to view all texture changes for that version. Filter by state to view only new, removed, or updated textures.<br />
          A <span className="text-red-500">red outline</span> means the texture was removed.
        </div>

        <TextureViewer
          searchText={searchText}
          setSearchText={setSearchText}
          filterVersion={filterVersion}
          setFilterVersion={setFilterVersion}
          filterState={filterState}
          setFilterState={setFilterState}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLargeImage={isLargeImage}
          toggleImageSize={toggleImageSize}
          textures={paginatedTextures}
          filteredTextures={filteredTextures}
          versions={versions}
          loading={loading}
          error={error}
        />
      </main>

      <Footer />
    </div>
  );
}

export default App; 