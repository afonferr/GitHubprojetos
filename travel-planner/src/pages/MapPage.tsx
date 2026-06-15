import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import useStore from '../store/travelStore';
import InteractiveMap from '../components/map/InteractiveMap';
import { CATEGORIES } from '../utils/constants';

const MapPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const trips = useStore((state) => state.trips);
  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return <div className="text-center py-8">Viagem não encontrada</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto p-4 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Filtros</h2>

        <div className="space-y-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-3 py-2 rounded-lg transition ${
              selectedCategory === 'all'
                ? 'bg-primary-100 text-primary-700 font-medium'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Todas as Categorias
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center gap-2 ${
                selectedCategory === cat.value
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <h3 className="font-semibold text-slate-900 mb-3">Resumo</h3>
          <div className="space-y-2 text-sm">
            <p className="text-slate-600">
              <span className="font-medium">Total de locais:</span> {trip.locations.length}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Visitados:</span>{' '}
              {trip.locations.filter((l) => l.isVisited).length}
            </p>
            <p className="text-slate-600">
              <span className="font-medium">Favoritos:</span> {trip.locations.filter((l) => l.isFavorite).length}
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        {trip.locations.length === 0 ? (
          <div className="h-full flex items-center justify-center bg-slate-100">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">Adicione locais à sua viagem para vê-los no mapa</p>
            </div>
          </div>
        ) : (
          <InteractiveMap
            locations={trip.locations}
            selectedCategory={selectedCategory as any}
          />
        )}
      </div>
    </div>
  );
};

export default MapPage;
