import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GradeSubmission = () => {
  const { submissionId } = useParams();
  const [submission, setSubmission] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    // Simulate fetching submission details from an API
    const fetchSubmissionDetails = async () => {
      try {
        const dummySubmission = {
          id: parseInt(submissionId),
          challengeTitle: 'Build a Simple Counter',
          studentName: 'Student A',
          repoUrl: 'https://github.com/studentA/counter-app',
          demoUrl: 'https://studentA.github.io/counter-app-demo',
          note: 'Saya menggunakan React Hooks untuk state management.',
          score: null,
          feedback: null,
          createdAt: '2025-08-20T10:00:00Z',
        };
        setSubmission(dummySubmission);
        setScore(dummySubmission.score || '');
        setFeedback(dummySubmission.feedback || '');
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSubmissionDetails();
  }, [submissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Menyimpan penilaian...');
    setError(null);

    if (score === '' || feedback.trim() === '') {
      setError('Skor dan feedback wajib diisi.');
      setSubmitStatus('');
      return;
    }

    try {
      // Simulate API call to update submission with score and feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Grading Submission:', { submissionId, score, feedback });
      setSubmitSubmission({ ...submission, score: parseInt(score), feedback });
      setSubmitStatus('Penilaian berhasil disimpan!');
      // In a real app, send to backend and handle response
    } catch (err) {
      setSubmitStatus(`Gagal menyimpan penilaian: ${err.message}`);
      setError(err);
    }
  };

  if (loading) return <div className="text-center">Memuat detail submission...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!submission) return <div className="text-center">Submission tidak ditemukan.</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Nilai Submission Tantangan</h1>
        <h2 className="text-2xl font-semibold mb-2">{submission.challengeTitle}</h2>
        <p className="text-gray-600 text-sm mb-4">Oleh: {submission.studentName} | Dikirim: {new Date(submission.createdAt).toLocaleString()}</p>

        <div className="mb-6">
          <p className="font-semibold">Link Repository:</p>
          <a href={submission.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{submission.repoUrl}</a>
        </div>
        {submission.demoUrl && (
          <div className="mb-6">
            <p className="font-semibold">Link Demo:</p>
            <a href={submission.demoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{submission.demoUrl}</a>
          </div>
        )}
        <div className="mb-6">
          <p className="font-semibold">Catatan Siswa:</p>
          <p className="bg-gray-100 p-3 rounded-md">{submission.note || 'Tidak ada catatan.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-2xl font-semibold mb-4">Form Penilaian</h3>
          <div className="mb-4">
            <label htmlFor="score" className="block text-gray-700 text-sm font-bold mb-2">
              Skor (0-100):
            </label>
            <input
              type="number"
              id="score"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              min="0"
              max="100"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
              Feedback Mentor:
            </label>
            <textarea
              id="feedback"
              rows="6"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-200"
            disabled={submitStatus === 'Menyimpan penilaian...'}
          >
            {submitStatus === 'Menyimpan penilaian...' ? 'Menyimpan...' : 'Simpan Penilaian'}
          </button>
          {submitStatus && submitStatus !== 'Menyimpan penilaian...' && (
            <p className={`mt-3 text-sm ${submitStatus.includes('gagal') ? 'text-red-500' : 'text-green-500'}`}>
              {submitStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default GradeSubmission;
