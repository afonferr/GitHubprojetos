export type Category = 'monument' | 'beach' | 'restaurant' | 'activity' | 'accommodation' | 'shopping' | 'nature';

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  uploadedAt: string;
}

export interface Location {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours?: string;
  ticketPrice?: string;
  personalRating?: number;
  googleMapsUrl?: string;
  photos: Photo[];
  isFavorite: boolean;
  isVisited: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  locations: Location[];
  checklist: ChecklistItem[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category?: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
