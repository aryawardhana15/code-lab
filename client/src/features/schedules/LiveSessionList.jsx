import React, { useState, useEffect } from 'react';

const LiveSessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching live sessions from an API
    const fetchSessions = async () => {
      try {
        const dummySessions = [
          {
            id: 1,
            title: 'Sesi Live HTML & CSS Dasar',
            course: 'Beginner Web Development',
            mentor: 'Mentor X',
            startAt: '2025-08-20T14:00:00Z',
            endAt: '2025-08-20T15:30:00Z',
            meetLink: 'https://meet.google.com/abc-defg-hij',
          },
          {
            id: 2,
            title: 'Diskusi Lanjutan JavaScript',
            course: 'Intermediate JavaScript',
            mentor: 'Mentor Y',
            startAt: '2025-08-22T10:00:00Z',
            endAt: '2025-08-22T11:00:00Z',
            meetLink: 'https://zoom.us/j/1234567890',
          },
          {
            id: 3,
            title: 'Review Project Akhir',
            course: 'Beginner Web Development',
            mentor: 'Mentor X',
            startAt: '2025-08-25T16:00:00Z',
            endAt: '2025-08-25T17:00:00Z',
            meetLink: 'https://meet.google.com/klm-nopq-rst',
          },
        ];
        setSessions(dummySessions);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) return <div className="text-center">Memuat jadwal sesi live...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Jadwal Sesi Live Mentor</h1>
      <div className="space-y-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{session.title}</h2>
            <p className="text-gray-600 text-sm mb-1">Kursus: {session.course}</p>
            <p className="text-gray-600 text-sm mb-3">Mentor: {session.mentor}</p>
            <p className="text-gray-700 mb-4">
              Waktu: {new Date(session.startAt).toLocaleString()} - {new Date(session.endAt).toLocaleTimeString()}
            </p>
            <a
              href={session.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm transition duration-200"
            >
              Gabung Sesi Live
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveSessionList;
