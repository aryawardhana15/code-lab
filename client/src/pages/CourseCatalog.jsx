import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Level: {course.level}</p>
        <p className="text-gray-600 text-sm mb-2">Mentor: {course.mentor}</p>
        <p className="text-gray-600 text-sm mb-4">Modul: {course.modules} | Rating: {course.rating} ({course.testimonials})</p>
        <Link to={`/classes/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Detail</Link>
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  // Dummy data for courses
  const courses = [
    { id: 1, title: 'Dasar HTML & CSS', level: 'Beginner', mentor: 'Budi', modules: 10, rating: 4.8, testimonials: 120 },
    { id: 2, title: 'JavaScript Interaktif', level: 'Intermediate', mentor: 'Siti', modules: 15, rating: 4.5, testimonials: 90 },
    { id: 3, title: 'React.js untuk Pemula', level: 'Beginner', mentor: 'Joko', modules: 12, rating: 4.9, testimonials: 150 },
  ];

  const [filterLevel, setFilterLevel] = React.useState('All');
  const [filterStatus, setFilterStatus] = React.useState('All');

  const filteredCourses = courses.filter(course => {
    const levelMatch = filterLevel === 'All' || course.level === filterLevel;
    // For status, we'll need actual data from backend later. For now, assume all are 'berjalan'
    const statusMatch = filterStatus === 'All' || filterStatus === 'berjalan'; // Placeholder
    return levelMatch && statusMatch;
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">Daftar Kelas Coding</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <select
          className="p-2 border rounded-md"
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="All">Semua Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select
          className="p-2 border rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">Semua Status</option>
          <option value="berjalan">Berjalan</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
