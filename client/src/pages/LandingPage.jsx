import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTestimonials, getProjects } from '../utils/api';

const LandingPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testimonialsData = await getTestimonials();
        setTestimonials(testimonialsData);
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to fetch data for landing page:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Belajar coding dari nol jadi bisa bikin project nyata.</h1>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">Daftar</Link>
          <Link to="/classes" className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600">Lihat Kelas</Link>
        </div>
      </section>

      {/* Testimoni Siswa */}
      <section className="testimonials py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Apa Kata Mereka?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <img src={testimonial.photo_url || "https://via.placeholder.com/100"} alt={testimonial.student_name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <p className="italic mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold">- {testimonial.student_name}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No testimonials available yet.</p>
          )}
        </div>
      </section>

      {/* Showcase Project Siswa */}
      <section className="project-showcase py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Project Nyata dari Siswa Kami</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                <img src={project.screenshot_url || "https://via.placeholder.com/300x200"} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat Demo</a>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No projects available yet.</p>
          )}
        </div>
      </section>

      {/* Highlight Kurikulum */}
      <section className="curriculum-highlight py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10">Kurikulum Unggulan Kami</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="HTML Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">HTML</h3>
            <p className="text-gray-600">Struktur dasar website.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="CSS Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">CSS</h3>
            <p className="text-gray-600">Desain dan styling website.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="JavaScript Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">JavaScript</h3>
            <p className="text-gray-600">Interaktivitas website.</p>
          </div>
        </div>
      </section>

      {/* FAQ & Kontak */}
      <section className="faq-contact py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Pertanyaan Umum & Kontak</h2>
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Bagaimana cara mendaftar?</h3>
              <p className="text-gray-600">Anda bisa mendaftar melalui tombol "Daftar" di halaman utama.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Apakah ada kelas untuk pemula?</h3>
              <p className="text-gray-600">Ya, kami memiliki kurikulum khusus untuk pemula dari nol.</p>
            </div>
            {/* More FAQs */}
          </div>
          <div className="text-center mt-10">
            <p className="text-lg">Tidak menemukan jawaban? Hubungi kami:</p>
            <p className="text-blue-600 font-semibold">email@example.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
