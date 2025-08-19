import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import socket from '../../utils/socket'; // Import the socket instance

const ForumPostList = ({ courseId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Join the forum room
    socket.emit('join_forum', courseId);

    // Listen for new posts
    socket.on('forum_post_created', (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    // Listen for post likes
    socket.on('forum_post_liked', (data) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === data.postId
            ? { ...post, likes: data.isLiked ? post.likes + 1 : post.likes - 1 }
            : post
        )
      );
    });

    // In a real app, fetch posts from backend
    // For now, simulate fetching
    const fetchPosts = async () => {
      try {
        // Replace with actual API call to fetch posts for courseId
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            data: [
              { id: 1, title: 'Bagaimana cara membuat div di tengah?', user: 'Student A', comments: 5, likes: 10, createdAt: '2025-08-18T10:00:00Z', courseId: courseId },
              { id: 2, title: 'Error saat import komponen React', user: 'Student B', comments: 2, likes: 3, createdAt: '2025-08-17T15:30:00Z', courseId: courseId },
              { id: 3, title: 'Pertanyaan tentang Flexbox', user: 'Student C', comments: 8, likes: 15, createdAt: '2025-08-16T09:00:00Z', courseId: courseId },
            ]
          });
        }, 500));
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      // Leave the forum room on unmount
      socket.emit('leave_forum', courseId);
      socket.off('forum_post_created');
      socket.off('forum_post_liked');
    };
  }, [courseId]);

  if (loading) return <div className="text-center">Memuat forum...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Forum Diskusi</h2>
      <Link to={`/forum/${courseId}/new`} className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 mb-4 inline-block">Buat Post Baru</Link>
      <ul className="space-y-4 mt-4">
        {posts.map(post => (
          <li key={post.id} className="border-b pb-4">
            <Link to={`/forum/${courseId}/posts/${post.id}`} className="text-xl font-semibold text-blue-700 hover:underline">
              {post.title}
            </Link>
            <p className="text-gray-600 text-sm mt-1">Oleh: {post.user} | Komentar: {post.comments} | Likes: {post.likes} | {new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumPostList;
