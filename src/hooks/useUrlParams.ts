import { useState, useEffect } from 'react';

const DEFAULT_PAGE_SIZE = 500;

export const useUrlParams = () => {
  const [searchText, setSearchTextState] = useState('');
  const [filterVersion, setFilterVersionState] = useState(0);
  const [filterState, setFilterStateState] = useState(0);
  const [pageSize, setPageSizeState] = useState(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPageState] = useState(1);

  // Initialize from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchTextState(urlParams.get('q') || '');
    setPageSizeState(parseInt(urlParams.get('pageSize') || String(DEFAULT_PAGE_SIZE)));
    setCurrentPageState(parseInt(urlParams.get('page') || '1'));
    setFilterStateState(parseInt(urlParams.get('state') || '0'));
  }, []);

  const updateURL = (params: { [key: string]: string | null }) => {
    const urlParams = new URLSearchParams(window.location.search);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '') {
        urlParams.delete(key);
      } else {
        urlParams.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  const setSearchText = (text: string) => {
    setSearchTextState(text);
    updateURL({ q: text === '' ? null : text });
  };

  const setFilterVersion = (version: number) => {
    setFilterVersionState(version);
    // We'll update URL with version name when versions are loaded
  };

  const setFilterState = (state: number) => {
    setFilterStateState(state);
    updateURL({ state: state === 0 ? null : String(state) });
  };

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    updateURL({ pageSize: size === DEFAULT_PAGE_SIZE ? null : String(size) });
  };

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page);
    updateURL({ page: page === 1 ? null : String(page) });
  };

  return {
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
  };
}; 