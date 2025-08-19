import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App'; // This will be our main layout component later
import LandingPage from './pages/LandingPage';
import CourseCatalog from './pages/CourseCatalog';
import CourseDetail from './pages/CourseDetail';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import DashboardSiswa from './pages/DashboardSiswa';
import MyCourses from './pages/MyCourses';
import InteractiveModule from './features/modules/InteractiveModule';
import ChallengeList from './features/challenges/ChallengeList';
import ChallengeDetail from './features/challenges/ChallengeDetail';
import ProjectList from './features/projects/ProjectList';
import ProjectUpload from './features/projects/ProjectUpload';
import ProjectDetail from './features/projects/ProjectDetail';
import LiveSessionList from './features/schedules/LiveSessionList';
import DashboardMentor from './features/dashboard/DashboardMentor'; // Import DashboardMentor
import CourseManagement from './features/mentor/CourseManagement'; // Import CourseManagement
import MaterialManagement from './features/mentor/MaterialManagement'; // Import MaterialManagement
import AdminDashboard from './features/admin/AdminDashboard';
import UserManagement from './features/admin/UserManagement';
import AdminCourseManagement from './features/admin/CourseManagement';
import AdminMaterialManagement from './features/admin/MaterialManagement';
import AdminLiveSessionManagement from './features/admin/LiveSessionManagement';
import AdminTestimonialManagement from './features/admin/TestimonialManagement';
import AdminBadgeManagement from './features/admin/BadgeManagement';
import AdminForumModeration from './features/admin/ForumModeration';
import AdminProjectModeration from './features/admin/ProjectModeration';
import ReportExport from './features/admin/ReportExport';
import Leaderboard from './features/gamification/Leaderboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/classes" element={<CourseCatalog />} />
      <Route path="/classes/:id" element={<CourseDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardSiswa />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/modules/:moduleId" element={<InteractiveModule />} /> {/* Route for interactive modules */}
      <Route path="/challenges" element={<ChallengeList />} /> {/* Route for challenge list */}
      <Route path="/challenges/:challengeId" element={<ChallengeDetail />} /> {/* Route for challenge detail */}
      <Route path="/projects" element={<ProjectList />} /> {/* Route for project showcase list */}
      <Route path="/projects/upload" element={<ProjectUpload />} /> {/* Route for project upload */}
      <Route path="/projects/:projectId" element={<ProjectDetail />} /> {/* Route for project detail */}
      <Route path="/live-sessions" element={<LiveSessionList />} /> {/* Route for live sessions list */}
      <Route path="/leaderboard" element={<Leaderboard />} /> {/* Route for leaderboard */}

      {/* Mentor Routes */}
      <Route path="/mentor/dashboard" element={<DashboardMentor />} />
      <Route path="/mentor/courses/manage" element={<CourseManagement />} />
      <Route path="/mentor/courses/:courseId/materials" element={<MaterialManagement />} />
      <Route path="/mentor/submissions/:submissionId/grade" element={<GradeSubmission />} /> {/* Route for grading submissions */}
      <Route path="/mentor/forum/moderate" element={<ForumModeration />} /> {/* Route for forum moderation */}

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users/manage" element={<UserManagement />} />
      <Route path="/admin/courses/manage" element={<AdminCourseManagement />} />
      <Route path="/admin/courses/manage" element={<AdminCourseManagement />} />
      <Route path="/admin/courses/:courseId/materials" element={<AdminMaterialManagement />} />
      <Route path="/admin/schedules/manage" element={<AdminLiveSessionManagement />} />
      <Route path="/admin/testimonials/manage" element={<AdminTestimonialManagement />} />
      <Route path="/admin/badges/manage" element={<AdminBadgeManagement />} />
      <Route path="/admin/forum/moderate" element={<AdminForumModeration />} />
      <Route path="/admin/projects/moderate" element={<AdminProjectModeration />} />
      <Route path="/admin/report-export" element={<ReportExport />} />

      {/* Protected routes will go here */}
    </Routes>
  );
};

export default AppRoutes;
