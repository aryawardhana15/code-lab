// Mock server for development/testing without a real database
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
// WARNING: For development only! Restrict origin in production.
app.use(cors({
  origin: true, // Allow all origins for dev
  credentials: true,
}));
app.use(express.json());

// Mock data
const mockTestimonials = [
  {
    id: 1,
    student_name: "Budi Santoso",
    quote: "Kurikulumnya sangat terstruktur dan mudah diikuti. Saya berhasil membuat portofolio yang solid!",
    photo_url: "https://randomuser.me/api/portraits/men/32.jpg",
    course_name: "Full Stack Developer",
    approved: true
  },
  {
    id: 2,
    student_name: "Siti Aminah",
    quote: "Mentornya sangat membantu dan responsif. Komunitasnya juga aktif, jadi tidak merasa sendirian.",
    photo_url: "https://randomuser.me/api/portraits/women/44.jpg",
    course_name: "Frontend Web Developer",
    approved: true
  },
  {
    id: 3,
    student_name: "Joko Susilo",
    quote: "Saya tidak menyangka bisa membuat aplikasi sendiri. Proyek-proyeknya relevan dengan industri.",
    photo_url: "https://randomuser.me/api/portraits/men/47.jpg",
    course_name: "Backend Engineer",
    approved: true
  }
];

const mockProjects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "Website toko online lengkap dengan fitur keranjang belanja, pembayaran, dan manajemen produk.",
    screenshot_url: "https://picsum.photos/400/250?random=1",
    demo_url: "#",
    published: true
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description: "Dashboard untuk memantau aktivitas media sosial dengan grafik interaktif dan notifikasi real-time.",
    screenshot_url: "https://picsum.photos/400/250?random=2",
    demo_url: "#",
    published: true
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Aplikasi manajemen tugas dengan fitur drag-and-drop, prioritas, dan kolaborasi tim.",
    screenshot_url: "https://picsum.photos/400/250?random=3",
    demo_url: "#",
    published: true
  }
];

const mockCourses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Belajar membuat aplikasi web lengkap dari frontend hingga backend",
    duration: "12 minggu",
    level: "Intermediate",
    price: 1500000,
    image_url: "https://picsum.photos/400/250?random=4",
    published: true
  },
  {
    id: 2,
    title: "Frontend Development",
    description: "Fokus pada pengembangan antarmuka pengguna yang responsif dan modern",
    duration: "8 minggu",
    level: "Beginner",
    price: 800000,
    image_url: "https://picsum.photos/400/250?random=5",
    published: true
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Membangun API dan sistem backend yang scalable dan aman",
    duration: "10 minggu",
    level: "Intermediate",
    price: 1200000,
    image_url: "https://picsum.photos/400/250?random=6",
    published: true
  }
];

const mockLeaderboard = [
  { id: 1, user: 'Student A', totalPoints: 1500, rank: 1 },
  { id: 2, user: 'Student B', totalPoints: 1200, rank: 2 },
  { id: 3, user: 'Student C', totalPoints: 1000, rank: 3 },
  { id: 4, user: 'Student D', totalPoints: 950, rank: 4 },
  { id: 5, user: 'Student E', totalPoints: 800, rank: 5 },
];

// Routes
app.get('/api/testimonials', (req, res) => {
  const { approved } = req.query;
  let testimonials = mockTestimonials;
  if (approved !== undefined) {
    testimonials = testimonials.filter(t => t.approved === (approved === 'true'));
  }
  res.json(testimonials);
});

app.get('/api/projects', (req, res) => {
  const { published } = req.query;
  let projects = mockProjects;
  if (published !== undefined) {
    projects = projects.filter(p => p.published === (published === 'true'));
  }
  res.json(projects);
});

app.get('/api/courses', (req, res) => {
  const { published, level, search } = req.query;
  let courses = mockCourses;
  if (published !== undefined) {
    courses = courses.filter(c => c.published === (published === 'true'));
  }
  if (level) {
    courses = courses.filter(c => c.level === level);
  }
  if (search) {
    courses = courses.filter(c => 
      c.title.toLowerCase().includes(search.toString().toLowerCase()) ||
      c.description.toLowerCase().includes(search.toString().toLowerCase())
    );
  }
  res.json(courses);
});

// Leaderboard mock endpoint
app.get('/api/leaderboard', (req, res) => {
  res.json(mockLeaderboard);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock server is running' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
