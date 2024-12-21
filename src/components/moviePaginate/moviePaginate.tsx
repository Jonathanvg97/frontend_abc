"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MoviePaginate = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="MoviePaginate flex justify-center items-center mt-6 flex-wrap gap-2">
      {/* Botón Previous */}
      <button
        className="px-4 py-2 text-white bg-neutral border-2 border-gray-100 rounded w-[100px] sm:w-[120px] disabled:opacity-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Texto de la página */}
      <span className="text-white font-bold sm:px-4 py-2">
        {`${currentPage} of ${totalPages}`}
      </span>

      {/* Botón Next */}
      <button
        className="px-4 py-2 text-white bg-neutral border-2 border-gray-100 rounded w-[100px] sm:w-[120px] disabled:opacity-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default MoviePaginate;
