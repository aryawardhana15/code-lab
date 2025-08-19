import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

  // Dummy data for a single course
  const course = {
    id: parseInt(id),
    title: 'Dasar HTML & CSS',
    description: 'Pelajari dasar-dasar HTML untuk struktur web dan CSS untuk styling yang menarik. Cocok untuk pemula!',
    mentor: 'Budi Santoso',
    schedule: 'Setiap Selasa & Kamis, 19.00 - 21.00 WIB',
    prerequisites: 'Tidak ada prasyarat, cocok untuk pemula.',
    modules: [
      { id: 1, title: 'Pengenalan HTML', preview: true },
      { id: 2, title: 'Struktur Dasar HTML', preview: true },
      { id: 3, title: 'Styling dengan CSS', preview: true },
      { id: 4, title: 'Box Model di CSS', preview: false },
      { id: 5, title: 'Flexbox untuk Layout', preview: false },
      { id: 6, title: 'Responsif dengan Media Queries', preview: false },
    ],
    leaderboard: [
      { id: 1, name: 'Siswa A', points: 1500 },
      { id: 2, name: 'Siswa B', points: 1450 },
      { id: 3, name: 'Siswa C', points: 1400 },
      { id: 4, name: 'Siswa D', points: 1350 },
      { id: 5, name: 'Siswa E', points: 1300 },
      { id: 6, name: 'Siswa F', points: 1250 },
      { id: 7, name: 'Siswa G', points: 1200 },
      { id: 8, name: 'Siswa H', points: 1150 },
      { id: 9, name: 'Siswa I', points: 1100 },
      { id: 10, name: 'Siswa J', points: 1050 },
    ]
  };

  if (!course) {
    return <div className="container mx-auto py-10 text-center">Kelas tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{course.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Deskripsi Kelas</h2>
          <p className="text-gray-700 mb-4">{course.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Informasi Kelas</h2>
          <p className="text-gray-700 mb-2"><strong>Mentor:</strong> {course.mentor}</p>
          <p className="text-gray-700 mb-2"><strong>Jadwal:</strong> {course.schedule}</p>
          <p className="text-gray-700 mb-4"><strong>Prasyarat:</strong> {course.prerequisites}</p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700">Enroll Sekarang</button>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Daftar Modul</h2>
          <ul className="space-y-2">
            {course.modules.map(module => (
              <li key={module.id} className="bg-gray-50 p-3 rounded-md flex justify-between items-center">
                <span>{module.title}</span>
                {module.preview ? (
                  <span className="text-blue-600 text-sm">Preview</span>
                ) : (
                  <span className="text-gray-400 text-sm">Terkunci</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Leaderboard Kelas</h2>
          <ol className="list-decimal list-inside space-y-2">
            {course.leaderboard.map((student, index) => (
              <li key={student.id} className="flex justify-between items-center">
                <span>{student.name}</span>
                <span className="font-semibold">{student.points} Poin</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
