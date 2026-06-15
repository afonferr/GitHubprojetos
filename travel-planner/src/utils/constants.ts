import { Category } from '../types';
import { MapPin, Utensils, Bed, ShoppingBag, Leaf, Activity, Waves } from 'lucide-react';

export const CATEGORIES: { value: Category; label: string; icon: any; color: string }[] = [
  { value: 'monument', label: 'Monumentos', icon: MapPin, color: 'bg-amber-100 text-amber-700' },
  { value: 'beach', label: 'Praias', icon: Waves, color: 'bg-blue-100 text-blue-700' },
  { value: 'restaurant', label: 'Restaurantes', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
  { value: 'activity', label: 'Atividades', icon: Activity, color: 'bg-purple-100 text-purple-700' },
  { value: 'accommodation', label: 'Alojamento', icon: Bed, color: 'bg-rose-100 text-rose-700' },
  { value: 'shopping', label: 'Compras', icon: ShoppingBag, color: 'bg-pink-100 text-pink-700' },
  { value: 'nature', label: 'Natureza', icon: Leaf, color: 'bg-green-100 text-green-700' },
];

export const getCategoryInfo = (category: Category) => {
  return CATEGORIES.find((c) => c.value === category);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (date: string): string => {
  return new Date(date).toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateStats = (locations: any[]) => {
  return {
    total: locations.length,
    visited: locations.filter((l) => l.isVisited).length,
    favorites: locations.filter((l) => l.isFavorite).length,
    categories: Object.fromEntries(
      CATEGORIES.map((cat) => [cat.value, locations.filter((l) => l.category === cat.value).length])
    ),
  };
};
