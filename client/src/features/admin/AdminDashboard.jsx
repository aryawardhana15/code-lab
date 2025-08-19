import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching admin dashboard data from an API
    const fetchDashboardData = async () => {
      try {
        const dummyData = {
          activeStudents: 150,
          activeCourses: 5,
          totalForumPosts: 320,
          totalLikes: 1500,
          completionRate: '75%',
          recentUsers: [
            { id: 1, name: 'Student A', role: 'student', createdAt: '2025-08-15T10:00:00Z' },
            { id: 2, name: 'Mentor B', role: 'mentor', createdAt: '2025-08-14T14:00:00Z' },
          ],
          pendingProjects: [
            { id: 1, title: 'My First Web App', student: 'Student C' },
            { id: 2, title: 'JavaScript Calculator', student: 'Student D' },
          ],
          pendingTestimonials: [
            { id: 1, student: 'Student E', quote: 'Kursusnya sangat membantu!' },
          ],
        };
        setDashboardData(dummyData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center">Memuat dashboard admin...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!dashboardData) return <div className="text-center">Tidak ada data dashboard.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-blue-600">{dashboardData.activeStudents}</h2>
          <p className="text-gray-600">Siswa Aktif</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-green-600">{dashboardData.activeCourses}</h2>
          <p className="text-gray-600">Kelas Aktif</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-purple-600">{dashboardData.totalForumPosts}</h2>
          <p className="text-gray-600">Total Post Forum</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-orange-600">{dashboardData.completionRate}</h2>
          <p className="text-gray-600">Tingkat Penyelesaian</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pengguna Terbaru</h2>
          {dashboardData.recentUsers.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.recentUsers.map(user => (
                <li key={user.id} className="border-b pb-2 last:border-b-0">
                  <p className="font-semibold">{user.name} ({user.role})</p>
                  <p className="text-gray-600 text-sm">Bergabung: {new Date(user.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada pengguna terbaru.</p>
          )}
          <Link to="/admin/users" className="block mt-4 text-blue-600 hover:underline">Lihat Semua Pengguna</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Proyek Menunggu Persetujuan</h2>
          {dashboardData.pendingProjects.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.pendingProjects.map(project => (
                <li key={project.id} className="border-b pb-2 last:border-b-0">
                  <Link to={`/admin/projects/${project.id}/moderate`} className="text-blue-600 hover:underline">
                    {project.title} (Oleh: {project.student})
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada proyek menunggu persetujuan.</p>
          )}
          <Link to="/admin/projects/moderate" className="block mt-4 text-blue-600 hover:underline">Kelola Proyek</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Testimoni Menunggu Persetujuan</h2>
        {dashboardData.pendingTestimonials.length > 0 ? (
          <ul className="space-y-2">
            {dashboardData.pendingTestimonials.map(testimonial => (
              <li key={testimonial.id} className="border-b pb-2 last:border-b-0">
                <p className="font-semibold">Dari: {testimonial.student}</p>
                <p className="text-gray-600 text-sm line-clamp-2">"{testimonial.quote}"</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Tidak ada testimoni menunggu persetujuan.</p>
        )}
        <Link to="/admin/testimonials/moderate" className="block mt-4 text-blue-600 hover:underline">Kelola Testimoni</Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Aksi Cepat Admin</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/users/manage"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-200"
          >
            Manajemen Pengguna
          </Link>
          <Link
            to="/admin/courses/manage"
            className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition duration-200"
          >
            Manajemen Kelas
          </Link>
          <Link
            to="/admin/schedules/manage"
            className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition duration-200"
          >
            Manajemen Jadwal Live
          </Link>
          <Link
            to="/admin/badges/manage"
            className="bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition duration-200"
          >
            Manajemen Badge
          </Link>
          <button
            onClick={() => alert('Simulasi ekspor laporan CSV.')}
            className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-200"
          >
            Ekspor Laporan CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
