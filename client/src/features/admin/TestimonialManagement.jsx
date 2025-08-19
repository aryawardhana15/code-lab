import React, { useState, useEffect } from 'react';

const AdminTestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching all testimonials for admin
    const fetchTestimonials = async () => {
      try {
        const dummyTestimonials = [
          { id: 1, studentId: 1, studentName: 'Student A', quote: 'Kursusnya sangat membantu dan mudah dipahami!', rating: 5, isApproved: false, createdAt: '2025-08-10T10:00:00Z' },
          { id: 2, studentId: 3, studentName: 'Student C', quote: 'Materi interaktifnya luar biasa!', rating: 4, isApproved: true, createdAt: '2025-08-08T14:00:00Z' },
          { id: 3, studentId: null, nameOverride: 'Alumni Sukses', photoUrl: 'https://via.placeholder.com/50?text=AS', quote: 'Berkat platform ini, saya berhasil mendapatkan pekerjaan impian.', rating: 5, isApproved: false, createdAt: '2025-08-05T09:00:00Z' },
        ];
        setTestimonials(dummyTestimonials);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleApproveTestimonial = async (testimonialId) => {
    if (window.confirm('Apakah Anda yakin ingin menyetujui testimoni ini?')) {
      try {
        // Simulate API call to approve testimonial
        await new Promise(resolve => setTimeout(resolve, 500));
        setTestimonials(testimonials.map(t => (t.id === testimonialId ? { ...t, isApproved: true } : t)));
        alert('Testimoni berhasil disetujui!');
      } catch (err) {
        alert(`Gagal menyetujui testimoni: ${err.message}`);
      }
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      try {
        // Simulate API call to delete testimonial
        await new Promise(resolve => setTimeout(resolve, 500));
        setTestimonials(testimonials.filter(t => t.id !== testimonialId));
        alert('Testimoni berhasil dihapus!');
      } catch (err) {
        alert(`Gagal menghapus testimoni: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center">Memuat manajemen testimoni...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Manajemen Testimoni (Admin)</h1>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Daftar Semua Testimoni</h2>
        {testimonials.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Nama</th>
                  <th className="py-2 px-4 border-b text-left">Kutipan</th>
                  <th className="py-2 px-4 border-b text-left">Rating</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map(testimonial => (
                  <tr key={testimonial.id}>
                    <td className="py-2 px-4 border-b">{testimonial.studentName || testimonial.nameOverride || 'N/A'}</td>
                    <td className="py-2 px-4 border-b line-clamp-2">{testimonial.quote}</td>
                    <td className="py-2 px-4 border-b">{testimonial.rating}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        testimonial.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {testimonial.isApproved ? 'Disetujui' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {!testimonial.isApproved && (
                        <button
                          onClick={() => handleApproveTestimonial(testimonial.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                        >
                          Setujui
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
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
          <p className="text-gray-500">Tidak ada testimoni.</p>
        )}
      </div>
    </div>
  );
};

export default AdminTestimonialManagement;
