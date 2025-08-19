import React from 'react';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  // Dummy data for enrolled courses
  const enrolledCourses = [
    { id: 1, title: 'Dasar HTML & CSS', progress: 75, lastModule: 'Styling dengan CSS' },
    { id: 2, title: 'JavaScript Interaktif', progress: 40, lastModule: 'Pengenalan DOM' },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Kelas Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">Progress: {course.progress}%</p>
              <p className="text-gray-600 text-sm mb-4">Terakhir di: {course.lastModule}</p>
              <div className="flex flex-col space-y-2">
                <Link to={`/modules/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-full text-center hover:bg-blue-700">Lanjut Modul Terakhir</Link>
                <Link to={`/forum/${course.id}`} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-center hover:bg-gray-300">Buka Forum</Link>
                <Link to={`/schedules/${course.id}`} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-center hover:bg-gray-300">Lihat Jadwal Live</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
