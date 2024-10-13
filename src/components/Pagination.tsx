import React from "react";

import Button from "./common/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
}) => {
  return (
    <div className="flex gap-6 mt-6 items-center justify-center">
      <Button
        variant="grey"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-4"
      >
        Previous
      </Button>
      <span>
        {currentPage} / {totalPages} pages
      </span>
      <Button
        onClick={onNext}
        variant="primary"
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
