
import { useCallback, useEffect, useState } from "react";

import { getStudents } from "../api/student.api";

import type {
  Student,
  Pagination,
} from "../types/student.types";

interface UseStudentsParams {
  page: number;
  limit: number;
  search: string;
  jurusan: string;
}

export const useStudents = ({
  page,
  limit,
  search,
  jurusan,
}: UseStudentsParams) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    limit: 5,
    totalData: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getStudents({
        page,
        limit,
        search,
        jurusan: jurusan || undefined,
      });

      setStudents(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data siswa"
      );
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, jurusan]);

  useEffect(() => {
    void fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    pagination,
    loading,
    error,
    refetch: fetchStudents,
  };
};
