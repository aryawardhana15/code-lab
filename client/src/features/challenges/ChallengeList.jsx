import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching challenges from an API
    const fetchChallenges = async () => {
      try {
        const dummyChallenges = [
          {
            id: 1,
            title: 'Build a Simple Counter',
            description: 'Create a React component with a button to increment a counter.',
            points: 50,
            level: 'Beginner',
            isActive: true,
            courseId: 1, // Example course ID
          },
          {
            id: 2,
            title: 'Responsive Navigation Bar',
            description: 'Implement a responsive navigation bar using HTML, CSS, and JavaScript.',
            points: 75,
            level: 'Intermediate',
            isActive: true,
            courseId: 2, // Example course ID
          },
          {
            id: 3,
            title: 'Todo List with Local Storage',
            description: 'Develop a JavaScript todo list application that persists data in local storage.',
            points: 100,
            level: 'Intermediate',
            isActive: false, // Completed or expired challenge
            courseId: 1,
          },
        ];
        setChallenges(dummyChallenges);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  if (loading) return <div className="text-center">Memuat tantangan...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Tantangan Coding Mingguan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{challenge.title}</h2>
            <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-blue-600 font-medium">{challenge.points} Poin</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                challenge.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {challenge.isActive ? 'Aktif' : 'Selesai'}
              </span>
            </div>
            <Link
              to={`/challenges/${challenge.id}`}
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeList;
