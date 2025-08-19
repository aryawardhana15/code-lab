import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardMentor = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching mentor dashboard data from an API
    const fetchDashboardData = async () => {
      try {
        const dummyData = {
          mentorName: 'Mentor X',
          taughtCourses: [
            { id: 1, title: 'Beginner Web Development', students: 25, progressSummary: '70% completed' },
            { id: 2, title: 'Intermediate JavaScript', students: 18, progressSummary: '60% completed' },
          ],
          pendingChallenges: [
            { id: 101, title: 'Review Counter App', student: 'Student A', course: 'Beginner Web Development' },
            { id: 102, title: 'Grade Responsive Navbar', student: 'Student B', course: 'Intermediate JavaScript' },
          ],
          forumActivity: [
            { id: 201, title: 'Bagaimana cara membuat div di tengah?', course: 'Beginner Web Development', newComments: 3 },
            { id: 202, title: 'Pertanyaan tentang Async/Await', course: 'Intermediate JavaScript', newComments: 1 },
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

  if (loading) return <div className="text-center">Memuat dashboard mentor...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!dashboardData) return <div className="text-center">Tidak ada data dashboard.</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard Mentor: {dashboardData.mentorName}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Kelas yang Diajar</h2>
          {dashboardData.taughtCourses.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.taughtCourses.map(course => (
                <li key={course.id} className="border-b pb-2 last:border-b-0">
                  <Link to={`/mentor/courses/${course.id}`} className="text-blue-600 hover:underline">
                    {course.title}
                  </Link>
                  <p className="text-gray-600 text-sm">Siswa: {course.students} | Progress: {course.progressSummary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Belum ada kelas yang diajar.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tantangan Menunggu Penilaian</h2>
          {dashboardData.pendingChallenges.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.pendingChallenges.map(challenge => (
                <li key={challenge.id} className="border-b pb-2 last:border-b-0">
                  <Link to={`/mentor/challenges/${challenge.id}/grade`} className="text-blue-600 hover:underline">
                    {challenge.title} ({challenge.student})
                  </Link>
                  <p className="text-gray-600 text-sm">Kursus: {challenge.course}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada tantangan menunggu penilaian.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Forum Terbaru</h2>
          {dashboardData.forumActivity.length > 0 ? (
            <ul className="space-y-2">
              {dashboardData.forumActivity.map(activity => (
                <li key={activity.id} className="border-b pb-2 last:border-b-0">
                  <Link to={`/forum/posts/${activity.id}`} className="text-blue-600 hover:underline">
                    {activity.title}
                  </Link>
                  <p className="text-gray-600 text-sm">Kursus: {activity.course} | Komentar Baru: {activity.newComments}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada aktivitas forum terbaru.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Aksi Cepat</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/mentor/courses/manage"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-200"
          >
            Kelola Materi Kursus
          </Link>
          <Link
            to="/mentor/challenges/grade"
            className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-200"
          >
            Nilai Submission Tantangan
          </Link>
          <Link
            to="/mentor/forum/moderate"
            className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition duration-200"
          >
            Moderasi Forum
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardMentor;
