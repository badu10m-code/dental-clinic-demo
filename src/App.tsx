import React, { useState, useEffect } from 'react';
import { ClinicStoreProvider, useClinicStore } from './context/ClinicStoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SecurityPage } from './pages/SecurityPage';

// Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AdminPatients } from './pages/admin/AdminPatients';
import { AdminPosts } from './pages/admin/AdminPosts';
import { AdminBanners } from './pages/admin/AdminBanners';
import { AdminStats } from './pages/admin/AdminStats';
import { AdminSettings } from './pages/admin/AdminSettings';

import { ErrorBoundary } from './components/common/ErrorBoundary';

const ROUTE_ALIASES: Record<string, string> = {
  doctor: 'doctors',
  specialists: 'doctors',
  dentists: 'doctors',
  service: 'services',
  treatments: 'services',
  treatment: 'services',
  book: 'contact',
  booking: 'contact',
  appointment: 'contact',
  appointments: 'contact',
  reviews: 'home',
  terms: 'privacy',
};

const KNOWN_PUBLIC_PAGES = new Set([
  'home',
  'about',
  'services',
  'doctors',
  'gallery',
  'blog',
  'article',
  'contact',
  'privacy',
  'security',
]);

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const { appointments } = useClinicStore();
  const pendingCount = appointments ? appointments.filter((a) => a.status === 'new').length : 0;

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    try {
      const cleanPage = (page || 'home').trim().toLowerCase();
      const resolvedPage = ROUTE_ALIASES[cleanPage] || cleanPage;
      setCurrentPage(resolvedPage);
      setPageParams(params || {});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setCurrentPage('home');
      setPageParams({});
    }
  };

  useEffect(() => {
    if (currentPage === 'admin') {
      const tabTitle = adminTab.charAt(0).toUpperCase() + adminTab.slice(1);
      const prefix = pendingCount > 0 ? `(${pendingCount}) ` : '';
      document.title = `${prefix}${tabTitle} — SmileCraft Admin`;
    } else {
      const titleMap: Record<string, string> = {
        home: 'SmileCraft Dental Studio — Dentist in Andheri West, Mumbai',
        about: 'About Us — SmileCraft Dental Studio',
        services: 'Dental Services & Prices — SmileCraft Dental Studio',
        doctors: 'Our Specialists — SmileCraft Dental Studio',
        gallery: 'Clinic Gallery — SmileCraft Dental Studio',
        blog: 'Dental Health Blog & Updates — SmileCraft Dental Studio',
        article: 'Clinical Guide — SmileCraft Dental Studio',
        contact: 'Contact & Book Appointment — SmileCraft Dental Studio',
        privacy: 'Privacy Policy — SmileCraft Dental Studio',
        security: 'Security Measures — SmileCraft Dental Studio',
      };
      document.title = titleMap[currentPage] || 'SmileCraft Dental Studio';
    }
  }, [currentPage, adminTab, pendingCount]);

  if (currentPage === 'admin') {
    return (
      <ErrorBoundary sectionName="Admin Panel" onReset={() => handleNavigate('home')}>
        <AdminLayout
          currentTab={adminTab}
          onSelectTab={(tab) => setAdminTab(tab)}
          onExitAdmin={() => handleNavigate('home')}
        >
          {adminTab === 'dashboard' && <AdminDashboard onSelectTab={setAdminTab} />}
          {adminTab === 'appointments' && <AdminAppointments />}
          {adminTab === 'patients' && <AdminPatients />}
          {adminTab === 'posts' && <AdminPosts />}
          {adminTab === 'banners' && <AdminBanners />}
          {adminTab === 'stats' && <AdminStats />}
          {adminTab === 'settings' && <AdminSettings />}
        </AdminLayout>
      </ErrorBoundary>
    );
  }

  const isKnownPage = KNOWN_PUBLIC_PAGES.has(currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f3ec] text-[#1c2b26]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
        <ErrorBoundary sectionName="Page Content" onReset={() => handleNavigate('home')}>
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
          {currentPage === 'services' && <ServicesPage onNavigate={handleNavigate} />}
          {currentPage === 'doctors' && <DoctorsPage onNavigate={handleNavigate} />}
          {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
          {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
          {currentPage === 'article' && (
            <ArticlePage
              slug={pageParams.slug}
              id={pageParams.id}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
          {currentPage === 'privacy' && <PrivacyPage onNavigate={handleNavigate} />}
          {currentPage === 'security' && <SecurityPage onNavigate={handleNavigate} />}

          {!isKnownPage && (
            <div className="py-24 px-6 text-center max-w-lg mx-auto">
              <span className="text-4xl block mb-4">🦷</span>
              <h1 className="font-serif text-3xl font-bold text-[#1c2b26] mb-2">Page Not Found</h1>
              <p className="text-sm text-[#5d6b64] mb-6">
                The requested page (&ldquo;{currentPage}&rdquo;) could not be located.
              </p>
              <button
                onClick={() => handleNavigate('home')}
                className="btn-solid text-sm py-2.5 px-6 cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>
          )}
        </ErrorBoundary>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary sectionName="Application">
      <ClinicStoreProvider>
        <AppContent />
      </ClinicStoreProvider>
    </ErrorBoundary>
  );
};

export default App;
