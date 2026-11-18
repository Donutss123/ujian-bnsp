
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Pagination } from "../types/student.types";

interface StudentPaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

const StudentPagination = ({
  pagination,
  onPageChange,
}: StudentPaginationProps) => {
  const { currentPage, totalPages, totalData, limit } = pagination;

  const startData =
    totalData === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endData = Math.min(currentPage * limit, totalData);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-5 py-4 sm:flex-row">
      <p className="text-sm text-text-secondary">
        Menampilkan{" "}
        <span className="font-medium text-text-primary">
          {startData}-{endData}
        </span>{" "}
        dari{" "}
        <span className="font-medium text-text-primary">
          {totalData}
        </span>{" "}
        siswa
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Halaman sebelumnya"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="min-w-24 text-center text-sm text-text-primary">
          Halaman {currentPage} / {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Halaman berikutnya"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentPagination;
