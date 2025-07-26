import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pages = [];
  for (let i = adjustedStartPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className={`flex justify-center ${className}`}>
      <ul className="flex items-center space-x-1">
        {/* First and Previous buttons */}
        <li>
          <button
            className="min-w-9 px-2 py-1.5 text-sm rounded border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        <li>
          <button
            className="min-w-9 px-2 py-1.5 text-sm rounded border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`min-w-9 px-2 py-1.5 text-sm rounded border ${
                page === currentPage
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : 'border-gray-600 bg-gray-700 text-white hover:bg-gray-600'
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next and Last buttons */}
        <li>
          <button
            className="min-w-9 px-2 py-1.5 text-sm rounded border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
        <li>
          <button
            className="min-w-9 px-2 py-1.5 text-sm rounded border border-gray-600 bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
}; 