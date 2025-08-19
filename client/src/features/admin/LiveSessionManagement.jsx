import React, { useState, useEffect } from 'react';

const AdminLiveSessionManagement = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [form, setForm] = useState({
    id: null,
    title: '',
    courseId: '',
    mentorId: '',
    startAt: '',
    endAt: '',
    meetLink: '',
  });
  const [courses, setCourses] = useState([]); // To fetch and display available courses
  const [mentors, setMentors] = useState([]); // To fetch and display available mentors

  useEffect(() => {
    // Simulate fetching all live sessions for admin
    const fetchSessions = async () => {
      try {
        const dummySessions = [
          {
            id: 1,
            title: 'Sesi Live HTML & CSS Dasar',
            courseId: 1,
            courseName: 'Beginner Web Development',
            mentorId: 2,
            mentorName: 'Mentor B',
            startAt: '2025-08-20T14:00:00Z',
            endAt: '2025-08-20T15:30:00Z',
            meetLink: 'https://meet.google.com/abc-defg-hij',
          },
          {
            id: 2,
            title: 'Diskusi Lanjutan JavaScript',
            courseId: 2,
            courseName: 'Intermediate JavaScript',
            mentorId: 2,
            mentorName: 'Mentor B',
            startAt: '2025-08-22T10:00:00Z',
            endAt: '2025-08-22T11:00:00Z',
            meetLink: 'https://zoom.us/j/1234567890',
          },
        ];
        setSessions(dummySessions);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Simulate fetching courses and mentors
    const fetchCoursesAndMentors = async () => {
      try {
        const dummyCourses = [
          { id: 1, title: 'Beginner Web Development' },
          { id: 2, title: 'Intermediate JavaScript' },
        ];
        setCourses(dummyCourses);

        const dummyMentors = [
          { id: 2, name: 'Mentor B' },
          { id: 4, name: 'Mentor D' },
        ];
        setMentors(dummyMentors);
      } catch (err) {
        console.error('Failed to fetch courses or mentors:', err);
      }
    };

    fetchSessions();
    fetchCoursesAndMentors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddSession = () => {
    setCurrentSession(null);
    setForm({
      id: null,
      title: '',
      courseId: '',
      mentorId: '',
      startAt: '',
      endAt: '',
      meetLink: '',
    });
    setShowModal(true);
  };

  const handleEditSession = (session) => {
    setCurrentSession(session);
    setForm({
      id: session.id,
      title: session.title,
      courseId: session.courseId,
      mentorId: session.mentorId,
      startAt: session.startAt.slice(0, 16), // Format for datetime-local input
      endAt: session.endAt.slice(0, 16),     // Format for datetime-local input
      meetLink: session.meetLink,
    });
    setShowModal(true);
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus sesi live ini?')) {
      try {
        // Simulate API call to delete session
        await new Promise(resolve => setTimeout(resolve, 500));
        setSessions(sessions.filter(session => session.id !== sessionId));
        alert('Sesi live berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus sesi live: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sessionData = {
        ...form,
        courseId: parseInt(form.courseId),
        mentorId: parseInt(form.mentorId),
        startAt: new Date(form.startAt).toISOString(),
        endAt: new Date(form.endAt).toISOString(),
      };

      if (sessionData.id) {
        // Simulate API call to update session
        await new Promise(resolve => setTimeout(resolve, 500));
        setSessions(sessions.map(session => (session.id === sessionData.id ? {
          ...sessionData,
          courseName: courses.find(c => c.id === sessionData.courseId)?.title || '',
          mentorName: mentors.find(m => m.id === sessionData.mentorId)?.name || '',
        } : session)));
        alert('Sesi live berhasil diperbarui!');
      } else {
        // Simulate API call to create session
        await new Promise(resolve => setTimeout(resolve, 500));
        const newSession = {
          ...sessionData,
          id: Date.now(), // Assign a temporary ID
          courseName: courses.find(c => c.id === sessionData.courseId)?.title || '',
          mentorName: mentors.find(m => m.id === sessionData.mentorId)?.name || '',
        };
        setSessions([...sessions, newSession]);
        alert('Sesi live berhasil ditambahkan!');
      }
      setShowModal(false);
    } catch (err) {
      alert(`Gagal menyimpan sesi live: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center">Memuat manajemen sesi live...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Jadwal Live (Admin)</h1>

      <button
        onClick={handleAddSession}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mb-6"
      >
        Tambah Sesi Live Baru
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Semua Sesi Live</h2>
        {sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Judul</th>
                  <th className="py-2 px-4 border-b text-left">Kursus</th>
                  <th className="py-2 px-4 border-b text-left">Mentor</th>
                  <th className="py-2 px-4 border-b text-left">Waktu Mulai</th>
                  <th className="py-2 px-4 border-b text-left">Waktu Selesai</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(session => (
                  <tr key={session.id}>
                    <td className="py-2 px-4 border-b">{session.title}</td>
                    <td className="py-2 px-4 border-b">{session.courseName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{session.mentorName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b">{new Date(session.startAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(session.endAt).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditSession(session)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSession(session.id)}
                        className="text-red-600 hover:underline"
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
          <p className="text-gray-500">Tidak ada sesi live.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentSession ? 'Edit Sesi Live' : 'Tambah Sesi Live Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Sesi:
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
                <label htmlFor="courseId" className="block text-gray-700 text-sm font-bold mb-2">
                  Kursus:
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.courseId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Pilih Kursus</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
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
                  required
                >
                  <option value="">Pilih Mentor</option>
                  {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>{mentor.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="startAt" className="block text-gray-700 text-sm font-bold mb-2">
                  Waktu Mulai:
                </label>
                <input
                  type="datetime-local"
                  id="startAt"
                  name="startAt"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.startAt}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="endAt" className="block text-gray-700 text-sm font-bold mb-2">
                  Waktu Selesai:
                </label>
                <input
                  type="datetime-local"
                  id="endAt"
                  name="endAt"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.endAt}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="meetLink" className="block text-gray-700 text-sm font-bold mb-2">
                  Link Meet:
                </label>
                <input
                  type="url"
                  id="meetLink"
                  name="meetLink"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.meetLink}
                  onChange={handleInputChange}
                  required
                />
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

export default AdminLiveSessionManagement;
