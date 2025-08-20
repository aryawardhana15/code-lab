import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../utils/api';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-2">Level: {course.level}</p>
        <p className="text-gray-600 text-sm mb-2">Mentor: {course.mentor_name || 'N/A'}</p>
        <p className="text-gray-600 text-sm mb-4">Modul: {course.module_count || 0} | Rating: {course.average_rating || 'N/A'} ({course.testimonial_count || 0})</p>
        <Link to={`/classes/${course.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Detail</Link>
      </div>
    </div>
  );
};

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filterLevel !== 'All') {
          params.level = filterLevel;
        }
        if (filterStatus !== 'All') {
          params.status = filterStatus; // Assuming backend supports 'berjalan' or 'selesai'
        }
        const data = await getCourses(params);
        setCourses(data);
      } catch (err) {
        setError('Failed to fetch courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [filterLevel, filterStatus]);

  if (loading) {
    return <div className="container mx-auto py-10 text-center">Loading courses...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

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
        {courses.length > 0 ? (
          courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No courses available yet.</p>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
