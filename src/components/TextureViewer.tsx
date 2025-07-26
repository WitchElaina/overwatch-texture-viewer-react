import React from 'react';
import { FilterControls } from './FilterControls';
import { TextureGrid } from './TextureGrid';
import { Pagination } from './Pagination';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Texture, Version } from '../types';

interface TextureViewerProps {
  searchText: string;
  setSearchText: (text: string) => void;
  filterVersion: number;
  setFilterVersion: (version: number) => void;
  filterState: number;
  setFilterState: (state: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  isLargeImage: boolean;
  toggleImageSize: () => void;
  textures: Texture[];
  filteredTextures: Texture[];
  versions: Version[];
  loading: boolean;
  error: boolean;
}

export const TextureViewer: React.FC<TextureViewerProps> = ({
  searchText,
  setSearchText,
  filterVersion,
  setFilterVersion,
  filterState,
  setFilterState,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  isLargeImage,
  toggleImageSize,
  textures,
  filteredTextures,
  versions,
  loading,
  error,
}) => {
  const totalPages = Math.ceil(filteredTextures.length / pageSize);
  const shouldShowPagination = pageSize !== filteredTextures.length;

  return (
    <div className="container mx-auto text-center px-4" style={{ maxWidth: '2200px' }}>
      <FilterControls
        searchText={searchText}
        setSearchText={setSearchText}
        filterVersion={filterVersion}
        setFilterVersion={setFilterVersion}
        filterState={filterState}
        setFilterState={setFilterState}
        pageSize={pageSize}
        setPageSize={setPageSize}
        isLargeImage={isLargeImage}
        toggleImageSize={toggleImageSize}
        versions={versions}
        totalItems={filteredTextures.length}
        loading={loading}
      />

      <ErrorMessage show={error && !loading} />
      <LoadingSpinner show={loading} />

      {!loading && (
        <>
          {shouldShowPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          <TextureGrid
            textures={textures}
            isLargeImage={isLargeImage}
            loading={loading}
          />

          {shouldShowPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-5"
            />
          )}
        </>
      )}
    </div>
  );
}; 