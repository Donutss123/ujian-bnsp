
import { Pencil, Trash2 } from "lucide-react";

import type { Student } from "../types/student.types";

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  error: string | null;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentTable = ({
  students,
  loading,
  error,
  onEdit,
  onDelete,
}: StudentTableProps) => {
  if (loading) {
    return (
      <div className="py-16 text-center text-text-secondary">
        Memuat data siswa...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-400">
        {error}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium text-text-primary">
          Data siswa tidak ditemukan
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          Coba gunakan kata pencarian atau filter lain.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wider text-text-secondary">
            <th className="px-5 py-4">Kode Siswa</th>
            <th className="px-5 py-4">Nama Siswa</th>
            <th className="px-5 py-4">Jurusan</th>
            <th className="px-5 py-4">Tanggal Lahir</th>
            <th className="px-5 py-4">Alamat</th>
            <th className="px-5 py-4 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-border/70 transition hover:bg-white/[0.03]"
            >
              <td className="px-5 py-4 text-sm font-medium text-blue-400">
                {student.kode_siswa}
              </td>

              <td className="px-5 py-4 text-sm font-medium text-text-primary">
                {student.nama_siswa}
              </td>

              <td className="px-5 py-4">
                <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                  {student.jurusan}
                </span>
              </td>

              <td className="px-5 py-4 text-sm text-text-secondary">
                {new Date(
                  `${student.tanggal_lahir.slice(0, 10)}T00:00:00`
                ).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="max-w-52 truncate px-5 py-4 text-sm text-text-secondary">
                {student.alamat}
              </td>

              {/* Tombol aksi Edit dan Hapus */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(student)}
                    title="Edit siswa"
                    className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-2 text-blue-400 transition hover:bg-blue-500/20"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(student)}
                    title="Hapus siswa"
                    className="rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
