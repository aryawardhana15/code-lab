import React, { useState, useEffect } from 'react';

const AdminBadgeManagement = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  const [form, setForm] = useState({
    id: null,
    code: '',
    name: '',
    description: '',
    iconUrl: '',
  });

  useEffect(() => {
    // Simulate fetching all badges for admin
    const fetchBadges = async () => {
      try {
        const dummyBadges = [
          { id: 1, code: 'FIRST_COURSE_COMPLETED', name: 'Penyelesaian Kursus Pertama', description: 'Diberikan saat menyelesaikan kursus pertama.', iconUrl: 'https://via.placeholder.com/50?text=B1' },
          { id: 2, code: 'FIRST_CHALLENGE_WIN', name: 'Juara Tantangan Pertama', description: 'Diberikan saat memenangkan tantangan coding pertama.', iconUrl: 'https://via.placeholder.com/50?text=B2' },
        ];
        setBadges(dummyBadges);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddBadge = () => {
    setCurrentBadge(null);
    setForm({
      id: null,
      code: '',
      name: '',
      description: '',
      iconUrl: '',
    });
    setShowModal(true);
  };

  const handleEditBadge = (badge) => {
    setCurrentBadge(badge);
    setForm({
      id: badge.id,
      code: badge.code,
      name: badge.name,
      description: badge.description,
      iconUrl: badge.iconUrl,
    });
    setShowModal(true);
  };

  const handleDeleteBadge = async (badgeId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus badge ini?')) {
      try {
        // Simulate API call to delete badge
        await new Promise(resolve => setTimeout(resolve, 500));
        setBadges(badges.filter(badge => badge.id !== badgeId));
        alert('Badge berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus badge: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Simulate API call to update badge
        await new Promise(resolve => setTimeout(resolve, 500));
        setBadges(badges.map(badge => (badge.id === form.id ? { ...form } : badge)));
        alert('Badge berhasil diperbarui!');
      } else {
        // Simulate API call to create badge
        await new Promise(resolve => setTimeout(resolve, 500));
        const newBadge = { ...form, id: Date.now() }; // Assign a temporary ID
        setBadges([...badges, newBadge]);
        alert('Badge berhasil ditambahkan!');
      }
      setShowModal(false);
    } catch (err) {
      alert(`Gagal menyimpan badge: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center">Memuat manajemen badge...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Badge (Admin)</h1>

      <button
        onClick={handleAddBadge}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mb-6"
      >
        Tambah Badge Baru
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Semua Badge</h2>
        {badges.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Kode</th>
                  <th className="py-2 px-4 border-b text-left">Nama</th>
                  <th className="py-2 px-4 border-b text-left">Deskripsi</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {badges.map(badge => (
                  <tr key={badge.id}>
                    <td className="py-2 px-4 border-b">{badge.code}</td>
                    <td className="py-2 px-4 border-b">{badge.name}</td>
                    <td className="py-2 px-4 border-b">{badge.description}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditBadge(badge)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBadge(badge.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada badge.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentBadge ? 'Edit Badge' : 'Tambah Badge Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
                  Kode Badge:
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nama Badge:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Deskripsi:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="iconUrl" className="block text-gray-700 text-sm font-bold mb-2">
                  URL Ikon:
                </label>
                <input
                  type="url"
                  id="iconUrl"
                  name="iconUrl"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.iconUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBadgeManagement;
