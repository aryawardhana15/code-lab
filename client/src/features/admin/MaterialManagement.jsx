import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const AdminMaterialManagement = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [form, setForm] = useState({
    id: null,
    title: '',
    content: '',
    type: 'text',
    order_index: 0,
  });

  useEffect(() => {
    // Simulate fetching materials for a specific course (admin view)
    const fetchMaterials = async () => {
      try {
        const dummyMaterials = [
          { id: 1, course_id: parseInt(courseId), title: 'Pengenalan HTML', content: 'Isi materi HTML...', type: 'text', order_index: 1 },
          { id: 2, course_id: parseInt(courseId), title: 'Dasar-dasar CSS', content: 'Isi materi CSS...', type: 'text', order_index: 2 },
          { id: 3, course_id: parseInt(courseId), title: 'Quiz HTML Dasar', content: 'Pertanyaan quiz...', type: 'quiz', order_index: 3 },
        ];
        setMaterials(dummyMaterials.filter(m => m.course_id === parseInt(courseId)));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [courseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddMaterial = () => {
    setCurrentMaterial(null);
    setForm({
      id: null,
      title: '',
      content: '',
      type: 'text',
      order_index: materials.length > 0 ? Math.max(...materials.map(m => m.order_index)) + 1 : 1,
    });
    setShowModal(true);
  };

  const handleEditMaterial = (material) => {
    setCurrentMaterial(material);
    setForm({
      id: material.id,
      title: material.title,
      content: material.content,
      type: material.type,
      order_index: material.order_index,
    });
    setShowModal(true);
  };

  const handleDeleteMaterial = async (materialId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus materi ini?')) {
      try {
        // Simulate API call to delete material
        await new Promise(resolve => setTimeout(resolve, 500));
        setMaterials(materials.filter(material => material.id !== materialId));
        alert('Materi berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus materi: ${err.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Simulate API call to update material
        await new Promise(resolve => setTimeout(resolve, 500));
        setMaterials(materials.map(material => (material.id === form.id ? { ...form, course_id: parseInt(courseId) } : material)));
        alert('Materi berhasil diperbarui!');
      } else {
        // Simulate API call to create material
        await new Promise(resolve => setTimeout(resolve, 500));
        const newMaterial = { ...form, id: Date.now(), course_id: parseInt(courseId) }; // Assign a temporary ID
        setMaterials([...materials, newMaterial]);
        alert('Materi berhasil ditambahkan!');
      }
      setShowModal(false);
    } catch (err) {
      alert(`Gagal menyimpan materi: ${err.message}`);
    }
  };

  if (loading) return <div className="text-center">Memuat materi...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Materi Kursus (Admin) (ID: {courseId})</h1>

      <button
        onClick={handleAddMaterial}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 mb-6"
      >
        Tambah Materi Baru
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Materi</h2>
        {materials.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Judul</th>
                  <th className="py-2 px-4 border-b text-left">Tipe</th>
                  <th className="py-2 px-4 border-b text-left">Urutan</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {materials.sort((a, b) => a.order_index - b.order_index).map(material => (
                  <tr key={material.id}>
                    <td className="py-2 px-4 border-b">{material.title}</td>
                    <td className="py-2 px-4 border-b">{material.type}</td>
                    <td className="py-2 px-4 border-b">{material.order_index}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditMaterial(material)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(material.id)}
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
          <p className="text-gray-500">Belum ada materi untuk kursus ini. Tambahkan yang pertama!</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{currentMaterial ? 'Edit Materi' : 'Tambah Materi Baru'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Judul Materi:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                  Konten:
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows="6"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
                  Tipe Materi:
                </label>
                <select
                  id="type"
                  name="type"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.type}
                  onChange={handleInputChange}
                >
                  <option value="text">Text</option>
                  <option value="video">Video</option>
                  <option value="pdf">PDF</option>
                  <option value="quiz">Quiz</option>
                  <option value="code">Code</option>
                </select>
              </div>
              <div>
                <label htmlFor="order_index" className="block text-gray-700 text-sm font-bold mb-2">
                  Urutan:
                </label>
                <input
                  type="number"
                  id="order_index"
                  name="order_index"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.order_index}
                  onChange={handleInputChange}
                  required
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

export default AdminMaterialManagement;
