import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, MapPin, Heart, Eye } from 'lucide-react';
import useStore from '../store/travelStore';
import LocationCard from '../components/locations/LocationCard';
import AddLocationModal from '../components/locations/AddLocationModal';
import { CATEGORIES } from '../utils/constants';

const LocationsPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const trips = useStore((state) => state.trips);
  const addLocation = useStore((state) => state.addLocation);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const toggleVisited = useStore((state) => state.toggleVisited);

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return <div className="text-center py-8">Viagem não encontrada</div>;
  }

  let filteredLocations = trip.locations;

  if (selectedCategory !== 'all') {
    filteredLocations = filteredLocations.filter((l) => l.category === selectedCategory);
  }

  if (searchTerm) {
    filteredLocations = filteredLocations.filter(
      (l) =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Locais - {trip.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar locais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todas as Categorias</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Adicionar Local
          </button>
        </div>
      </div>

      {filteredLocations.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Nenhum local encontrado</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              onSelect={setSelectedLocation}
              onToggleFavorite={() => toggleFavorite(trip.id, location.id)}
              onToggleVisited={() => toggleVisited(trip.id, location.id)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddLocationModal
          onClose={() => setShowModal(false)}
          onAdd={(location) => {
            addLocation(trip.id, location);
            setShowModal(false);
          }}
        />
      )}

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">{selectedLocation.name}</h2>
              <button
                onClick={() => setSelectedLocation(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              {selectedLocation.photos.length > 0 && (
                <img
                  src={selectedLocation.photos[0].url}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              <p className="text-slate-600 mb-4">{selectedLocation.description}</p>
              {selectedLocation.address && (
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Morada:</span> {selectedLocation.address}
                </p>
              )}
              {selectedLocation.openingHours && (
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Horário:</span> {selectedLocation.openingHours}
                </p>
              )}
              {selectedLocation.ticketPrice && (
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Preço:</span> {selectedLocation.ticketPrice}
                </p>
              )}
              {selectedLocation.personalRating && (
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium">Avaliação:</span> {selectedLocation.personalRating}/5 ⭐
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsPage;
