import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero bg-blue-600 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Belajar coding dari nol jadi bisa bikin project nyata.</h1>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">Daftar</button>
          <button className="bg-transparent border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600">Lihat Kelas</button>
        </div>
      </section>

      {/* Testimoni Siswa */}
      <section className="testimonials py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">Apa Kata Mereka?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholder Testimoni */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="https://via.placeholder.com/100" alt="Student 1" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="italic mb-4">"Platform ini mengubah cara saya belajar coding. Sangat interaktif dan mudah dipahami!"</p>
            <p className="font-semibold">- Budi Santoso</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="https://via.placeholder.com/100" alt="Student 2" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="italic mb-4">"Mentornya sangat membantu dan komunitasnya aktif. Saya merasa didukung penuh."</p>
            <p className="font-semibold">- Siti Aminah</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <img src="https://via.placeholder.com/100" alt="Student 3" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="italic mb-4">"Dari nol sampai bisa bikin website sendiri, semua berkat kurikulum yang terstruktur di sini."</p>
            <p className="font-semibold">- Joko Susilo</p>
          </div>
        </div>
      </section>

      {/* Showcase Project Siswa */}
      <section className="project-showcase py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Project Nyata dari Siswa Kami</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder Project */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/300x200" alt="Project 1" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Website Portofolio Pribadi</h3>
            <p className="text-gray-600 mb-4">Project ini dibangun menggunakan HTML, CSS, dan JavaScript dasar.</p>
            <a href="#" className="text-blue-600 hover:underline">Lihat Demo</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/300x200" alt="Project 2" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aplikasi To-Do List Interaktif</h3>
            <p className="text-gray-600 mb-4">Aplikasi sederhana dengan fitur tambah, hapus, dan tandai selesai.</p>
            <a href="#" className="text-blue-600 hover:underline">Lihat Demo</a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img src="https://via.placeholder.com/300x200" alt="Project 3" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">Game Tebak Angka</h3>
            <p className="text-gray-600 mb-4">Game interaktif yang melatih logika pemrograman dasar.</p>
            <a href="#" className="text-blue-600 hover:underline">Lihat Demo</a>
          </div>
        </div>
      </section>

      {/* Highlight Kurikulum */}
      <section className="curriculum-highlight py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-10">Kurikulum Unggulan Kami</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="HTML Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">HTML</h3>
            <p className="text-gray-600">Struktur dasar website.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="CSS Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">CSS</h3>
            <p className="text-gray-600">Desain dan styling website.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <img src="https://via.placeholder.com/80" alt="JavaScript Icon" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">JavaScript</h3>
            <p className="text-gray-600">Interaktivitas website.</p>
          </div>
        </div>
      </section>

      {/* FAQ & Kontak */}
      <section className="faq-contact py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Pertanyaan Umum & Kontak</h2>
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Bagaimana cara mendaftar?</h3>
              <p className="text-gray-600">Anda bisa mendaftar melalui tombol "Daftar" di halaman utama.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Apakah ada kelas untuk pemula?</h3>
              <p className="text-gray-600">Ya, kami memiliki kurikulum khusus untuk pemula dari nol.</p>
            </div>
            {/* More FAQs */}
          </div>
          <div className="text-center mt-10">
            <p className="text-lg">Tidak menemukan jawaban? Hubungi kami:</p>
            <p className="text-blue-600 font-semibold">email@example.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
