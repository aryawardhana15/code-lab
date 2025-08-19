import React from 'react';

const DashboardSiswa = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard Siswa</h1>

      {/* Progress Grafis */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Progress Belajar</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Placeholder for Recharts/Chart.js */}
          <div className="h-64 flex items-center justify-center text-gray-500">
            Grafik Progress Belajar (akan diimplementasikan dengan Recharts/Chart.js)
          </div>
        </div>
      </section>

      {/* Checklist Modul Selesai */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Modul Selesai</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-2">
            <li className="flex items-center">
              <input type="checkbox" checked readOnly className="mr-2" />
              <span>Pengenalan HTML - Selesai</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" checked readOnly className="mr-2" />
              <span>Struktur Dasar HTML - Selesai</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" readOnly className="mr-2" />
              <span>Styling dengan CSS - Belum Selesai</span>
            </li>
            {/* More modules */}
          </ul>
        </div>
      </section>

      {/* Reminder Notifikasi */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifikasi & Pengingat</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="space-y-2">
            <li className="text-gray-700">Pengingat: Sesi live "Advanced JavaScript" besok pukul 19.00 WIB.</li>
            <li className="text-gray-700">Tugas baru: Coding Challenge Minggu 3 telah dirilis.</li>
            <li className="text-gray-700">Feedback baru untuk submission Anda di "Project Portofolio".</li>
          </ul>
        </div>
      </section>

      {/* Badge/Achievement */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Badge & Pencapaian</h2>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <img src="https://via.placeholder.com/80" alt="Badge 1" className="mx-auto mb-2" />
            <p className="font-semibold">HTML Master</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/80" alt="Badge 2" className="mx-auto mb-2" />
            <p className="font-semibold">CSS Stylist</p>
          </div>
          <div className="text-center">
            <img src="https://via.placeholder.com/80" alt="Badge 3" className="mx-auto mb-2" />
            <p className="font-semibold">First Project</p>
          </div>
          {/* More badges */}
        </div>
      </section>
    </div>
  );
};

export default DashboardSiswa;
