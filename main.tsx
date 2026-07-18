import React from 'react';
import { useApp } from '../../context/AppContext';
import { Menu, Bell, Shield, Calendar, UserCheck } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { activeTab, settings, profil } = useApp();

  const getBreadcrumbs = () => {
    const crumbs = [{ label: 'SPMDM', path: '#' }];
    switch (activeTab) {
      case 'dashboard':
        crumbs.push({ label: 'Dashboard Pentadbiran', path: '#' });
        break;
      case 'munsyi':
        crumbs.push({ label: 'Data Munsyi Dewan', path: '#' });
        break;
      case 'import':
        crumbs.push({ label: 'Import Data Munsyi', path: '#' });
        break;
      case 'settings':
        crumbs.push({ label: 'Tetapan Sistem', path: '#' });
        break;
      case 'profile':
        crumbs.push({ label: 'Profil Pentadbir', path: '#' });
        break;
      default:
        crumbs.push({ label: 'Dashboard', path: '#' });
    }
    return crumbs;
  };

  const formattedDate = () => {
    // Return a nice formatted date
    return 'Sabtu, 4 Julai 2026';
  };

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-25 flex items-center justify-between h-[72px] px-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
    >
      {/* Left section: Breadcrumb & Menu Toggle */}
      <div className="flex items-center gap-4">
        <button
          id="toggle-sidebar-btn"
          onClick={onToggleSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 lg:hidden focus:outline-none"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>

        {/* Breadcrumbs */}
        <div id="breadcrumb" className="hidden sm:flex items-center gap-2 text-xs font-medium">
          {getBreadcrumbs().map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-300 dark:text-slate-650">/</span>}
              <span
                className={`${
                  idx === getBreadcrumbs().length - 1
                    ? 'text-slate-800 dark:text-slate-100 font-semibold'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right section: Info, Clock, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-800/40 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>{formattedDate()}</span>
        </div>

        {/* Org badge */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/10 dark:text-blue-400 px-3 py-1.5 rounded-lg">
          <Shield className="w-3.5 h-3.5" />
          <span className="max-w-[150px] truncate">{settings.namaOrganisasi}</span>
        </div>

        {/* Notifications Mock */}
        <div className="relative">
          <button
            id="notifications-btn"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-850/80 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>

        {/* User Mini Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-150 dark:border-slate-800">
          <div className="hidden sm:block text-right">
            <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{profil.nama}</h5>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Administrator</p>
          </div>
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            <img
              src={profil.avatar}
              alt={profil.nama}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
