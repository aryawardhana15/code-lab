import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ForumModeration = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching forum posts for moderation (e.g., posts in mentor's courses)
    const fetchPostsForModeration = async () => {
      try {
        const dummyPosts = [
          {
            id: 1,
            title: 'Bagaimana cara membuat div di tengah?',
            user: 'Student A',
            course: 'Beginner Web Development',
            content: 'Saya kesulitan menempatkan div di tengah halaman. Ada yang bisa bantu?',
            status: 'pending', // or 'approved', 'rejected'
            createdAt: '2025-08-18T10:00:00Z',
          },
          {
            id: 2,
            title: 'Pertanyaan tentang Async/Await',
            user: 'Student B',
            course: 'Intermediate JavaScript',
            content: 'Saya tidak mengerti konsep async/await. Bisakah ada yang menjelaskan dengan contoh sederhana?',
            status: 'approved',
            createdAt: '2025-08-19T11:00:00Z',
          },
          {
            id: 3,
            title: 'Error saat install Node.js',
            user: 'Student C',
            course: 'Beginner Web Development',
            content: 'Saya mendapatkan error saat mencoba menginstal Node.js di Windows. Ada yang tahu solusinya?',
            status: 'pending',
            createdAt: '2025-08-20T09:00:00Z',
          },
        ];
        setPosts(dummyPosts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPostsForModeration();
  }, []);

  const handleApprovePost = async (postId) => {
    if (window.confirm('Apakah Anda yakin ingin menyetujui post ini?')) {
      try {
        // Simulate API call to approve post
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(posts.map(post => (post.id === postId ? { ...post, status: 'approved' } : post)));
        alert('Post berhasil disetujui!');
      } catch (err) {
        alert(`Gagal menyetujui post: ${err.message}`);
      }
    }
  };

  const handleRejectPost = async (postId) => {
    if (window.confirm('Apakah Anda yakin ingin menolak post ini? Ini akan menghapusnya.')) {
      try {
        // Simulate API call to reject/delete post
        await new Promise(resolve => setTimeout(resolve, 500));
        setPosts(posts.filter(post => post.id !== postId));
        alert('Post berhasil ditolak/dihapus!');
      } catch (err) {
        alert(`Gagal menolak/menghapus post: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center">Memuat post forum untuk moderasi...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Moderasi Forum Kelas</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Post untuk Moderasi</h2>
        {posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Judul Post</th>
                  <th className="py-2 px-4 border-b text-left">Pengguna</th>
                  <th className="py-2 px-4 border-b text-left">Kursus</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td className="py-2 px-4 border-b">
                      <Link to={`/forum/posts/${post.id}`} className="text-blue-600 hover:underline">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b">{post.user}</td>
                    <td className="py-2 px-4 border-b">{post.course}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.status === 'approved' ? 'Disetujui' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {post.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprovePost(post.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                          >
                            Setujui
                          </button>
                          <button
                            onClick={() => handleRejectPost(post.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                          >
                            Tolak
                          </button>
                        </>
                      )}
                      {post.status === 'approved' && (
                        <button
                          onClick={() => handleRejectPost(post.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada post forum untuk dimoderasi.</p>
        )}
      </div>
    </div>
  );
};

export default ForumModeration;
