import React from 'react';
import { Version } from '../types';

interface FilterControlsProps {
  searchText: string;
  setSearchText: (text: string) => void;
  filterVersion: number;
  setFilterVersion: (version: number) => void;
  filterState: number;
  setFilterState: (state: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  isLargeImage: boolean;
  toggleImageSize: () => void;
  versions: Version[];
  totalItems: number;
  loading: boolean;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchText,
  setSearchText,
  filterVersion,
  setFilterVersion,
  filterState,
  setFilterState,
  pageSize,
  setPageSize,
  isLargeImage,
  toggleImageSize,
  versions,
  totalItems,
  loading,
}) => {
  return (
    <form className="flex justify-center gap-3 mb-3 flex-wrap">
      <div className="flex-1 max-w-96">
        <label className="block text-sm font-medium mb-1">Search</label>
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search for texture..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium mb-1">Version</label>
        <select
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterVersion}
          disabled={loading}
          onChange={(e) => setFilterVersion(Number(e.target.value))}
        >
          {versions.map((version) => (
            <option key={version.id} value={version.id}>
              {version.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium mb-1">State</label>
        <select
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={filterState}
          disabled={loading}
          onChange={(e) => setFilterState(Number(e.target.value))}
        >
          <option value={0}>All</option>
          <option value={1}>New</option>
          <option value={2}>Removed</option>
          <option value={3}>Updated</option>
        </select>
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium mb-1">Page Size</label>
        <select
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={pageSize}
          disabled={loading}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={100}>100</option>
          <option value={500}>500</option>
          <option value={1000}>1000</option>
          <option value={2000}>2000</option>
          <option value={4000}>4000</option>
          <option value={totalItems}>All (may cause issues)</option>
        </select>
      </div>

      <div className="w-36">
        <label className="block text-sm font-medium mb-1">Image Size</label>
        <button
          type="button"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          onClick={toggleImageSize}
        >
          {isLargeImage ? 'Large' : 'Small'}
        </button>
      </div>
    </form>
  );
}; 