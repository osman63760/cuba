import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/Toast';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { DataMunsyi } from './pages/DataMunsyi';
import { ImportData } from './pages/ImportData';
import { Tetapan } from './pages/Tetapan';
import { ProfilAdmin } from './pages/ProfilAdmin';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { isAuthenticated, activeTab } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!isAuthenticated) {
    return (
      <div id="auth-layout" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Login />
        <ToastContainer />
      </div>
    );
  }

  // Determine active component to render
  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'munsyi':
        return <DataMunsyi />;
      case 'import':
        return <ImportData />;
      case 'settings':
        return <Tetapan />;
      case 'profile':
        return <ProfilAdmin />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div id="admin-layout" className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col lg:pl-[260px] min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar onToggleSidebar={toggleSidebar} />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="h-full"
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Slide-In Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
