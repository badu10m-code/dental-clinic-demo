import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth, signInWithGoogle, logOut } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import {
  Appointment,
  Patient,
  Post,
  Banner,
  ClinicConfig,
  AppointmentStatus,
  ArticleItem,
} from '../types';
import { ARTICLES_DATA } from '../data/articles';

const STORAGE_KEYS = {
  appt: 'scd2_appointments',
  pat: 'scd2_patients',
  post: 'scd2_posts',
  art: 'scd2_articles',
  cfg: 'scd2_settings',
  ban: 'scd2_banners',
  ovr: 'scd2_overrides',
};

export const DEFAULT_CFG: ClinicConfig = {
  name: 'SmileCraft Dental Studio',
  phone: '+91 98765 43210',
  phoneRaw: '+919876543210',
  whatsapp: '919876543210',
  address: '302, Pearl Heights, Veera Desai Road, Andheri West, Mumbai 400053',
  hours: 'Mon to Sat 10:00 AM to 8:00 PM · Sunday by appointment',
  mapQuery: 'Veera Desai Road, Andheri West, Mumbai',
};

const BOOTSTRAP_ADMIN_EMAIL = 'sudipta2santra@gmail.com';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeStorage<T>(key: string, val: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch (e) {
    return false;
  }
}

function generateRef(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = 'SCD-';
  for (let i = 0; i < 6; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

function getDateOffset(days: number): string {
  const t = new Date();
  t.setDate(t.getDate() + days);
  return t.toISOString().slice(0, 10);
}

function getInitialSeed(): {
  appts: Appointment[];
  patients: Patient[];
  posts: Post[];
  banners: Banner[];
  cfg: ClinicConfig;
  ovr: Record<string, { title?: string; cat?: string }>;
} {
  const now = new Date().toISOString();
  const ct = (n: number) => new Date(getDateOffset(n) + 'T09:15:00').toISOString();

  const seedAppts: Appointment[] = [
    {
      ref: 'SCD-M4KD2A',
      name: 'Priya Nair',
      phone: '+91 98200 11223',
      service: 'Root Canal Treatment',
      doctor: 'Dr. Ananya Sharma',
      date: getDateOffset(0),
      slot: '11:00 AM',
      note: 'Sensitive to cold since last week.',
      source: 'online',
      status: 'new',
      created: ct(0),
    },
    {
      ref: 'SCD-Q8WB7T',
      name: 'Arjun Mehta',
      phone: '+91 98330 44190',
      service: 'Dental Implant Consultation',
      doctor: 'Dr. Rohan Mehta',
      date: getDateOffset(0),
      slot: '5:30 PM',
      note: 'Second opinion on implant plan.',
      source: 'call',
      status: 'confirmed',
      created: ct(0),
    },
    {
      ref: 'SCD-T2NP9C',
      name: 'Farah Shaikh',
      phone: '+91 99201 77845',
      service: 'Kids Dentistry',
      doctor: 'Dr. Ananya Sharma',
      date: getDateOffset(-1),
      slot: '4:00 PM',
      note: 'First dental checkup for 6-year-old daughter.',
      source: 'online',
      status: 'done',
      created: ct(-1),
    },
    {
      ref: 'SCD-K7VX3R',
      name: 'Rohit Verma',
      phone: '+91 98110 20394',
      service: 'Teeth Whitening',
      doctor: 'Dr. Rohan Mehta',
      date: getDateOffset(0),
      slot: '2:00 PM',
      note: 'Wedding in family next month.',
      source: 'online',
      status: 'new',
      created: ct(0),
    },
    {
      ref: 'SCD-L9BR1Y',
      name: 'Sneha Kulkarni',
      phone: '+91 99870 55123',
      service: 'Braces / Clear Aligners',
      doctor: 'Dr. Rohan Mehta',
      date: getDateOffset(-2),
      slot: '6:00 PM',
      note: 'Interested in invisible aligner simulation.',
      source: 'call',
      status: 'done',
      created: ct(-2),
    },
    {
      ref: 'SCD-F3MJ8W',
      name: 'Imran Qureshi',
      phone: '+91 98209 33012',
      service: 'Tooth pain / emergency',
      doctor: 'Dr. Ananya Sharma',
      date: getDateOffset(-2),
      slot: '10:00 AM',
      note: 'Severe throbbing molar pain.',
      source: 'call',
      status: 'done',
      created: ct(-2),
    },
    {
      ref: 'SCD-V6PT4D',
      name: 'Meera Iyer',
      phone: '+91 99670 81245',
      service: 'Cleaning & polishing',
      doctor: 'Dr. Ananya Sharma',
      date: getDateOffset(-3),
      slot: '11:30 AM',
      note: 'Routine 6-month cleaning.',
      source: 'online',
      status: 'done',
      created: ct(-3),
    },
    {
      ref: 'SCD-B1NZ8X',
      name: 'Vikas Chauhan',
      phone: '+91 98197 66034',
      service: 'Wisdom Tooth Extraction',
      doctor: 'Dr. Rohan Mehta',
      date: getDateOffset(-4),
      slot: '4:30 PM',
      note: 'Lower left wisdom tooth impacted.',
      source: 'online',
      status: 'cancelled',
      created: ct(-4),
    },
    {
      ref: 'SCD-C2LK5J',
      name: 'Tanvi Desai',
      phone: '+91 98331 90876',
      service: 'Crowns & Bridges',
      doctor: 'Dr. Rohan Mehta',
      date: getDateOffset(-5),
      slot: '2:00 PM',
      note: 'Three units, zirconia.',
      source: 'online',
      status: 'done',
      created: ct(-5),
    },
    {
      ref: 'SCD-H5QM9S',
      name: 'Sameer Khan',
      phone: '+91 99205 44718',
      service: 'Gum Treatment',
      doctor: 'Dr. Ananya Sharma',
      date: getDateOffset(1),
      slot: '12:00 PM',
      note: 'Bleeding gums for a month.',
      source: 'online',
      status: 'new',
      created: ct(1),
    },
  ];

  const seedPatients: Patient[] = [
    { name: 'Priya Nair', phone: '+91 98200 11223', firstVisit: getDateOffset(0), visits: 1, note: 'Cold sensitivity' },
    { name: 'Arjun Mehta', phone: '+91 98330 44190', firstVisit: getDateOffset(0), visits: 1, note: 'Implant second opinion' },
    { name: 'Farah Shaikh', phone: '+91 99201 77845', firstVisit: getDateOffset(-1), visits: 1, note: 'Daughter, age 6, first visit' },
    { name: 'Rohit Verma', phone: '+91 98110 20394', firstVisit: getDateOffset(-1), visits: 1, note: '' },
    { name: 'Sneha Kulkarni', phone: '+91 99870 55123', firstVisit: getDateOffset(-2), visits: 1, note: 'Aligner simulation' },
    { name: 'Imran Qureshi', phone: '+91 98209 33012', firstVisit: getDateOffset(-2), visits: 1, note: 'Emergency' },
    { name: 'Meera Iyer', phone: '+91 99670 81245', firstVisit: getDateOffset(-3), visits: 1, note: '' },
    { name: 'Vikas Chauhan', phone: '+91 98197 66034', firstVisit: getDateOffset(-4), visits: 1, note: '' },
    { name: 'Tanvi Desai', phone: '+91 98331 90876', firstVisit: getDateOffset(-5), visits: 1, note: 'Zirconia x3' },
    { name: 'Sameer Khan', phone: '+91 99205 44718', firstVisit: getDateOffset(1), visits: 1, note: 'Gum treatment' },
  ];

  const seedPosts: Post[] = [
    {
      id: 'p-camp',
      title: "Free kids' dental camp this Sunday",
      category: 'updates',
      image: '/assets/img/blog-kids.jpg',
      body: "This Sunday the studio runs a free checkup camp for children under 12, from 10 AM to 1 PM. No appointment needed, walk in with the kids.\n\nEvery child gets a full checkup, a brushing demo, and a fluoride varnish if needed. Bring their old reports if you have them.",
      created: now,
    },
    {
      id: 'p-scanner',
      title: 'New 3D Intraoral Scanner installed',
      category: 'announcements',
      image: '/assets/img/clinic-chair.jpg',
      body: 'We have upgraded our digital dentistry suite with a state-of-the-art 3D intraoral scanner. Say goodbye to uncomfortable putty impressions for crowns, bridges, and aligners.',
      created: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ];

  const seedBanners: Banner[] = [
    {
      id: 'b1',
      type: 'template',
      template: 'festival',
      title: 'Dussehra & Diwali special: 20% off on scaling & dental checkups',
      sub: 'Valid till 30 November · Book online or WhatsApp our front desk',
      cta: 'Book now',
      link: '/contact#book',
      active: true,
      created: now,
    },
    {
      id: 'b2',
      type: 'template',
      template: 'welcome',
      title: 'Now accepting new patient registrations',
      sub: 'Same-week appointments with MDS specialists in Andheri West',
      cta: 'Book a visit',
      link: '/contact#book',
      active: true,
      created: now,
    },
  ];

  return {
    appts: seedAppts,
    patients: seedPatients,
    posts: seedPosts,
    banners: seedBanners,
    cfg: DEFAULT_CFG,
    ovr: {},
  };
}

export interface ClinicStoreContextType {
  appointments: Appointment[];
  patients: Patient[];
  posts: Post[];
  articles: ArticleItem[];
  banners: Banner[];
  config: ClinicConfig;
  overrides: Record<string, { title?: string; cat?: string }>;
  toast: string | null;
  showToast: (msg: string) => void;
  addAppointment: (appt: Omit<Appointment, 'ref' | 'created'>) => Appointment;
  updateAppointmentStatus: (ref: string, status: AppointmentStatus) => void;
  updateAppointmentSlot: (ref: string, slot: string) => void;
  deleteAppointment: (ref: string) => void;
  addPatient: (patient: Patient) => void;
  removePatient: (index: number) => void;
  addPost: (post: Omit<Post, 'id' | 'created'>) => Post;
  deletePost: (id: string) => void;
  addArticle: (article: ArticleItem) => void;
  updateArticle: (slug: string, article: Partial<ArticleItem>) => void;
  deleteArticle: (slug: string) => void;
  addBanner: (banner: Omit<Banner, 'id' | 'created'>) => Banner;
  toggleBanner: (id: string) => void;
  deleteBanner: (id: string) => void;
  updateConfig: (cfg: Partial<ClinicConfig>) => void;
  generateRef: () => string;
  syncAllToFirebase: () => Promise<void>;
  // Firebase State
  currentUser: User | null;
  isAdmin: boolean;
  isFirebaseReady: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const ClinicStoreContext = createContext<ClinicStoreContextType | null>(null);

export const ClinicStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const seed = getInitialSeed();

  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    readStorage(STORAGE_KEYS.appt, seed.appts)
  );
  const [patients, setPatients] = useState<Patient[]>(() =>
    readStorage(STORAGE_KEYS.pat, seed.patients)
  );
  const [posts, setPosts] = useState<Post[]>(() =>
    readStorage(STORAGE_KEYS.post, seed.posts)
  );
  const [articles, setArticles] = useState<ArticleItem[]>(() =>
    readStorage(STORAGE_KEYS.art, ARTICLES_DATA)
  );
  const [banners, setBanners] = useState<Banner[]>(() =>
    readStorage(STORAGE_KEYS.ban, seed.banners)
  );
  const [config, setConfig] = useState<ClinicConfig>(() =>
    readStorage(STORAGE_KEYS.cfg, seed.cfg)
  );
  const [overrides] = useState<Record<string, { title?: string; cat?: string }>>(() =>
    readStorage(STORAGE_KEYS.ovr, seed.ovr)
  );

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isFirebaseReady, setIsFirebaseReady] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // 1. Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsFirebaseReady(true);
      if (user) {
        const isOwner =
          user.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase();
        setIsAdmin(isOwner);

        // Check or register admin doc if owner
        if (isOwner) {
          try {
            const adminDocRef = doc(db, 'admins', user.uid);
            const snap = await getDoc(adminDocRef);
            if (!snap.exists()) {
              await setDoc(adminDocRef, {
                email: user.email,
                role: 'admin',
                createdAt: new Date().toISOString(),
              });
            }
          } catch (e) {
            console.warn('Admin doc check skipped or not needed:', e);
          }
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Listeners for public content (Posts, Articles, Banners, Settings)
  useEffect(() => {
    // Posts listener
    const unsubPosts = onSnapshot(
      collection(db, 'posts'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedPosts: Post[] = [];
          snapshot.forEach((d) => loadedPosts.push(d.data() as Post));
          loadedPosts.sort((a, b) => b.created.localeCompare(a.created));
          setPosts(loadedPosts);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'posts');
      }
    );

    // Articles listener
    const unsubArticles = onSnapshot(
      collection(db, 'articles'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedArticles: ArticleItem[] = [];
          snapshot.forEach((d) => loadedArticles.push(d.data() as ArticleItem));
          setArticles(loadedArticles);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'articles');
      }
    );

    // Banners listener
    const unsubBanners = onSnapshot(
      collection(db, 'banners'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedBanners: Banner[] = [];
          snapshot.forEach((d) => loadedBanners.push(d.data() as Banner));
          setBanners(loadedBanners);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'banners');
      }
    );

    // Settings listener
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'clinic'),
      (snapshot) => {
        if (snapshot.exists()) {
          setConfig(snapshot.data() as ClinicConfig);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'settings/clinic');
      }
    );

    return () => {
      unsubPosts();
      unsubArticles();
      unsubBanners();
      unsubSettings();
    };
  }, []);

  // 3. Admin-only Appointments & Patients Listener (when authenticated as Admin)
  useEffect(() => {
    if (!isAdmin) return;

    const unsubAppts = onSnapshot(
      collection(db, 'appointments'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedAppts: Appointment[] = [];
          snapshot.forEach((d) => loadedAppts.push(d.data() as Appointment));
          loadedAppts.sort((a, b) => b.created.localeCompare(a.created));
          setAppointments(loadedAppts);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'appointments');
      }
    );

    const unsubPatients = onSnapshot(
      collection(db, 'patients'),
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedPatients: Patient[] = [];
          snapshot.forEach((d) => loadedPatients.push(d.data() as Patient));
          setPatients(loadedPatients);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'patients');
      }
    );

    return () => {
      unsubAppts();
      unsubPatients();
    };
  }, [isAdmin]);

  // Sync to localStorage as offline safety
  useEffect(() => {
    writeStorage(STORAGE_KEYS.appt, appointments);
  }, [appointments]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.pat, patients);
  }, [patients]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.post, posts);
  }, [posts]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.art, articles);
  }, [articles]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.ban, banners);
  }, [banners]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cfg, config);
  }, [config]);

  // Seed Firestore if initial collections are empty upon admin login
  useEffect(() => {
    if (!isAdmin) return;
    const seedCloudIfEmpty = async () => {
      try {
        const postsSnap = await getDocs(collection(db, 'posts'));
        if (postsSnap.empty) {
          for (const p of seed.posts) {
            await setDoc(doc(db, 'posts', p.id), p);
          }
        }

        const articlesSnap = await getDocs(collection(db, 'articles'));
        if (articlesSnap.empty) {
          for (const a of ARTICLES_DATA) {
            await setDoc(doc(db, 'articles', a.slug), a);
          }
        }

        const banSnap = await getDocs(collection(db, 'banners'));
        if (banSnap.empty) {
          for (const b of seed.banners) {
            await setDoc(doc(db, 'banners', b.id), b);
          }
        }

        const cfgSnap = await getDoc(doc(db, 'settings', 'clinic'));
        if (!cfgSnap.exists()) {
          await setDoc(doc(db, 'settings', 'clinic'), DEFAULT_CFG);
        }

        const apptSnap = await getDocs(collection(db, 'appointments'));
        if (apptSnap.empty) {
          for (const a of seed.appts) {
            await setDoc(doc(db, 'appointments', a.ref), a);
          }
        }

        const patSnap = await getDocs(collection(db, 'patients'));
        if (patSnap.empty) {
          for (let i = 0; i < seed.patients.length; i++) {
            const p = seed.patients[i];
            const patId = `pat-${i + 1}`;
            await setDoc(doc(db, 'patients', patId), p);
          }
        }
      } catch (err) {
        console.warn('Initial Firestore seed check:', err);
      }
    };

    seedCloudIfEmpty();
  }, [isAdmin]);

  // Actions
  const addAppointment = (apptData: Omit<Appointment, 'ref' | 'created'>): Appointment => {
    const newAppt: Appointment = {
      ...apptData,
      ref: generateRef(),
      created: new Date().toISOString(),
    };
    const updated = [newAppt, ...appointments];
    setAppointments(updated);

    // Sync to Firestore
    setDoc(doc(db, 'appointments', newAppt.ref), newAppt).catch((err) => {
      console.error('Firestore appointment write error:', err);
      handleFirestoreError(err, OperationType.CREATE, `appointments/${newAppt.ref}`);
    });

    // Also update patients ledger
    const digits = newAppt.phone.replace(/\D/g, '');
    const exIndex = patients.findIndex(
      (p) => p.phone.replace(/\D/g, '') === digits
    );
    if (exIndex >= 0) {
      const updatedPatients = [...patients];
      updatedPatients[exIndex] = {
        ...updatedPatients[exIndex],
        visits: (updatedPatients[exIndex].visits || 1) + 1,
      };
      setPatients(updatedPatients);
    } else {
      const newPatient: Patient = {
        name: newAppt.name,
        phone: newAppt.phone,
        firstVisit: newAppt.date,
        visits: 1,
        note: newAppt.source === 'call' ? 'Added at desk' : 'Booked online',
      };
      setPatients([newPatient, ...patients]);
    }

    return newAppt;
  };

  const updateAppointmentStatus = (ref: string, status: AppointmentStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.ref === ref ? { ...a, status } : a))
    );
    showToast(`Status updated: ${status}`);

    updateDoc(doc(db, 'appointments', ref), { status }).catch((err) => {
      console.warn('Firestore updateAppointmentStatus fallback:', err);
    });
  };

  const updateAppointmentSlot = (ref: string, slot: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.ref === ref ? { ...a, slot } : a))
    );
    showToast(`Time slot updated: ${slot}`);

    updateDoc(doc(db, 'appointments', ref), { slot }).catch((err) => {
      console.warn('Firestore updateAppointmentSlot fallback:', err);
    });
  };

  const deleteAppointment = (ref: string) => {
    setAppointments((prev) => prev.filter((a) => a.ref !== ref));
    showToast('Appointment deleted');

    deleteDoc(doc(db, 'appointments', ref)).catch((err) => {
      console.warn('Firestore deleteAppointment fallback:', err);
    });
  };

  const addPatient = (patient: Patient) => {
    setPatients((prev) => [patient, ...prev]);
    showToast('Patient added to ledger');

    const patId = `pat-${Date.now()}`;
    setDoc(doc(db, 'patients', patId), patient).catch((err) => {
      console.warn('Firestore addPatient fallback:', err);
    });
  };

  const removePatient = (index: number) => {
    setPatients((prev) => prev.filter((_, i) => i !== index));
    showToast('Patient record removed');
  };

  const addPost = (postData: Omit<Post, 'id' | 'created'>): Post => {
    const newPost: Post = {
      ...postData,
      id: `p-${Date.now()}`,
      created: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast('Published to clinic updates');

    setDoc(doc(db, 'posts', newPost.id), newPost).catch((err) => {
      console.warn('Firestore addPost fallback:', err);
    });
    return newPost;
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    showToast('Post removed');

    deleteDoc(doc(db, 'posts', id)).catch((err) => {
      console.warn('Firestore deletePost fallback:', err);
    });
  };

  const addArticle = (articleData: ArticleItem) => {
    setArticles((prev) => [articleData, ...prev.filter((a) => a.slug !== articleData.slug)]);
    showToast('Article published to Firebase');

    setDoc(doc(db, 'articles', articleData.slug), articleData).catch((err) => {
      console.warn('Firestore addArticle fallback:', err);
    });
  };

  const updateArticle = (slug: string, articleData: Partial<ArticleItem>) => {
    setArticles((prev) =>
      prev.map((a) => (a.slug === slug ? { ...a, ...articleData } : a))
    );
    showToast('Article updated');

    updateDoc(doc(db, 'articles', slug), articleData).catch((err) => {
      console.warn('Firestore updateArticle fallback:', err);
    });
  };

  const deleteArticle = (slug: string) => {
    setArticles((prev) => prev.filter((a) => a.slug !== slug));
    showToast('Article removed');

    deleteDoc(doc(db, 'articles', slug)).catch((err) => {
      console.warn('Firestore deleteArticle fallback:', err);
    });
  };

  const addBanner = (bannerData: Omit<Banner, 'id' | 'created'>): Banner => {
    const newBanner: Banner = {
      ...bannerData,
      id: `b${Date.now()}`,
      created: new Date().toISOString(),
    };
    setBanners((prev) => [newBanner, ...prev]);
    showToast('Banner created and active');

    setDoc(doc(db, 'banners', newBanner.id), newBanner).catch((err) => {
      console.warn('Firestore addBanner fallback:', err);
    });
    return newBanner;
  };

  const toggleBanner = (id: string) => {
    setBanners((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextActive = !b.active;
          showToast(nextActive ? 'Banner is live' : 'Banner hidden');
          updateDoc(doc(db, 'banners', b.id), { active: nextActive }).catch((err) => {
            console.warn('Firestore toggleBanner fallback:', err);
          });
          return { ...b, active: nextActive };
        }
        return b;
      })
    );
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    showToast('Banner deleted');

    deleteDoc(doc(db, 'banners', id)).catch((err) => {
      console.warn('Firestore deleteBanner fallback:', err);
    });
  };

  const updateConfig = (cfg: Partial<ClinicConfig>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...cfg };
      if (updated.phone) {
        updated.phoneRaw = updated.phone.replace(/\s+/g, '');
      }
      if (updated.whatsapp) {
        updated.whatsapp = updated.whatsapp.replace(/\D/g, '');
      }
      setDoc(doc(db, 'settings', 'clinic'), updated).catch((err) => {
        console.warn('Firestore updateConfig fallback:', err);
      });
      return updated;
    });
    showToast('Clinic settings saved');
  };

  const syncAllToFirebase = async () => {
    try {
      showToast('Syncing all data to Firebase Firestore...');

      // 1. Settings
      await setDoc(doc(db, 'settings', 'clinic'), config);

      // 2. Banners
      for (const b of banners) {
        await setDoc(doc(db, 'banners', b.id), b);
      }

      // 3. Posts
      for (const p of posts) {
        await setDoc(doc(db, 'posts', p.id), p);
      }

      // 4. Articles
      for (const a of articles) {
        await setDoc(doc(db, 'articles', a.slug), a);
      }

      // 5. Appointments
      for (const a of appointments) {
        await setDoc(doc(db, 'appointments', a.ref), a);
      }

      // 6. Patients
      for (let i = 0; i < patients.length; i++) {
        const p = patients[i];
        const patId = `pat-${i + 1}`;
        await setDoc(doc(db, 'patients', patId), p);
      }

      showToast('All data synced to Firebase successfully!');
    } catch (err: any) {
      console.error('Firebase sync error:', err);
      showToast(err?.message || 'Sync failed: ensure admin is signed in');
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithGoogle();
      showToast('Signed in successfully');
    } catch (e: any) {
      console.error('Google sign in error:', e);
      showToast(e?.message || 'Failed to sign in with Google');
    }
  };

  const logout = async () => {
    try {
      await logOut();
      showToast('Signed out');
    } catch (e: any) {
      console.error('Logout error:', e);
      showToast('Error signing out');
    }
  };

  return (
    <ClinicStoreContext.Provider
      value={{
        appointments,
        patients,
        posts,
        articles,
        banners,
        config,
        overrides,
        toast,
        showToast,
        addAppointment,
        updateAppointmentStatus,
        updateAppointmentSlot,
        deleteAppointment,
        addPatient,
        removePatient,
        addPost,
        deletePost,
        addArticle,
        updateArticle,
        deleteArticle,
        addBanner,
        toggleBanner,
        deleteBanner,
        updateConfig,
        generateRef,
        syncAllToFirebase,
        currentUser,
        isAdmin,
        isFirebaseReady,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#09382e] text-white px-6 py-3 rounded-full shadow-2xl text-sm font-medium animate-bounce border border-emerald-500/30">
          {toast}
        </div>
      )}
    </ClinicStoreContext.Provider>
  );
};

export const useClinicStore = () => {
  const context = useContext(ClinicStoreContext);
  if (!context) {
    throw new Error('useClinicStore must be used within ClinicStoreProvider');
  }
  return context;
};
