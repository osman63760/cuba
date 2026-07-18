import React, { createContext, useContext, useState, useEffect } from 'react';
import { Munsyi, Tetapan, AdminProfil, ToastMessage } from '../types';
import { DUMMY_MUNSYI_LIST, INITIAL_TETAPAN, INITIAL_PROFIL, RECENT_ACTIVITIES } from '../data/munsyiData';

interface AppContextType {
  munsyiList: Munsyi[];
  settings: Tetapan;
  profil: AdminProfil;
  recentActivities: typeof RECENT_ACTIVITIES;
  toasts: ToastMessage[];
  isAuthenticated: boolean;
  activeTab: string;
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  login: (username: string, psw: string) => boolean;
  logout: () => void;
  addMunsyi: (munsyi: Omit<Munsyi, 'id'>) => void;
  updateMunsyi: (munsyi: Munsyi) => void;
  deleteMunsyi: (id: string) => void;
  updateSettings: (newSettings: Tetapan) => void;
  updateProfil: (newProfil: AdminProfil) => void;
  setActiveTab: (tab: string) => void;
  importBulkData: (bulkData: Munsyi[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [munsyiList, setMunsyiList] = useState<Munsyi[]>(() => {
    const saved = localStorage.getItem('spmdm_munsyi');
    return saved ? JSON.parse(saved) : DUMMY_MUNSYI_LIST;
  });

  const [settings, setSettings] = useState<Tetapan>(() => {
    const saved = localStorage.getItem('spmdm_settings');
    return saved ? JSON.parse(saved) : INITIAL_TETAPAN;
  });

  const [profil, setProfil] = useState<AdminProfil>(() => {
    const saved = localStorage.getItem('spmdm_profil');
    return saved ? JSON.parse(saved) : INITIAL_PROFIL;
  });

  const [recentActivities, setRecentActivities] = useState<typeof RECENT_ACTIVITIES>(() => {
    const saved = localStorage.getItem('spmdm_activities');
    return saved ? JSON.parse(saved) : RECENT_ACTIVITIES;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('spmdm_auth') === 'true';
  });

  const [activeTab, setActiveTabState] = useState<string>(() => {
    return localStorage.getItem('spmdm_active_tab') || 'dashboard';
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    localStorage.setItem('spmdm_active_tab', tab);
  };

  useEffect(() => {
    localStorage.setItem('spmdm_munsyi', JSON.stringify(munsyiList));
  }, [munsyiList]);

  useEffect(() => {
    localStorage.setItem('spmdm_settings', JSON.stringify(settings));
    // Apply dark mode class to root html element
    if (settings.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('spmdm_profil', JSON.stringify(profil));
  }, [profil]);

  useEffect(() => {
    localStorage.setItem('spmdm_activities', JSON.stringify(recentActivities));
  }, [recentActivities]);

  const addToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (username: string, psw: string): boolean => {
    if (username === 'admin' && psw === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('spmdm_auth', 'true');
      addToast('Selamat kembali, Pentadbir!', 'success');
      return true;
    }
    addToast('Username atau kata laluan salah!', 'error');
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('spmdm_auth');
    addToast('Sesi ditutup. Jumpa lagi!', 'info');
  };

  const addActivity = (action: string, detail: string) => {
    const newAct = {
      id: Math.random().toString(36).substring(2, 9),
      user: profil.nama,
      action,
      detail,
      time: 'Baru sahaja'
    };
    setRecentActivities((prev) => [newAct, ...prev.slice(0, 9)]);
  };

  const addMunsyi = (newMunsyi: Omit<Munsyi, 'id'>) => {
    const newId = `M${String(munsyiList.length + 1).padStart(3, '0')}`;
    const item: Munsyi = { id: newId, ...newMunsyi };
    setMunsyiList((prev) => [item, ...prev]);
    addActivity('Menambah rekod Munsyi', `${item.nama} (${item.negeri})`);
    addToast(`Munsyi ${item.nama} berjaya didaftarkan!`, 'success');
  };

  const updateMunsyi = (updated: Munsyi) => {
    setMunsyiList((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    addActivity('Mengemaskini maklumat Munsyi', `${updated.nama} (${updated.negeri})`);
    addToast(`Maklumat Munsyi ${updated.nama} berjaya dikemaskini!`, 'success');
  };

  const deleteMunsyi = (id: string) => {
    const target = munsyiList.find((m) => m.id === id);
    if (target) {
      setMunsyiList((prev) => prev.filter((m) => m.id !== id));
      addActivity('Memadam rekod Munsyi', `${target.nama} (${target.negeri})`);
      addToast(`Munsyi ${target.nama} berjaya dipadamkan!`, 'success');
    }
  };

  const updateSettings = (newSettings: Tetapan) => {
    setSettings(newSettings);
    addActivity('Kemaskini Tetapan Sistem', `Nama Sistem: ${newSettings.namaSistem}`);
    addToast('Tetapan sistem berjaya disimpan!', 'success');
  };

  const updateProfil = (newProfil: AdminProfil) => {
    setProfil(newProfil);
    addActivity('Kemaskini Profil Admin', `Nama: ${newProfil.nama}`);
    addToast('Profil pentadbir berjaya dikemaskini!', 'success');
  };

  const importBulkData = (bulkData: Munsyi[]) => {
    setMunsyiList((prev) => {
      // Avoid duplicate NoKP if possible, or just merge
      const existingKPs = new Set(prev.map(p => p.noKP));
      const filteredNew = bulkData.filter(b => !existingKPs.has(b.noKP));
      return [...filteredNew, ...prev];
    });
    addActivity('Import Data Bulk', `Mengimport ${bulkData.length} rekod Munsyi baharu`);
    addToast(`${bulkData.length} rekod berjaya diimport ke dalam sistem!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        munsyiList,
        settings,
        profil,
        recentActivities,
        toasts,
        isAuthenticated,
        activeTab,
        addToast,
        removeToast,
        login,
        logout,
        addMunsyi,
        updateMunsyi,
        deleteMunsyi,
        updateSettings,
        updateProfil,
        setActiveTab,
        importBulkData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
