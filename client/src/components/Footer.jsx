import { Link } from "react-router-dom"
import CodeLabLogo from "../assets/codelab.png"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tetap Update dengan Kelas Terbaru
            </h3>
            <p className="text-gray-300 mb-6">
              Dapatkan notifikasi tentang kelas coding terbaru, tips programming, dan penawaran khusus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src= {CodeLabLogo} alt="Code Lab Logo" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Code Lab</span>
                <span className="text-sm text-gray-300">Your Playground for Coding</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Platform pembelajaran coding terdepan di Indonesia. Belajar programming dengan mentor berpengalaman dan
              kurikulum yang selalu update.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Jalur Belajar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/path/web-development" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/path/mobile-development" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to="/path/data-science" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/path/machine-learning" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/path/devops" className="text-gray-300 hover:text-blue-400 transition-colors">
                  DevOps
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Perusahaan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Karir
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Dukungan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Komunitas
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">&copy; {currentYear} Code Lab. Semua hak dilindungi undang-undang.</p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Kebijakan Privasi
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
                Kebijakan Cookie
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
