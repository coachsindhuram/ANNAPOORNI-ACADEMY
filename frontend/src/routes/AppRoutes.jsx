import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Public Pages
import { Courses } from '../pages/public/Courses';
import { CourseDetail } from '../pages/public/CourseDetail';
import { Subjects } from '../pages/public/Subjects';
import { SubjectDetail } from '../pages/public/SubjectDetail';
import { LessonDetail } from '../pages/public/LessonDetail';
import { QuizView } from '../pages/public/QuizView';
import { Announcements } from '../pages/public/Announcements';
import { About } from '../pages/public/About';
import { Contact } from '../pages/public/Contact';
import NotFound from '../pages/public/NotFound';
import DynamicPage from '../pages/DynamicPage';

// Admin Pages
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AppearanceEditor } from '../pages/admin/AppearanceEditor';
import { PagesManager } from '../pages/admin/PagesManager';
import { VisualBuilder } from '../pages/admin/VisualBuilder';
import { NavigationManager } from '../pages/admin/NavigationManager';
import { CoursesManager } from '../pages/admin/CoursesManager';
import { SubjectsManager } from '../pages/admin/SubjectsManager';
import { LessonsManager } from '../pages/admin/LessonsManager';
import { QuizzesManager } from '../pages/admin/QuizzesManager';
import { AnnouncementsManager } from '../pages/admin/AnnouncementsManager';
import { MediaLibrary } from '../pages/admin/MediaLibrary';
import { SocialMediaManager } from '../pages/admin/SocialMediaManager';
import { ContactManager } from '../pages/admin/ContactManager';
import { SEOManager } from '../pages/admin/SEOManager';
import { Settings } from '../pages/admin/Settings';
import { EnrollmentsManager } from '../pages/admin/EnrollmentsManager';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<DynamicPage isHome={true} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectDetail />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/quizzes/:id" element={<QuizView />} />
        <Route path="/announcements" element={<Announcements />} />
        {/* Dynamic page catch-all MUST be at the end of Public routes */}
        <Route path="/:slug" element={<DynamicPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/pages" element={<PagesManager />} />
        <Route path="/admin/pages/builder/:id" element={<VisualBuilder />} />
        <Route path="/admin/enrollments" element={<EnrollmentsManager />} />
        <Route path="/admin/appearance" element={<AppearanceEditor />} />
        <Route path="/admin/navigation" element={<NavigationManager />} />
        <Route path="/admin/courses" element={<CoursesManager />} />
        <Route path="/admin/subjects" element={<SubjectsManager />} />
        <Route path="/admin/lessons" element={<LessonsManager />} />
        <Route path="/admin/quizzes" element={<QuizzesManager />} />
        <Route path="/admin/announcements" element={<AnnouncementsManager />} />
        <Route path="/admin/media" element={<MediaLibrary />} />
        <Route path="/admin/social" element={<SocialMediaManager />} />
        <Route path="/admin/contact" element={<ContactManager />} />
        <Route path="/admin/seo" element={<SEOManager />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* Fallback */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
