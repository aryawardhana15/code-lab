import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ForumCommentList from './ForumCommentList';
import LikeButton from './LikeButton';
import socket from '../../utils/socket'; // Import the socket instance

const ForumPostDetail = () => {
  const { courseId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Join the forum room for the specific course
    socket.emit('join_forum', courseId);

    // Listen for post updates (e.g., new posts, or likes on posts)
    socket.on('forum_post_created', (newPost) => {
      // If this is the post we are currently viewing, update it
      if (newPost.id === parseInt(postId)) {
        setPost(newPost);
      }
    });

    socket.on('forum_post_liked', (data) => {
      if (data.postId === parseInt(postId)) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: data.newLikesCount,
        }));
      }
    });

    // In a real app, fetch the specific forum post from backend
    // For now, simulate fetching
    const fetchPost = async () => {
      try {
        // Replace with actual API call to fetch post details for postId
        const response = await new Promise(resolve => setTimeout(() => {
          resolve({
            data: {
              id: parseInt(postId),
              title: 'Bagaimana cara membuat div di tengah?',
              user: 'Student A',
              content: 'Saya kesulitan menempatkan div di tengah halaman. Ada yang bisa bantu?',
              likes: 10, // Initial likes
              createdAt: '2025-08-18T10:00:00Z',
              courseId: courseId,
            }
          });
        }, 500));
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPost();

    return () => {
      // Leave the forum room on unmount
      socket.emit('leave_forum', courseId);
      socket.off('forum_post_created');
      socket.off('forum_post_liked');
    };
  }, [courseId, postId]);

  if (loading) return <div className="text-center">Memuat post...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!post) return <div className="text-center">Post tidak ditemukan.</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-sm mb-4">Oleh: {post.user} | {new Date(post.createdAt).toLocaleDateString()}</p>
        <div className="prose max-w-none mb-6">
          <p>{post.content}</p>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <LikeButton postId={post.id} initialLikes={post.likes} />
          <span className="text-gray-600">{post.likes} Likes</span>
        </div>

        <ForumCommentList postId={post.id} />
      </div>
    </div>
  );
};

export default ForumPostDetail;
