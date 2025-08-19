import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChallengeDetail = () => {
  const { challengeId } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Simulate fetching challenge details from an API
    const fetchChallengeDetails = async () => {
      try {
        const dummyChallenge = {
          id: parseInt(challengeId),
          title: 'Build a Simple Counter',
          description: 'Create a React component with a button to increment a counter. Your solution should be a single HTML file with embedded CSS and JavaScript, or a link to a GitHub repository.',
          points: 50,
          level: 'Beginner',
          startAt: '2025-08-01T00:00:00Z',
          endAt: '2025-08-31T23:59:59Z',
          isActive: true,
          courseId: 1,
          mentorFeedback: null,
          score: null,
        };
        setChallenge(dummyChallenge);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [challengeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    try {
      // Simulate API call for submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submission:', { challengeId, submissionLink, note });
      setSubmitStatus('Submission berhasil!');
      // In a real app, send to backend and handle response
      // Clear form after successful submission
      setSubmissionLink('');
      setNote('');
    } catch (err) {
      setSubmitStatus(`Submission gagal: ${err.message}`);
      setError(err);
    }
  };

  if (loading) return <div className="text-center">Memuat detail tantangan...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!challenge) return <div className="text-center">Tantangan tidak ditemukan.</div>;

  const isActive = new Date() >= new Date(challenge.startAt) && new Date() <= new Date(challenge.endAt);

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{challenge.title}</h1>
        <p className="text-gray-600 text-sm mb-2">Level: {challenge.level} | Poin: {challenge.points}</p>
        <p className="text-gray-600 text-sm mb-4">
          Periode: {new Date(challenge.startAt).toLocaleDateString()} - {new Date(challenge.endAt).toLocaleDateString()}
        </p>
        <div className="prose max-w-none mb-6">
          <p>{challenge.description}</p>
        </div>

        {!isActive && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
            <p className="font-bold">Tantangan {new Date() < new Date(challenge.startAt) ? 'belum dimulai' : 'telah berakhir'}.</p>
          </div>
        )}

        {challenge.mentorFeedback && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
            <p className="font-bold">Feedback Mentor:</p>
            <p>{challenge.mentorFeedback}</p>
            <p className="mt-2">Skor Anda: {challenge.score} / {challenge.points}</p>
          </div>
        )}

        {isActive && (
          <form onSubmit={handleSubmit} className="mt-6 p-6 border rounded-lg bg-gray-50">
            <h3 className="text-2xl font-semibold mb-4">Kirim Solusi Anda</h3>
            <div className="mb-4">
              <label htmlFor="submissionLink" className="block text-gray-700 text-sm font-bold mb-2">
                Link Repository / Demo (GitHub, CodePen, dll.):
              </label>
              <input
                type="url"
                id="submissionLink"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://github.com/your-user/your-project"
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="note" className="block text-gray-700 text-sm font-bold mb-2">
                Catatan Tambahan (opsional):
              </label>
              <textarea
                id="note"
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Jelaskan solusi Anda atau hal-hal penting lainnya."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-200"
              disabled={submitStatus === 'Submitting...'}
            >
              {submitStatus === 'Submitting...' ? 'Mengirim...' : 'Kirim Solusi'}
            </button>
            {submitStatus && submitStatus !== 'Submitting...' && (
              <p className={`mt-3 text-sm ${submitStatus.includes('gagal') ? 'text-red-500' : 'text-green-500'}`}>
                {submitStatus}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetail;
