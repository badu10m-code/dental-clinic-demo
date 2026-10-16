export type AppointmentStatus = 'new' | 'confirmed' | 'done' | 'cancelled';
export type AppointmentSource = 'online' | 'call';

export interface Appointment {
  ref: string;
  name: string;
  phone: string;
  service: string;
  doctor: string;
  date: string;
  slot: string;
  note: string;
  source: AppointmentSource;
  status: AppointmentStatus;
  created: string;
}

export interface Patient {
  name: string;
  phone: string;
  firstVisit: string;
  visits: number;
  note: string;
}

export interface Post {
  id: string;
  title: string;
  category: string;
  image?: string;
  body: string;
  created: string;
}

export interface Banner {
  id: string;
  type: 'template' | 'image';
  template?: 'festival' | 'welcome' | string;
  title: string;
  sub: string;
  cta: string;
  link: string;
  img?: string;
  active: boolean;
  created: string;
}

export interface ClinicConfig {
  name: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  address: string;
  hours: string;
  mapQuery: string;
}

export interface ArticleItem {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
  summary: string;
  sections: {
    heading?: string;
    text: string;
    callout?: string;
    bullets?: string[];
  }[];
  related?: { slug: string; title: string }[];
}
