import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  FileUp,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { activeTab, setActiveTab, settings, profil, logout } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'munsyi', label: 'Data Munsyi', icon: Users },
    { id: 'import', label: 'Import Data', icon: FileUp },
    { id: 'settings', label: 'Tetapan', icon: Settings },
    { id: 'profile', label: 'Profil Admin', icon: User }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          id="sidebar-backdrop"
          onClick={onToggle}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="sidebar"
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-[260px] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between h-[72px] px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl text-white shadow-xs"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <BookOpen className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-white leading-tight">
                SPMDM
              </h1>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider">
                MUNSYI DEWAN
              </p>
            </div>
          </div>
          <button
            id="sidebar-close-btn"
            onClick={onToggle}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`sidebar-link-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  onToggle(); // Close sidebar on mobile/tablet after selection
                }}
                className={`flex items-center w-full gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/60'
                }`}
                style={{
                  backgroundColor: isActive ? `${settings.primaryColor}14` : undefined,
                  color: isActive ? settings.primaryColor : undefined
                }}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105`}
                  style={{
                    color: isActive ? settings.primaryColor : undefined
                  }}
                />
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: settings.primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Admin Profil Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex items-center gap-3 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <img
              src={profil.avatar}
              alt={profil.nama}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {profil.nama}
              </h4>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-medium">
                {profil.jawatan}
              </p>
            </div>
          </div>

          <button
            id="sidebar-logout-btn"
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 mt-3 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/10 dark:text-rose-400 dark:hover:bg-rose-950/20 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
};
