export interface Tradition {
  id: string;
  name: string;
  state: string;
  district?: string;
  category: string;
  language?: string;
  description: string;
  history?: { year: string; event: string }[];
  location?: string;
  cover_image: string;
  gallery: string[];
  how_its_made?: { step: string; description: string; image: string }[];
  artisan_name?: string;
  artisan_bio?: string;
  artisan_image?: string;
  artisan_location?: string;
  created_at?: string;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  state: string;
  district?: string;
  bio: string;
  image: string;
  years_experience: number;
  tradition_id?: string;
}

export interface Story {
  id: string;
  title: string;
  tradition_id?: string;
  content: string;
  author: string;
  language: string;
  image: string;
  reading_time: string;
  state: string;
  category: string;
  created_at?: string;
}

export interface Contribution {
  id: string;
  title: string;
  state: string;
  district?: string;
  category: string;
  language?: string;
  description: string;
  story?: string;
  contributor_name: string;
  contributor_contact?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  entry_count: number;
}

export interface IndianState {
  name: string;
  traditionsCount: number;
  featuredTraditions: string[];
  categories: string[];
  featuredArtisans: string[];
  region: string;
}
