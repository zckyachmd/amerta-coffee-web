import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis-start" className="px-4 py-2">
          ...
        </span>
      );
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i < totalPages) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`px-4 py-2 rounded ${
              currentPage === i
                ? "bg-coffee text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis-end" className="px-4 py-2">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-coffee text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {currentPage > 3 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 rounded bg-coffee text-white"
        >
          <FaChevronLeft />
        </button>
      )}

      {renderPageNumbers()}

      {currentPage < totalPages - 2 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 rounded bg-coffee text-white"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};
