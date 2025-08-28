import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Not used, remove for cleanliness
// import { getLeaderboard } from '../../utils/api'; // Uncomment if you have a real API

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // TODO: Replace with actual API call to fetch leaderboard data
        // const data = await getLeaderboard();
        // setLeaderboardData(data);
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            data: [
              { id: 1, user: 'Student A', totalPoints: 1500, rank: 1 },
              { id: 2, user: 'Student B', totalPoints: 1200, rank: 2 },
              { id: 3, user: 'Student C', totalPoints: 1000, rank: 3 },
              { id: 4, user: 'Student D', totalPoints: 950, rank: 4 },
              { id: 5, user: 'Student E', totalPoints: 800, rank: 5 },
            ]
          });
        }, 500));
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data.');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="text-center">Memuat Leaderboard...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Rank</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">User</th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b border-gray-200">{entry.rank}</td>
              <td className="py-2 px-4 border-b border-gray-200">{entry.user}</td>
              <td className="py-2 px-4 border-b border-gray-200">{entry.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
