import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [form, setForm] = useState({
    id: null,
    title: '',
    description: '',
    level: 'Beginner',
    mentorId: '', // Admin can assign mentor
    isPublished: false,
  });
  const [mentors, setMentors] = useState([]); // To fetch and display available mentors

  useEffect(() => {
    // Simulate fetching all courses for admin
    const fetchCourses = async () => {
      try {
        const dummyCourses = [
          { id: 1, title: 'Beginner Web Development', description: 'Dasar-dasar HTML, CSS, JavaScript.', level: 'Beginner', mentorId: 2, mentorName: 'Mentor B', isPublished: true },
          { id: 2, title: 'Intermediate JavaScript', description: 'Konsep lanjutan JavaScript dan React.', level: 'Intermediate', mentorId: 2, mentorName: 'Mentor B', isPublished: false },
          { id: 3, title: 'Advanced Python', description: 'Deep dive into Python frameworks.', level: 'Advanced', mentorId: 4, mentorName: 'Mentor D', isPublished: true },
        ];
        setCourses(dummyCourses);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Simulate fetching mentors
    const fetchMentors = async () => {
      try {
        const dummyMentors = [
          { id: 2, name: 'Mentor B' },
          { id: 4, name: 'Mentor D' },
        ];
        setMentors(dummyMentors);
      } catch (err) {
        console.error('Failed to fetch mentors:', err);
      }
    };

    fetchCourses();
    fetchMentors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAddCourse = () => {
    setCurrentCourse(null);
    setForm({
      id: null,
      title: '',
      description: '',
      level: 'Beginner',
      mentorId: '',
      isPublished: false,
    });
    setShowModal(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setForm({
      id: course.id,
      title: course.title,
      description: course.description,
      level: course.level,
      mentorId: course.mentorId || '',
      isPublished: course.isPublished,
    });
    setShowModal(true);
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kursus ini?')) {
      try {
        // Simulate API call to delete course
        await new Promise(resolve => setTimeout(resolve, 500));
        setCourses(courses.filter(course => course.id !== courseId));
        alert('Kursus berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus kursus: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Simulate API call to update course
        await new Promise(resolve => setTimeout(resolve, 500));
        setCourses(courses.map(course => (course.id === form.id ? { ...form, mentorName: mentors.find(m => m.id === parseInt(form.mentorId))?.name || '' } : course)));
        alert('Kursus berhasil diperbarui!');
      } else {
        // Simulate API call to create course
        await new Promise(resolve => setTimeout(resolve, 500));
        const newCourse = { ...form, id: Date.now(), mentorName: mentors.find(m => m.id === parseInt(form.mentorId))?.name || '' }; // Assign a temporary ID
        setCourses([...courses, newCourse]);
        alert('Kursus berhasil ditambahkan!');
      }
      setShowModal(false);
    } catch (err) {
      alert(`Gagal menyimpan kursus: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center">Memuat manajemen kursus...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Kelas (Admin)</h1>

      <button
        onClick={handleAddCourse}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mb-6"
      >
        Tambah Kelas Baru
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Semua Kelas</h2>
        {courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Judul</th>
                  <th className="py-2 px-4 border-b text-left">Level</th>
                  <th className="py-2 px-4 border-b text-left">Mentor</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td className="py-2 px-4 border-b">{course.title}</td>
                    <td className="py-2 px-4 border-b">{course.level}</td>
                    <td className="py-2 px-4 border-b">{course.mentorName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        course.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                      <Link
                        to={`/admin/courses/${course.id}/materials`}
                        className="text-purple-600 hover:underline ml-3"
                      >
                        Kelola Materi
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada kelas.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentCourse ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Kelas:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="level" className="block text-gray-700 text-sm font-bold mb-2">
                  Level:
                </label>
                <select
                  id="level"
                  name="level"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.level}
                  onChange={handleInputChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label htmlFor="mentorId" className="block text-gray-700 text-sm font-bold mb-2">
                  Mentor:
                </label>
                <select
                  id="mentorId"
                  name="mentorId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.mentorId}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Mentor</option>
                  {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  name="isPublished"
                  className="mr-2 leading-tight"
                  checked={form.isPublished}
                  onChange={handleInputChange}
                />
                <label htmlFor="isPublished" className="text-sm text-gray-700">
                  Publikasikan Kelas
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourseManagement;
