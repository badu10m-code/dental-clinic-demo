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

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [adminTab, setAdminTab] = useState<string>('dashboard');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const { appointments } = useClinicStore();
  const pendingCount = appointments.filter((a) => a.status === 'new').length;

  const handleNavigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    if (params) {
      setPageParams(params);
    } else {
      setPageParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f3ec] text-[#1c2b26]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="flex-1">
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
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ClinicStoreProvider>
      <AppContent />
    </ClinicStoreProvider>
  );
};

export default App;
