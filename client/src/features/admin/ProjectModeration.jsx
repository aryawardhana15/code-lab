import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminProjectModeration = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching all projects for admin moderation
    const fetchProjectsForModeration = async () => {
      try {
        const dummyProjects = [
          {
            id: 1,
            title: 'Personal Portfolio Website',
            student: 'Student A',
            screenshot_url: 'https://via.placeholder.com/300x200?text=Portfolio+Website',
            demo_url: 'https://example.com/portfolio-demo',
            description: 'A responsive personal portfolio website built with React and Tailwind CSS.',
            is_published: false, // Pending approval
            createdAt: '2025-07-10T10:00:00Z',
          },
          {
            id: 2,
            title: 'E-commerce Product Page',
            student: 'Student B',
            screenshot_url: 'https://via.placeholder.com/300x200?text=E-commerce+Page',
            demo_url: 'https://example.com/ecommerce-demo',
            description: 'A dynamic product page for an e-commerce store, featuring product details and add-to-cart functionality.',
            is_published: true, // Already published
            createdAt: '2025-07-15T14:30:00Z',
          },
          {
            id: 3,
            title: 'Simple Calculator App',
            student: 'Student C',
            screenshot_url: 'https://via.placeholder.com/300x200?text=Calculator+App',
            demo_url: 'https://example.com/calculator-demo',
            description: 'A basic calculator application implemented with vanilla JavaScript, HTML, and CSS.',
            is_published: false, // Pending approval
            createdAt: '2025-07-20T09:15:00Z',
          },
        ];
        setProjects(dummyProjects);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProjectsForModeration();
  }, []);

  const handleApproveProject = async (projectId) => {
    if (window.confirm('Apakah Anda yakin ingin menyetujui proyek ini?')) {
      try {
        // Simulate API call to approve project
        await new Promise(resolve => setTimeout(resolve, 500));
        setProjects(projects.map(p => (p.id === projectId ? { ...p, is_published: true } : p)));
        alert('Proyek berhasil disetujui dan dipublikasikan!');
      } catch (err) {
        alert(`Gagal menyetujui proyek: ${err.message}`);
      }
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      try {
        // Simulate API call to delete project
        await new Promise(resolve => setTimeout(resolve, 500));
        setProjects(projects.filter(p => p.id !== projectId));
        alert('Proyek berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus proyek: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center">Memuat proyek untuk moderasi...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Moderasi Project Showcase (Admin)</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Proyek untuk Moderasi</h2>
        {projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Judul Proyek</th>
                  <th className="py-2 px-4 border-b text-left">Siswa</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                        {project.title}
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">{project.student}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        project.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.is_published ? 'Published' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {!project.is_published && (
                        <button
                          onClick={() => handleApproveProject(project.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                        >
                          Setujui
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada proyek menunggu moderasi.</p>
        )}
      </div>
    </div>
  );
};

export default AdminProjectModeration;
