import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching published projects from an API
    const fetchProjects = async () => {
      try {
        const dummyProjects = [
          {
            id: 1,
            title: 'Personal Portfolio Website',
            student: 'Student A',
            screenshot_url: 'https://via.placeholder.com/300x200?text=Portfolio+Website',
            demo_url: 'https://example.com/portfolio-demo',
            description: 'A responsive personal portfolio website built with React and Tailwind CSS.',
            is_published: true,
            createdAt: '2025-07-10T10:00:00Z',
          },
          {
            id: 2,
            title: 'E-commerce Product Page',
            student: 'Student B',
            screenshot_url: 'https://via.placeholder.com/300x200?text=E-commerce+Page',
            demo_url: 'https://example.com/ecommerce-demo',
            description: 'A dynamic product page for an e-commerce store, featuring product details and add-to-cart functionality.',
            is_published: true,
            createdAt: '2025-07-15T14:30:00Z',
          },
          {
            id: 3,
            title: 'Simple Calculator App',
            student: 'Student C',
            screenshot_url: 'https://via.placeholder.com/300x200?text=Calculator+App',
            demo_url: 'https://example.com/calculator-demo',
            description: 'A basic calculator application implemented with vanilla JavaScript, HTML, and CSS.',
            is_published: true,
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

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center">Memuat proyek...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Project Showcase Siswa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={project.screenshot_url} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 text-sm mb-3">Oleh: {project.student}</p>
            <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
            <div className="flex justify-between items-center">
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Lihat Detail
              </Link>
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition duration-200"
                >
                  Lihat Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
