import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching project details from an API
    const fetchProjectDetails = async () => {
      try {
        const dummyProject = {
          id: parseInt(projectId),
          title: 'Personal Portfolio Website',
          student: 'Student A',
          screenshot_url: 'https://via.placeholder.com/600x400?text=Portfolio+Website',
          demo_url: 'https://example.com/portfolio-demo',
          description: 'Ini adalah proyek portofolio pribadi yang saya bangun menggunakan React dan Tailwind CSS. Proyek ini menampilkan berbagai pekerjaan saya, keahlian, dan informasi kontak. Saya fokus pada desain responsif dan pengalaman pengguna yang intuitif.',
          is_published: true,
          createdAt: '2025-07-10T10:00:00Z',
        };
        setProject(dummyProject);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <div className="text-center">Memuat detail proyek...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!project) return <div className="text-center">Proyek tidak ditemukan.</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 text-sm mb-4">Oleh: {project.student} | {new Date(project.createdAt).toLocaleDateString()}</p>
        <img src={project.screenshot_url} alt={project.title} className="w-full h-96 object-cover rounded-md mb-6" />
        <div className="prose max-w-none mb-6">
          <p>{project.description}</p>
        </div>
        {project.demo_url && (
          <a
            href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
          >
            Lihat Demo Proyek
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
