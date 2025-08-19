import React, { useState, useEffect } from 'react';
import socket from '../../utils/socket'; // Import the socket instance

const ForumCommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Join the forum room
    socket.emit('join_forum', postId);

    // Listen for new comments
    socket.on('forum_comment_created', (comment) => {
      setComments((prevComments) => [...prevComments, comment]);
    });

    // In a real app, fetch comments from backend
    // For now, simulate fetching
    const fetchComments = async () => {
      try {
        // Replace with actual API call to fetch comments for postId
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            data: [
              { id: 1, user: 'Mentor X', content: 'Coba gunakan display: flex; justify-content: center; align-items: center; pada parent div.', createdAt: '2025-08-18T11:00:00Z', courseId: postId },
              { id: 2, user: 'Student D', content: 'Terima kasih, akan saya coba!', createdAt: '2025-08-18T11:15:00Z', courseId: postId },
            ]
          });
        }, 500));
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchComments();

    return () => {
      // Leave the forum room on unmount
      socket.emit('leave_forum', postId);
      socket.off('forum_comment_created');
    };
  }, [postId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(), // Temporary ID, backend will provide real ID
        user: 'Current User', // TODO: Replace with actual logged-in user
        content: newComment,
        createdAt: new Date().toISOString(),
        courseId: postId, // Include courseId for socket emission
      };
      // Emit new comment to server
      socket.emit('new_forum_comment', comment);
      setNewComment('');
      // In a real app, you'd also send this to your backend API
    }
  };

  if (loading) return <div className="text-center">Memuat komentar...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Komentar ({comments.length})</h3>
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold">{comment.user}</p>
            <p className="text-gray-700 text-sm mb-2">{new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString()}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleAddComment} className="mt-6">
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Tambahkan komentar Anda..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Kirim Komentar
        </button>
      </form>
    </div>
  );
};

export default ForumCommentList;
