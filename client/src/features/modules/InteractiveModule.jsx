import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const InteractiveModule = ({ moduleId }) => {
  // Dummy module data
  const moduleData = {
    id: moduleId,
    title: 'Modul Interaktif: HTML Dasar',
    content: `
      <h1>Selamat Datang di Modul HTML Dasar!</h1>
      <p>Di sini Anda akan belajar membuat struktur dasar halaman web.</p>
      <div id="preview-area"></div>
      <style>
        #preview-area {
          border: 1px solid #ccc;
          padding: 10px;
          min-height: 100px;
          margin-top: 20px;
        }
      </style>
    `,
    initialCode: `<!-- Tulis kode HTML Anda di sini -->\n<h2>Halo Dunia!</h2>`,
    solutionCode: `<h2>Ini Solusi!</h2>`, // For future validation
    quiz: [
      {
        question: 'Apa fungsi tag <h1>?',
        options: ['Membuat paragraf', 'Membuat judul utama', 'Membuat daftar'],
        answer: 'Membuat judul utama',
      },
    ],
  };

  const [code, setCode] = useState(moduleData.initialCode);
  const [previewContent, setPreviewContent] = useState('');
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [quizResult, setQuizResult] = useState('');
  const [progressStatus, setProgressStatus] = useState('belum'); // 'belum', 'sedang', 'selesai'

  useEffect(() => {
    updatePreview(code);
  }, [code]);

  const updatePreview = (htmlCode) => {
    // Simple sanitization to prevent script execution in preview
    const sanitizedCode = htmlCode.replace(/</g, '<').replace(/>/g, '>');
    setPreviewContent(sanitizedCode);
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleMarkComplete = () => {
    setProgressStatus('selesai');
    // In a real app, send progress to backend
    alert('Modul ditandai selesai! Progress Anda telah disimpan.');
  };

  const handleQuizSubmit = (selectedAnswer) => {
    if (selectedAnswer === moduleData.quiz[0].answer) {
      setQuizResult('Jawaban Benar!');
    } else {
      setQuizResult('Jawaban Salah. Coba lagi!');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{moduleData.title}</h1>

      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Teori & Contoh</h2>
        <div dangerouslySetInnerHTML={{ __html: moduleData.content.replace(/</g, '<').replace(/>/g, '>') }} className="prose max-w-none mb-6"></div>

        <h2 className="text-2xl font-semibold mb-4">Latihan Coding Interaktif</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Editor Kode (HTML/CSS/JS)</h3>
            <Editor
              height="400px"
              language="html"
              theme="vs-light"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Preview Hasil</h3>
            <iframe
              title="code-preview"
              srcDoc={previewContent}
              className="w-full h-[400px] border rounded-md"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleMarkComplete}
            className={`px-6 py-3 rounded-full font-semibold ${
              progressStatus === 'selesai' ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={progressStatus === 'selesai'}
          >
            {progressStatus === 'selesai' ? 'Modul Selesai!' : 'Tandai Selesai'}
          </button>
          <button
            onClick={() => setIsQuizVisible(!isQuizVisible)}
            className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700"
          >
            {isQuizVisible ? 'Sembunyikan Quiz' : 'Kerjakan Quiz'}
          </button>
        </div>

        {isQuizVisible && moduleData.quiz && moduleData.quiz.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Quiz Ringan</h3>
            <p className="mb-4">{moduleData.quiz[0].question}</p>
            <div className="space-y-2">
              {moduleData.quiz[0].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizSubmit(option)}
                  className="block w-full text-left bg-white border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
            {quizResult && <p className="mt-4 font-semibold">{quizResult}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveModule;
