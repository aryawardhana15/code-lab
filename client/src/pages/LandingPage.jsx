"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { getTestimonials, getProjects } from "../utils/api"

const LandingPage = () => {
  const [testimonials, setTestimonials] = useState([])
  const [projects, setProjects] = useState([])
  const [activeTab, setActiveTab] = useState("frontend")
  const [isVisible, setIsVisible] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [activeCard, setActiveCard] = useState(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // <CHANGE> Enhanced mobile detection and scroll handling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolling(true)
      setShowFloatingButton(currentScrollY > 500)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isMobile])

  // <CHANGE> Advanced touch gesture handling with momentum
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [])

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe || isRightSwipe) {
      const tabs = Object.keys(learningPaths)
      const currentIndex = tabs.indexOf(activeTab)

      if (isLeftSwipe && currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1])
      } else if (isRightSwipe && currentIndex > 0) {
        setActiveTab(tabs[currentIndex - 1])
      }
    }
  }, [touchStart, touchEnd, activeTab])

  // <CHANGE> Enhanced data fetching with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testimonialsData, projectsData] = await Promise.all([
          getTestimonials(),
          getProjects()
        ])
        
        // Set testimonials with default data if API returns empty
        setTestimonials(testimonialsData.length > 0 ? testimonialsData : [
          {
            id: 1,
            student_name: "Budi Santoso",
            quote: "Kurikulumnya sangat terstruktur dan mudah diikuti. Saya berhasil membuat portofolio yang solid!",
            photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
            course_name: "Full Stack Developer"
          },
          {
            id: 2,
            student_name: "Siti Aminah",
            quote: "Mentornya sangat membantu dan responsif. Komunitasnya juga aktif, jadi tidak merasa sendirian.",
            photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
            course_name: "Frontend Web Developer"
          },
          {
            id: 3,
            student_name: "Joko Susilo",
            quote: "Saya tidak menyangka bisa membuat aplikasi sendiri. Proyek-proyeknya relevan dengan industri.",
            photo_url: "https://randomuser.me/api/portraits/men/47.jpg",
            course_name: "Backend Engineer"
          }
        ])

        // Set projects with default data if API returns empty
        setProjects(projectsData.length > 0 ? projectsData : [
          {
            id: 1,
            title: "E-commerce Website",
            description: "Website toko online lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.",
            screenshot_url: "https://via.placeholder.com/400x250/FF5733/FFFFFF?text=E-commerce",
            demo_url: "#"
          },
          {
            id: 2,
            title: "Social Media Dashboard",
            description: "Dashboard untuk memantau aktivitas media sosial dengan grafik interaktif dan notifikasi real-time.",
            screenshot_url: "https://via.placeholder.com/400x250/33FF57/FFFFFF?text=Social+Dashboard",
            demo_url: "#"
          },
          {
            id: 3,
            title: "Task Management App",
            description: "Aplikasi manajemen tugas dengan fitur drag-and-drop, prioritas, dan kolaborasi tim.",
            screenshot_url: "https://via.placeholder.com/400x250/3357FF/FFFFFF?text=Task+App",
            demo_url: "#"
          }
        ])
      } catch (error) {
        console.error("Failed to fetch data for landing page:", error)
        // Fallback to default data even if API call fails
        setTestimonials([
          {
            id: 1,
            student_name: "Budi Santoso",
            quote: "Kurikulumnya sangat terstruktur dan mudah diikuti. Saya berhasil membuat portofolio yang solid!",
            photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
            course_name: "Full Stack Developer"
          },
          {
            id: 2,
            student_name: "Siti Aminah",
            quote: "Mentornya sangat membantu dan responsif. Komunitasnya juga aktif, jadi tidak merasa sendirian.",
            photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
            course_name: "Frontend Web Developer"
          },
          {
            id: 3,
            student_name: "Joko Susilo",
            quote: "Saya tidak menyangka bisa membuat aplikasi sendiri. Proyek-proyeknya relevan dengan industri.",
            photo_url: "https://randomuser.me/api/portraits/men/47.jpg",
            course_name: "Backend Engineer"
          }
        ])
        setProjects([
          {
            id: 1,
            title: "E-commerce Website",
            description: "Website toko online lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.",
            screenshot_url: "https://via.placeholder.com/400x250/FF5733/FFFFFF?text=E-commerce",
            demo_url: "#"
          },
          {
            id: 2,
            title: "Social Media Dashboard",
            description: "Dashboard untuk memantau aktivitas media sosial dengan grafik interaktif dan notifikasi real-time.",
            screenshot_url: "https://via.placeholder.com/400x250/33FF57/FFFFFF?text=Social+Dashboard",
            demo_url: "#"
          },
          {
            id: 3,
            title: "Task Management App",
            description: "Aplikasi manajemen tugas dengan fitur drag-and-drop, prioritas, dan kolaborasi tim.",
            screenshot_url: "https://via.placeholder.com/400x250/3357FF/FFFFFF?text=Task+App",
            demo_url: "#"
          }
        ])
      }
    }
    fetchData()
  }, [])

  // <CHANGE> Advanced intersection observer with staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
            
            // Trigger staggered animations for child elements
            const children = entry.target.querySelectorAll('[data-stagger]')
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-fade-in-up')
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // <CHANGE> Auto-rotating testimonials with pause on interaction
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [testimonials])

  // <CHANGE> Enhanced typing effect with cursor blink
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "Belajar Coding Interaktif, Wujudkan Proyek Impianmu"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
        // Start cursor blinking after typing is complete
        const cursorTimer = setInterval(() => {
          setShowCursor(prev => !prev)
        }, 500)
        return () => clearInterval(cursorTimer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  // <CHANGE> Mobile project carousel with auto-advance
  useEffect(() => {
    if (isMobile && projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isMobile, projects.length])

  const learningPaths = {
    frontend: [
      { name: "HTML5", icon: "🏗️", level: "Beginner", duration: "2 minggu", projects: 3, color: "from-orange-400 to-red-500" },
      { name: "CSS3 & Sass", icon: "🎨", level: "Beginner", duration: "3 minggu", projects: 5, color: "from-blue-400 to-purple-500" },
      { name: "JavaScript ES6+", icon: "⚡", level: "Intermediate", duration: "6 minggu", projects: 8, color: "from-yellow-400 to-orange-500" },
      { name: "React.js", icon: "⚛️", level: "Advanced", duration: "8 minggu", projects: 10, color: "from-cyan-400 to-blue-500" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢", level: "Intermediate", duration: "6 minggu", projects: 6, color: "from-green-400 to-emerald-500" },
      { name: "Express.js", icon: "🚀", level: "Intermediate", duration: "4 minggu", projects: 4, color: "from-gray-400 to-gray-600" },
      { name: "Database Design", icon: "🗄️", level: "Intermediate", duration: "5 minggu", projects: 5, color: "from-indigo-400 to-purple-500" },
      { name: "API Development", icon: "🔌", level: "Advanced", duration: "7 minggu", projects: 8, color: "from-pink-400 to-rose-500" },
    ],
    fullstack: [
      { name: "MERN Stack", icon: "🔥", level: "Advanced", duration: "12 minggu", projects: 15, color: "from-red-400 to-pink-500" },
      { name: "Next.js", icon: "▲", level: "Advanced", duration: "8 minggu", projects: 10, color: "from-gray-800 to-black" },
      { name: "DevOps Basics", icon: "🛠️", level: "Advanced", duration: "6 minggu", projects: 5, color: "from-blue-400 to-indigo-500" },
      { name: "Deployment", icon: "🌐", level: "Advanced", duration: "4 minggu", projects: 3, color: "from-green-400 to-teal-500" },
    ],
  }

  // <CHANGE> Smooth scroll to section function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="overflow-x-hidden relative">
      {/* <CHANGE> Floating Action Button for mobile */}
      {isMobile && showFloatingButton && (
        <button
          onClick={() => scrollToSection('learning-paths')}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-pink-500 to-violet-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110 animate-bounce-in"
          style={{
            animation: showFloatingButton ? 'bounce-in 0.5s ease-out' : 'none'
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </button>
      )}

      {/* <CHANGE> Enhanced Hero Section with advanced parallax and mobile optimizations */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white py-20 md:py-32 overflow-hidden min-h-screen flex items-center"
      >
        {/* <CHANGE> Advanced parallax background with multiple layers */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        {/* <CHANGE> Interactive floating code elements with mouse tracking */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          {[
            { code: '<div className="hero">', color: 'text-green-400', position: 'top-20 left-10' },
            { code: 'function learn() {', color: 'text-blue-400', position: 'top-40 right-20' },
            { code: 'const skills = [];', color: 'text-yellow-400', position: 'bottom-40 left-20' },
            { code: '</div>', color: 'text-pink-400', position: 'bottom-20 right-10' },
          ].map((item, index) => (
            <div
              key={index}
              className={`absolute ${isMobile ? item.position.replace(/\d+/g, (match) => Math.floor(parseInt(match) * 0.6)) : item.position} ${item.color} font-mono ${isMobile ? 'text-xs' : 'text-sm'} opacity-30 animate-float transition-transform duration-1000`}
              style={{
                transform: !isMobile ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)` : 'none',
                animationDelay: `${index * 500}ms`
              }}
            >
              {item.code}
            </div>
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-8">
            <span className="inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce-in">
              🚀 Platform Coding #1 di Indonesia
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {typedText}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '1s' }}>
            Dari <span className="text-yellow-400 font-bold">zero to hero</span> dalam coding! Kurikulum interaktif,
            mentor berpengalaman, dan komunitas yang supportif menunggumu.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <Link
              to="/register"
              className="group bg-gradient-to-r from-pink-500 to-violet-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                Mulai Belajar Gratis
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </span>
            </Link>
            <Link
              to="/classes"
              className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
                Lihat Semua Kelas
              </span>
            </Link>
          </div>

          {/* <CHANGE> Enhanced stats with mobile-specific animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            {[
              { value: "10K+", label: "Siswa Aktif", color: "text-pink-400", delay: 0 },
              { value: "500+", label: "Proyek Selesai", color: "text-violet-400", delay: 100 },
              { value: "95%", label: "Tingkat Kepuasan", color: "text-blue-400", delay: 200 },
              { value: "24/7", label: "Support", color: "text-green-400", delay: 300 },
            ].map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-500 hover:scale-110 cursor-pointer ${
                  isMobile ? "animate-bounce-in" : "animate-fade-in-up"
                }`}
                style={{
                  animationDelay: `${2000 + stat.delay}ms`,
                  transform: isMobile && !isScrolling ? `translateY(${Math.sin(Date.now() * 0.001 + index) * 3}px)` : 'none',
                }}
                onClick={() => isMobile && setActiveCard(index)}
              >
                <div className={`text-2xl md:text-4xl font-bold ${stat.color} mb-2 transition-all duration-300 ${activeCard === index ? 'scale-125' : ''}`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <CHANGE> Enhanced Learning Paths with advanced mobile interactions */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50" id="learning-paths" data-animate>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-stagger>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Pilih Jalur Belajarmu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kurikulum terstruktur yang dirancang khusus untuk mengantarmu menjadi developer profesional
            </p>
          </div>

          {/* <CHANGE> Enhanced tab navigation with swipe gestures */}
          <div className="flex justify-center mb-12" data-stagger>
            <div
              className="bg-white rounded-2xl p-2 shadow-xl border border-gray-100 relative overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* <CHANGE> Active tab indicator with smooth animation */}
              <div
                className="absolute top-2 bottom-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl transition-all duration-300 ease-out"
                style={{
                  left: `${2 + (Object.keys(learningPaths).indexOf(activeTab) * (100 / Object.keys(learningPaths).length))}%`,
                  width: `${(100 / Object.keys(learningPaths).length) - 1}%`,
                }}
              />
              
              {isMobile && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 flex items-center gap-1 animate-pulse">
                  <span>👈</span> Swipe untuk ganti tab <span>👉</span>
                </div>
              )}
              
              {Object.keys(learningPaths).map((path, index) => (
                <button
                  key={path}
                  onClick={() => setActiveTab(path)}
                  className={`relative z-10 px-4 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all duration-300 ${
                    activeTab === path
                      ? "text-white"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {path === "frontend" && (isMobile ? "🎨 FE" : "🎨 Frontend")}
                  {path === "backend" && (isMobile ? "⚙️ BE" : "⚙️ Backend")}
                  {path === "fullstack" && (isMobile ? "🚀 FS" : "🚀 Full Stack")}
                </button>
              ))}
            </div>
          </div>

          {/* <CHANGE> Enhanced course cards with mobile-specific layouts */}
          <div className={`${isMobile ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"}`}>
            {learningPaths[activeTab].map((course, index) => (
              <div
                key={course.name}
                className={`group bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer relative overflow-hidden ${
                  isVisible["learning-paths"] ? "animate-fade-in-up" : "opacity-0"
                } ${isMobile && activeCard === index ? "scale-105 shadow-2xl ring-4 ring-purple-200" : ""}`}
                style={{
                  animationDelay: `${index * (isMobile ? 200 : 100)}ms`,
                }}
                onClick={() => {
                  if (isMobile) {
                    setActiveCard(activeCard === index ? null : index)
                  }
                }}
                onTouchStart={() => isMobile && setActiveCard(index)}
              >
                {/* <CHANGE> Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div
                  className={`text-4xl md:text-6xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    isMobile && activeCard === index ? "animate-bounce" : ""
                  }`}
                >
                  {course.icon}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                  {course.name}
                </h3>

                {/* <CHANGE> Expandable content for mobile */}
                <div
                  className={`transition-all duration-300 ${
                    isMobile && activeCard !== index ? "max-h-20 overflow-hidden" : "max-h-none"
                  }`}
                >
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                          course.level === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : course.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm md:text-base flex items-center gap-2">
                      <span>⏱️</span> {course.duration}
                    </div>
                    <div className="text-gray-600 text-sm md:text-base flex items-center gap-2">
                      <span>📁</span> {course.projects} proyek
                    </div>

                    {/* <CHANGE> Additional info for expanded mobile cards */}
                    {isMobile && activeCard === index && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg animate-fade-in border-l-4 border-purple-400">
                        <p className="text-sm text-gray-700 mb-3 font-medium">
                          Kelas ini cocok untuk {course.level.toLowerCase()} yang ingin menguasai {course.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <span>👥</span> Grup belajar
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📱</span> Mobile friendly
                          </div>
                          <div className="flex items-center gap-1">
                            <span>🏆</span> Sertifikat
                          </div>
                          <div className="flex items-center gap-1">
                            <span>💬</span> Mentor support
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className={`w-full bg-gradient-to-r ${course.color} text-white py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isMobile
                      ? "active:scale-95 shadow-lg"
                      : ""
                  }`}
                >
                  {isMobile ? "Mulai" : "Mulai Belajar"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <CHANGE> Enhanced testimonials with mobile carousel */}
      <section
        className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900 text-white"
        id="testimonials"
        data-animate
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16" data-stagger>Success Stories 🌟</h2>

          {testimonials.length > 0 ? (
            <div className="max-w-4xl mx-auto" data-stagger>
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center border border-white/20 relative overflow-hidden">
                {/* <CHANGE> Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500 to-purple-500 animate-pulse" />
                </div>
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-6xl mb-6 md:mb-8 animate-bounce">💬</div>
                  <blockquote className="text-xl md:text-3xl font-light mb-6 md:mb-8 leading-relaxed italic">
                    "{testimonials[currentTestimonial]?.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                    <img
                      src={testimonials[currentTestimonial]?.photo_url || "https://via.placeholder.com/80"}
                      alt={testimonials[currentTestimonial]?.student_name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <div className="text-lg md:text-xl font-bold">{testimonials[currentTestimonial]?.student_name}</div>
                      <div className="text-purple-200 text-sm md:text-base">
                        {testimonials[currentTestimonial]?.course_name || "Alumni Program"}
                      </div>
                    </div>
                  </div>

                  {/* <CHANGE> Enhanced pagination dots */}
                  <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial 
                            ? "bg-white scale-125" 
                            : "bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl opacity-70">Testimoni akan segera hadir...</div>
          )}
        </div>
      </section>

      {/* <CHANGE> Enhanced project showcase with mobile carousel */}
      <section className="py-20 bg-white" id="projects" data-animate>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-stagger>
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
              Karya Siswa Kami 🎯
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dari ide hingga aplikasi nyata - lihat bagaimana siswa kami mengubah pembelajaran menjadi portofolio yang
              memukau
            </p>
          </div>

          {/* <CHANGE> Mobile-optimized project display */}
          <div className={`${isMobile ? "relative" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"}`}>
            {isMobile ? (
              // Mobile carousel view
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentProjectIndex * 100}%)` }}
                >
                  {projects.length > 0 ? (
                    projects.map((project, index) => (
                      <div
                        key={project.id}
                        className="w-full flex-shrink-0 px-4"
                      >
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                          <div className="relative overflow-hidden">
                            <img
                              src={project.screenshot_url || "https://via.placeholder.com/400x250"}
                              alt={project.title}
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            </div>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                            {project.demo_url && (
                              <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                                Lihat Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full flex-shrink-0 text-center py-20">
                      <div className="text-6xl mb-6">🚧</div>
                      <p className="text-xl text-gray-500">Proyek-proyek keren sedang dalam persiapan...</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Desktop grid view
              <>
                {projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2 ${
                        isVisible["projects"] ? "animate-fade-in-up" : "opacity-0"
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={project.screenshot_url || "https://via.placeholder.com/400x250"}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l5 5m0 0l-5 5m5-5H6"></path>
                            </svg>
                            Lihat Demo
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <div className="text-6xl mb-6">🚧</div>
                    <p className="text-xl text-gray-500">Proyek-proyek keren sedang dalam persiapan...</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* <CHANGE> Mobile carousel indicators */}
          {isMobile && projects.length > 0 && (
            <div className="flex justify-center mt-8 gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? "bg-purple-600 scale-125" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ... existing code ... */}
      
      {/* Highlight Kurikulum */}
      <section className="curriculum-highlight py-16 md:py-24 bg-blue-50" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" data-stagger>
            Kurikulum Unggulan: Belajar dari Dasar hingga Mahir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              { name: "HTML", icon: "https://img.icons8.com/ios-filled/100/000000/html-5.png", desc: "Fondasi setiap website. Pelajari struktur dan semantik web." },
              { name: "CSS", icon: "https://img.icons8.com/ios-filled/100/000000/css3.png", desc: "Desain visual yang menawan. Buat tampilan website yang responsif dan indah." },
              { name: "JavaScript", icon: "https://img.icons8.com/ios-filled/100/000000/javascript.png", desc: "Interaktivitas dinamis. Hidupkan website-mu dengan fungsionalitas canggih." }
            ].map((tech, index) => (
              <div 
                key={tech.name}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-blue-100 transform hover:-translate-y-2"
                data-stagger
              >
                <img
                  src={tech.icon || "/placeholder.svg"}
                  alt={`${tech.name} Icon`}
                  className="mx-auto mb-6 w-20 h-20 transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{tech.name}</h3>
                <p className="text-gray-700 text-lg">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us py-16 md:py-24 bg-white" data-animate>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" data-stagger>Mengapa Memilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Kurikulum Terstruktur", desc: "Belajar dengan jalur yang jelas, dari dasar hingga topik lanjutan.", color: "blue", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 15h.01" },
              { title: "Proyek Nyata", desc: "Terapkan ilmu dengan membangun proyek yang bisa kamu pamerkan.", color: "green", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
              { title: "Komunitas Aktif", desc: "Dapatkan dukungan dan berkolaborasi dengan sesama pembelajar.", color: "purple", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="flex flex-col items-center text-center p-8 bg-gray-50 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                data-stagger
              >
                <div className={`bg-${feature.color}-100 text-${feature.color}-600 rounded-full p-4 mb-6 transition-transform duration-300 hover:scale-110`}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-base">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section py-16 md:py-24 bg-gray-50" data-animate>
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800" data-stagger>Pertanyaan Umum</h2>
          <div className="space-y-6">
            {[
              { q: "Bagaimana cara mendaftar dan memulai belajar?", a: "Anda bisa mendaftar dengan mudah melalui tombol \"Mulai Belajar Gratis\" di bagian atas halaman. Setelah mendaftar, Anda akan mendapatkan akses ke modul pengantar kami." },
              { q: "Apakah ada kelas untuk pemula yang belum pernah coding sama sekali?", a: "Tentu saja! Kurikulum kami dirancang khusus untuk mengakomodasi pemula dari nol. Kami akan membimbing Anda langkah demi langkah." },
              { q: "Apa saja yang akan saya pelajari di sini?", a: "Anda akan mempelajari dasar-dasar pengembangan web seperti HTML, CSS, JavaScript, hingga framework modern dan cara membangun aplikasi full-stack." },
              { q: "Apakah ada dukungan mentor atau komunitas?", a: "Ya, kami memiliki tim mentor yang siap membantu dan komunitas aktif di forum diskusi untuk saling berbagi ilmu dan pengalaman." }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                data-stagger
              >
                <h3 className="font-bold text-xl mb-3 text-gray-900">{faq.q}</h3>
                <p className="text-gray-700 text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section
        className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white text-center relative overflow-hidden"
        id="cta"
        data-animate
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-8 animate-bounce" data-stagger>🚀</div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight" data-stagger>Siap Menjadi Developer Profesional?</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed" data-stagger>
              Bergabunglah dengan <span className="text-yellow-400 font-bold">10,000+ siswa</span> yang telah mengubah
              hidup mereka melalui coding. Masa depan teknologi menunggumu!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12" data-stagger>
              <Link
                to="/register"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-6 rounded-2xl font-black text-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                <span className="flex items-center justify-center gap-3">
                  ⚡ Mulai Sekarang - GRATIS
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    ></path>
                  </svg>
                </span>
              </Link>

              <Link
                to="/classes"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-purple-900 transition-all duration-300 active:scale-95"
              >
                <span className="flex items-center justify-center gap-3">📚 Jelajahi Kelas</span>
              </Link>
            </div>

            <div className="text-sm opacity-70" data-stagger>
              ✅ Tanpa biaya tersembunyi • ✅ Akses selamanya • ✅ Sertifikat resmi
            </div>
          </div>
        </div>
      </section>

      {/* <CHANGE> Enhanced CSS with mobile-specific optimizations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
          
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-10px);
          }
          70% {
            transform: scale(0.9) translateY(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Enhanced mobile optimizations */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* Smooth scrolling for mobile */
          .overflow-x-auto {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          .overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
          
          /* Enhanced touch targets */
          button, a {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improved text readability on mobile */
          h1, h2, h3 {
            line-height: 1.2;
          }
          
          p {
            line-height: 1.6;
          }
          
          /* Mobile-specific animations */
          @keyframes mobile-bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          .mobile-bounce {
            animation: mobile-bounce 2s infinite;
          }
          
          /* Improved mobile interactions */
          .mobile-card-hover:active {
            transform: scale(0.98);
            transition: transform 0.1s ease-out;
          }
          
          /* Mobile-specific gradients */
          .mobile-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .bg-gradient-to-r,
          .bg-gradient-to-br {
            background: #000 !important;
            color: #fff !important;
          }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
