import React, { useState } from 'react';

const ProjectUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [demoLink, setDemoLink] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshotFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus('Uploading...');
    setError(null);

    if (!title || !description || !screenshotFile || !demoLink) {
      setError('Semua field wajib diisi.');
      setUploadStatus('');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('screenshot', screenshotFile);
    formData.append('demoLink', demoLink);

    try {
      // Simulate API call for project upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Project Upload Data:', { title, description, screenshotFile: screenshotFile.name, demoLink });
      setUploadStatus('Proyek berhasil diunggah! Menunggu persetujuan admin/mentor.');
      // In a real app, send formData to backend API
      // Clear form after successful upload
      setTitle('');
      setDescription('');
      setScreenshotFile(null);
      setDemoLink('');
      document.getElementById('screenshot-upload').value = ''; // Clear file input
    } catch (err) {
      setUploadStatus(`Gagal mengunggah proyek: ${err.message}`);
      setError(err);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Unggah Proyek Anda</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Judul Proyek:
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Deskripsi Proyek:
            </label>
            <textarea
              id="description"
              rows="5"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="screenshot-upload" className="block text-gray-700 text-sm font-bold mb-2">
              Screenshot Proyek:
            </label>
            <input
              type="file"
              id="screenshot-upload"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleFileChange}
              required
            />
            {screenshotFile && <p className="mt-2 text-sm text-gray-600">File terpilih: {screenshotFile.name}</p>}
          </div>
          <div>
            <label htmlFor="demoLink" className="block text-gray-700 text-sm font-bold mb-2">
              Link Demo (opsional):
            </label>
            <input
              type="url"
              id="demoLink"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://your-project-demo.com"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-200"
            disabled={uploadStatus === 'Uploading...'}
          >
            {uploadStatus === 'Uploading...' ? 'Mengunggah...' : 'Unggah Proyek'}
          </button>
          {uploadStatus && uploadStatus !== 'Uploading...' && (
            <p className={`mt-3 text-sm ${uploadStatus.includes('gagal') ? 'text-red-500' : 'text-green-500'}`}>
              {uploadStatus}
            </p>
          )}
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProjectUpload;
