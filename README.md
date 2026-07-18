import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Palette,
  Eye,
  Building,
  Calendar,
  Image as ImageIcon,
  Sun,
  Moon,
  Save,
  Undo
} from 'lucide-react';

export const Tetapan: React.FC = () => {
  const { settings, updateSettings, addToast } = useApp();

  const [namaSistem, setNamaSistem] = useState(settings.namaSistem);
  const [namaOrganisasi, setNamaOrganisasi] = useState(settings.namaOrganisasi);
  const [tahun, setTahun] = useState(settings.tahun);
  const [logo, setLogo] = useState(settings.logo);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(settings.secondaryColor);
  const [isDarkMode, setIsDarkMode] = useState(settings.isDarkMode);

  // Preset colors for professional UI
  const PRIMARY_PRESETS = [
    { name: 'Biru DBP', hex: '#2563EB' },
    { name: 'Sian Indigo', hex: '#06B6D4' },
    { name: 'Ungu Korporat', hex: '#6D28D9' },
    { name: 'Slate Klasik', hex: '#1E293B' },
    { name: 'Merah Kebangsaan', hex: '#DC2626' }
  ];

  const SECONDARY_PRESETS = [
    { name: 'Hijau Sukses', hex: '#10B981' },
    { name: 'Smaragdus', hex: '#059669' },
    { name: 'Amber', hex: '#F59E0B' },
    { name: 'Emas Diraja', hex: '#D97706' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaSistem.trim() || !namaOrganisasi.trim() || !tahun.trim()) {
      addToast('Sila lengkapkan semua medan mandatori!', 'error');
      return;
    }

    updateSettings({
      namaSistem: namaSistem.trim(),
      namaOrganisasi: namaOrganisasi.trim(),
      tahun: tahun.trim(),
      logo: logo.trim(),
      primaryColor,
      secondaryColor,
      isDarkMode
    });
  };

  const handleResetDefaults = () => {
    setNamaSistem('Sistem Pengurusan Maklumat Munsyi Dewan (SPMDM)');
    setNamaOrganisasi('Dewan Bahasa dan Pustaka (DBP)');
    setTahun('2026');
    setLogo('https://images.unsplash.com/photo-1594007654729-407edd1a22c1?q=80&w=200&auto=format&fit=crop');
    setPrimaryColor('#2563EB');
    setSecondaryColor('#10B981');
    setIsDarkMode(false);
    addToast('Borang diset semula kepada nilai lalai korporat.', 'info');
  };

  return (
    <div id="settings-page" className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Tetapan Sistem SPMDM</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ubah suai konfigurasi sistem, jenama organisasi, dan penampilan visual sistem
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Form Card */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-50 dark:border-slate-800">
            <Settings className="w-5 h-5 text-blue-500" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">Konfigurasi Maklumat Utama</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama Sistem */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Nama Sistem Utama <span className="text-rose-500">*</span>
              </label>
              <input
                id="setting-nama-sistem"
                type="text"
                required
                value={namaSistem}
                onChange={(e) => setNamaSistem(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium"
              />
            </div>

            {/* Nama Organisasi */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Nama Organisasi Pentadbir <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Building className="w-4 h-4" />
                </span>
                <input
                  id="setting-nama-org"
                  type="text"
                  required
                  value={namaOrganisasi}
                  onChange={(e) => setNamaOrganisasi(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Tahun Operasi */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Tahun Semasa Sistem <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                </span>
                <input
                  id="setting-tahun"
                  type="text"
                  required
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Logo URL */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Pautan URL Logo Sistem
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <ImageIcon className="w-4 h-4" />
                </span>
                <input
                  id="setting-logo"
                  type="text"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            {/* Color Palette customization */}
            <div className="space-y-3 md:col-span-2 pt-2 border-t border-slate-50 dark:border-slate-800 mt-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-slate-500" />
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Pilihan Warna Jenama Sistem
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Color selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Warna Utama (Primary)</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="primary-color-picker"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input
                      id="primary-color-text"
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-24 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-mono"
                    />
                  </div>
                  {/* Presets */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {PRIMARY_PRESETS.map((p) => (
                      <button
                        key={p.hex}
                        id={`btn-preset-primary-${p.hex.replace('#', '')}`}
                        type="button"
                        onClick={() => setPrimaryColor(p.hex)}
                        className="w-5 h-5 rounded-md border border-slate-100 hover:scale-110 transition-transform shadow-xs"
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary Color selection */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Warna Kedua (Secondary)</label>
                  <div className="flex items-center gap-2">
                    <input
                      id="secondary-color-picker"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 border-0 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input
                      id="secondary-color-text"
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-24 px-2 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-mono"
                    />
                  </div>
                  {/* Presets */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {SECONDARY_PRESETS.map((p) => (
                      <button
                        key={p.hex}
                        id={`btn-preset-secondary-${p.hex.replace('#', '')}`}
                        type="button"
                        onClick={() => setSecondaryColor(p.hex)}
                        className="w-5 h-5 rounded-md border border-slate-100 hover:scale-110 transition-transform shadow-xs"
                        style={{ backgroundColor: p.hex }}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Mode Switch */}
            <div className="md:col-span-2 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 dark:text-white">Mod Gelap (Dark Mode)</span>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Ubah penampilan sistem mengikut keselesaan penglihatan anda
                </p>
              </div>
              <button
                id="btn-toggle-dark-mode"
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDarkMode ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out flex items-center justify-center text-[10px] ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-600" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                </span>
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-50 dark:border-slate-800 mt-6">
            <button
              id="setting-reset-btn"
              type="button"
              onClick={handleResetDefaults}
              className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-800"
            >
              <Undo className="w-4 h-4" />
              <span>Set Semula Lalai</span>
            </button>
            <button
              id="setting-save-btn"
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white rounded-xl shadow-md hover:scale-[1.02] cursor-pointer transition-all flex items-center gap-1.5"
              style={{
                backgroundColor: settings.primaryColor,
                boxShadow: `0 4px 12px -3px ${settings.primaryColor}50`
              }}
            >
              <Save className="w-4 h-4" />
              <span>Simpan Tetapan</span>
            </button>
          </div>
        </form>

        {/* Live Preview of logo and system info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] p-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 self-start pb-3 border-b border-slate-50 dark:border-slate-800 w-full mb-5">
              <Eye className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Pratinjau Jenama</h4>
            </div>

            {/* Visual Logo Mockup */}
            <div className="relative group w-24 h-24 rounded-2xl overflow-hidden shadow-md mb-4 border border-slate-100 dark:border-slate-800">
              <img
                src={logo || 'https://images.unsplash.com/photo-1594007654729-407edd1a22c1?q=80&w=200&auto=format&fit=crop'}
                alt="Logo sistem"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h5 className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
              {namaSistem}
            </h5>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-semibold uppercase tracking-wider">
              {namaOrganisasi}
            </p>

            {/* Layout Palette Showcase */}
            <div className="w-full mt-6 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl space-y-3 border border-slate-100 dark:border-slate-800/80">
              <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 text-left uppercase tracking-wider">Warna Dipilih</div>
              <div className="flex gap-4">
                <div className="flex-1 flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-2xs border dark:border-slate-800">
                  <span className="w-5 h-5 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-slate-400">UTAMA</div>
                    <code className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{primaryColor}</code>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-2xs border dark:border-slate-800">
                  <span className="w-5 h-5 rounded" style={{ backgroundColor: secondaryColor }} />
                  <div className="text-left">
                    <div className="text-[9px] font-bold text-slate-400">KEDUA</div>
                    <code className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{secondaryColor}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
