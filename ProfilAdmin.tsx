import { Munsyi } from '../types';

export const SENARAI_NEGERI = [
  'Selangor',
  'Johor',
  'Perak',
  'Kedah',
  'Pulau Pinang',
  'Kelantan',
  'Terengganu',
  'Pahang',
  'Melaka',
  'Negeri Sembilan',
  'Sabah',
  'Sarawak',
  'WP Kuala Lumpur',
  'Perlis',
  'WP Putrajaya'
];

export const SENARAI_BIDANG = [
  'Tatabahasa',
  'Sastera Kebangsaan',
  'Penulisan Kreatif',
  'Peristilahan & Leksikografi',
  'Terjemahan',
  'Seni Pengacaraan',
  'Debat & Pidato',
  'Bahasa Melayu Kerjaya'
];

export const DUMMY_MUNSYI_LIST: Munsyi[] = [
  {
    id: 'M001',
    nama: 'Dr. Ahmad Syahmi bin Razak',
    noKP: '820415-14-5231',
    negeri: 'Selangor',
    bidang: 'Tatabahasa',
    status: 'Lulus',
    tahun: '2022'
  },
  {
    id: 'M002',
    nama: 'Prof. Madya Dr. Siti Nurhaliza binti Mansor',
    noKP: '780912-08-5432',
    negeri: 'Perak',
    bidang: 'Sastera Kebangsaan',
    status: 'Lulus',
    tahun: '2020'
  },
  {
    id: 'M003',
    nama: 'Encik Tan Kah Seng',
    noKP: '851104-01-6387',
    negeri: 'Johor',
    bidang: 'Penulisan Kreatif',
    status: 'Lulus',
    tahun: '2023'
  },
  {
    id: 'M004',
    nama: 'Puan Subramaniam a/p Meena',
    noKP: '900223-10-5896',
    negeri: 'WP Kuala Lumpur',
    bidang: 'Terjemahan',
    status: 'Belum Lulus',
    tahun: '2024'
  },
  {
    id: 'M005',
    nama: 'Cik Farah Hanim binti Zainal',
    noKP: '930701-03-5124',
    negeri: 'Kelantan',
    bidang: 'Seni Pengacaraan',
    status: 'Lulus',
    tahun: '2021'
  },
  {
    id: 'M006',
    nama: 'Encik Khairul Azhar bin Ramli',
    noKP: '880530-02-5567',
    negeri: 'Kedah',
    bidang: 'Debat & Pidato',
    status: 'Belum Lulus',
    tahun: '2024'
  },
  {
    id: 'M007',
    nama: 'Dr. Wong Siew Lan',
    noKP: '751218-13-5046',
    negeri: 'Sarawak',
    bidang: 'Peristilahan & Leksikografi',
    status: 'Lulus',
    tahun: '2019'
  },
  {
    id: 'M008',
    nama: 'Puan Maznah binti Abu Bakar',
    noKP: '811005-11-5368',
    negeri: 'Terengganu',
    bidang: 'Tatabahasa',
    status: 'Lulus',
    tahun: '2021'
  },
  {
    id: 'M009',
    nama: 'Encik Awangku Salleh bin Pengiran',
    noKP: '870314-12-5099',
    negeri: 'Sabah',
    bidang: 'Bahasa Melayu Kerjaya',
    status: 'Belum Lulus',
    tahun: '2024'
  },
  {
    id: 'M010',
    nama: 'Dr. Mohd Ridzuan bin Ismail',
    noKP: '800620-06-5531',
    negeri: 'Pahang',
    bidang: 'Sastera Kebangsaan',
    status: 'Lulus',
    tahun: '2018'
  },
  {
    id: 'M011',
    nama: 'Puan Lim Siew Mei',
    noKP: '890115-07-5642',
    negeri: 'Pulau Pinang',
    bidang: 'Terjemahan',
    status: 'Lulus',
    tahun: '2022'
  },
  {
    id: 'M012',
    nama: 'Tuan Haji Razali bin Mohamad',
    noKP: '680808-04-5115',
    negeri: 'Melaka',
    bidang: 'Tatabahasa',
    status: 'Lulus',
    tahun: '2015'
  }
];

export const INITIAL_TETAPAN = {
  namaSistem: 'Sistem Pengurusan Maklumat Munsyi Dewan (SPMDM)',
  namaOrganisasi: 'Dewan Bahasa dan Pustaka (DBP)',
  tahun: '2026',
  logo: 'https://images.unsplash.com/photo-1594007654729-407edd1a22c1?q=80&w=200&auto=format&fit=crop', // A nice bookish/official logo mockup
  primaryColor: '#2563EB', // Biru
  secondaryColor: '#10B981', // Hijau
  isDarkMode: false
};

export const INITIAL_PROFIL = {
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
  nama: 'Osman bin Mansur',
  emel: 'osman.munsyi@dbp.gov.my',
  jawatan: 'Pentadbir Sistem Utama (Senior Admin)',
  telefon: '+60 13-456 7890'
};

export const RECENT_ACTIVITIES = [
  {
    id: 'act1',
    user: 'Osman bin Mansur',
    action: 'Menambah rekod Munsyi baharu',
    detail: 'Encik Tan Kah Seng (Johor)',
    time: '10 minit lepas'
  },
  {
    id: 'act2',
    user: 'Sistem',
    action: 'Import data selesai',
    detail: 'Mengimport 120 rekod dari fail CSV',
    time: '1 jam lepas'
  },
  {
    id: 'act3',
    user: 'Osman bin Mansur',
    action: 'Mengemaskini status permohonan',
    detail: 'Puan Subramaniam a/p Meena -> Belum Lulus',
    time: '2 jam lepas'
  },
  {
    id: 'act4',
    user: 'Osman bin Mansur',
    action: 'Menukar tetapan sistem',
    detail: 'Menukar Nama Organisasi kepada Dewan Bahasa dan Pustaka',
    time: 'Semalam'
  }
];
