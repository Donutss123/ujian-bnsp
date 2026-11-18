
import { useState } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Plus,
  X,
} from "lucide-react";

import StudentToolbar from "../features/students/components/StudentToolbar";
import StudentTable from "../features/students/components/StudentTable";
import StudentPagination from "../features/students/components/StudentPagination";
import StudentFormModal from "../features/students/components/StudentFormModal";

import { useStudents } from "../features/students/hooks/useStudents";
import { STUDENT_PAGE_SIZE } from "../features/students/constants/student.constants";

import {
  createStudent,
  updateStudent,
  deleteStudent,
} from "../features/students/api/student.api";

import type {
  Student,
  StudentFormData,
} from "../features/students/types/student.types";

interface Notification {
  type: "success" | "error";
  message: string;
}

const StudentsPage = () => {
  // State pencarian, filter, dan pagination
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [jurusan, setJurusan] = useState("");

  // State modal tambah/edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  // State notifikasi
  const [notification, setNotification] =
    useState<Notification | null>(null);

  // Mengambil data siswa dari backend
  const {
    students,
    pagination,
    loading,
    error,
    refetch,
  } = useStudents({
    page,
    limit: STUDENT_PAGE_SIZE,
    search,
    jurusan,
  });

  // Mengubah pencarian dan kembali ke halaman pertama
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Mengubah filter dan kembali ke halaman pertama
  const handleMajorChange = (value: string) => {
    setJurusan(value);
    setPage(1);
  };

  // Membuka modal tambah siswa
  const handleAdd = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  // Membuka modal edit siswa
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Menyimpan data baru atau memperbarui data lama
  const handleSave = async (data: StudentFormData) => {
    try {
      if (selectedStudent) {
        // Mode edit
        await updateStudent(selectedStudent.id, data);

        setNotification({
          type: "success",
          message: "Data siswa berhasil diperbarui.",
        });

        handleCloseModal();
        await refetch();
      } else {
        // Mode tambah
        await createStudent(data);

        setNotification({
          type: "success",
          message: "Siswa baru berhasil ditambahkan.",
        });

        handleCloseModal();

        // Data baru ditampilkan dari halaman pertama
        if (page !== 1) {
          setPage(1);
        } else {
          await refetch();
        }
      }
    } catch (err) {
      setNotification({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Gagal menyimpan data siswa.",
      });
    }
  };

  // Menghapus data siswa
  const handleDelete = async (student: Student) => {
    // Meminta konfirmasi sebelum menghapus
    const confirmed = window.confirm(
      `Yakin ingin menghapus data ${student.nama_siswa}?`
    );

    if (!confirmed) return;

    try {
      await deleteStudent(student.id);

      setNotification({
        type: "success",
        message: "Data siswa berhasil dihapus.",
      });

      // Jika baris terakhir di halaman ini dihapus,
      // pindah ke halaman sebelumnya.
      if (students.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      } else {
        await refetch();
      }
    } catch (err) {
      setNotification({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Gagal menghapus data siswa.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-text-primary sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Page Header */}
        <header>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/15 p-3 text-primary-light">
              <GraduationCap size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Student Management
              </h1>

              <p className="mt-1 text-sm text-text-secondary">
                Kelola dan pantau data siswa.
              </p>
            </div>
          </div>
        </header>

        {/* Notification */}
        {notification && (
          <div
            role="status"
            className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-sm ${
              notification.type === "success"
                ? "border-green-500/20 bg-green-500/10 text-green-400"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            }`}
          >
            <p>{notification.message}</p>

            <button
              type="button"
              onClick={() => setNotification(null)}
              title="Tutup notifikasi"
              className="shrink-0 rounded-lg p-1 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Total Siswa
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {pagination.totalData}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Users size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">
                  Data Per Halaman
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {STUDENT_PAGE_SIZE}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <BookOpen size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* Student Data */}
        <section className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="space-y-5 p-5">

            {/* Judul dan tombol tambah */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  Data Siswa
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Daftar seluruh siswa yang terdaftar.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-light"
              >
                <Plus size={18} />
                Tambah Siswa
              </button>
            </div>

            {/* Search dan filter */}
            <StudentToolbar
              search={search}
              jurusan={jurusan}
              onSearchChange={handleSearchChange}
              onMajorChange={handleMajorChange}
            />
          </div>

          {/* Tabel siswa */}
          <StudentTable
            students={students}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Pagination */}
          {!loading && !error && (
            <StudentPagination
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </section>

      </div>

      {/* Modal tambah dan edit */}
      <StudentFormModal
        isOpen={isModalOpen}
        student={selectedStudent}
        onClose={handleCloseModal}
        onSubmit={handleSave}
      />
    </main>
  );
};

export default StudentsPage;
