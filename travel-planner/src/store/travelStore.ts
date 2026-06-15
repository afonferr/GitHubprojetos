import { create } from 'zustand';
import { Trip, Location, ChecklistItem, Note, Photo } from '../types';

interface TravelStore {
  trips: Trip[];
  currentTrip: Trip | null;
  
  // Trip actions
  createTrip: (name: string, destination: string, description?: string) => void;
  updateTrip: (tripId: string, updates: Partial<Trip>) => void;
  deleteTrip: (tripId: string) => void;
  selectTrip: (tripId: string) => void;
  
  // Location actions
  addLocation: (tripId: string, location: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLocation: (tripId: string, locationId: string, updates: Partial<Location>) => void;
  deleteLocation: (tripId: string, locationId: string) => void;
  toggleFavorite: (tripId: string, locationId: string) => void;
  toggleVisited: (tripId: string, locationId: string) => void;
  addPhoto: (tripId: string, locationId: string, photo: Omit<Photo, 'id' | 'uploadedAt'>) => void;
  removePhoto: (tripId: string, locationId: string, photoId: string) => void;
  
  // Checklist actions
  addChecklistItem: (tripId: string, text: string, category?: string) => void;
  updateChecklistItem: (tripId: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  deleteChecklistItem: (tripId: string, itemId: string) => void;
  toggleChecklistItem: (tripId: string, itemId: string) => void;
  
  // Notes actions
  addNote: (tripId: string, title: string, content: string) => void;
  updateNote: (tripId: string, noteId: string, title: string, content: string) => void;
  deleteNote: (tripId: string, noteId: string) => void;
  
  // Utility
  initializeFromStorage: () => void;
  exportTrip: (tripId: string) => string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);
const getCurrentTimestamp = () => new Date().toISOString();

const useStore = create<TravelStore>((set, get) => ({
  trips: [],
  currentTrip: null,
  
  // Trip actions
  createTrip: (name, destination, description) =>
    set((state) => {
      const newTrip: Trip = {
        id: generateId(),
        name,
        destination,
        description,
        locations: [],
        checklist: [],
        notes: [],
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      const updatedTrips = [...state.trips, newTrip];
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return { trips: updatedTrips, currentTrip: newTrip };
    }),
  
  updateTrip: (tripId, updates) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId ? { ...trip, ...updates, updatedAt: getCurrentTimestamp() } : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  deleteTrip: (tripId) =>
    set((state) => {
      const updatedTrips = state.trips.filter((trip) => trip.id !== tripId);
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? null : state.currentTrip,
      };
    }),
  
  selectTrip: (tripId) =>
    set((state) => ({
      currentTrip: state.trips.find((trip) => trip.id === tripId) || null,
    })),
  
  // Location actions
  addLocation: (tripId, location) =>
    set((state) => {
      const newLocation: Location = {
        ...location,
        id: generateId(),
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? { ...trip, locations: [...trip.locations, newLocation], updatedAt: getCurrentTimestamp() }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  updateLocation: (tripId, locationId, updates) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.map((loc) =>
                loc.id === locationId ? { ...loc, ...updates, updatedAt: getCurrentTimestamp() } : loc
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  deleteLocation: (tripId, locationId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.filter((loc) => loc.id !== locationId),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  toggleFavorite: (tripId, locationId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.map((loc) =>
                loc.id === locationId ? { ...loc, isFavorite: !loc.isFavorite, updatedAt: getCurrentTimestamp() } : loc
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  toggleVisited: (tripId, locationId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.map((loc) =>
                loc.id === locationId ? { ...loc, isVisited: !loc.isVisited, updatedAt: getCurrentTimestamp() } : loc
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  addPhoto: (tripId, locationId, photo) =>
    set((state) => {
      const newPhoto: Photo = {
        ...photo,
        id: generateId(),
        uploadedAt: getCurrentTimestamp(),
      };
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.map((loc) =>
                loc.id === locationId
                  ? { ...loc, photos: [...loc.photos, newPhoto], updatedAt: getCurrentTimestamp() }
                  : loc
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  removePhoto: (tripId, locationId, photoId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              locations: trip.locations.map((loc) =>
                loc.id === locationId
                  ? { ...loc, photos: loc.photos.filter((p) => p.id !== photoId), updatedAt: getCurrentTimestamp() }
                  : loc
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  // Checklist actions
  addChecklistItem: (tripId, text, category) =>
    set((state) => {
      const newItem: ChecklistItem = {
        id: generateId(),
        text,
        category,
        completed: false,
        createdAt: getCurrentTimestamp(),
      };
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? { ...trip, checklist: [...trip.checklist, newItem], updatedAt: getCurrentTimestamp() }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  updateChecklistItem: (tripId, itemId, updates) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.map((item) =>
                item.id === itemId ? { ...item, ...updates } : item
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  deleteChecklistItem: (tripId, itemId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.filter((item) => item.id !== itemId),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  toggleChecklistItem: (tripId, itemId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              checklist: trip.checklist.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  // Notes actions
  addNote: (tripId, title, content) =>
    set((state) => {
      const newNote: Note = {
        id: generateId(),
        title,
        content,
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? { ...trip, notes: [...trip.notes, newNote], updatedAt: getCurrentTimestamp() }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  updateNote: (tripId, noteId, title, content) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              notes: trip.notes.map((note) =>
                note.id === noteId ? { ...note, title, content, updatedAt: getCurrentTimestamp() } : note
              ),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  deleteNote: (tripId, noteId) =>
    set((state) => {
      const updatedTrips = state.trips.map((trip) =>
        trip.id === tripId
          ? {
              ...trip,
              notes: trip.notes.filter((note) => note.id !== noteId),
              updatedAt: getCurrentTimestamp(),
            }
          : trip
      );
      localStorage.setItem('travelPlannerTrips', JSON.stringify(updatedTrips));
      return {
        trips: updatedTrips,
        currentTrip: state.currentTrip?.id === tripId ? updatedTrips.find((t) => t.id === tripId) || null : state.currentTrip,
      };
    }),
  
  // Utility
  initializeFromStorage: () =>
    set(() => {
      const stored = localStorage.getItem('travelPlannerTrips');
      const trips = stored ? JSON.parse(stored) : [];
      return { trips, currentTrip: trips.length > 0 ? trips[0] : null };
    }),
  
  exportTrip: (tripId) => {
    const state = get();
    const trip = state.trips.find((t) => t.id === tripId);
    return trip ? JSON.stringify(trip, null, 2) : '';
  },
}));

export default useStore;
