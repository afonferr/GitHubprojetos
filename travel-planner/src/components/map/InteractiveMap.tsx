import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { Location, Category } from '../../types';
import { CATEGORIES } from '../../utils/constants';

interface InteractiveMapProps {
  locations: Location[];
  selectedCategory?: Category | 'all';
  onLocationClick?: (location: Location) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  selectedCategory = 'all',
  onLocationClick,
}) => {
  const filteredLocations =
    selectedCategory === 'all' ? locations : locations.filter((l) => l.category === selectedCategory);

  // Calculate center and bounds
  const center =
    filteredLocations.length > 0
      ? [
          filteredLocations.reduce((sum, l) => sum + l.latitude, 0) / filteredLocations.length,
          filteredLocations.reduce((sum, l) => sum + l.longitude, 0) / filteredLocations.length,
        ]
      : [38.7223, -9.1393]; // Default to Lisbon

  const getCategoryColor = (category: Category): string => {
    const categoryInfo = CATEGORIES.find((c) => c.value === category);
    const colorMap: { [key: string]: string } = {
      monument: '#f59e0b',
      beach: '#3b82f6',
      restaurant: '#f97316',
      activity: '#a855f7',
      accommodation: '#ec4899',
      shopping: '#ec409f',
      nature: '#22c55e',
    };
    return colorMap[category] || '#6b7280';
  };

  return (
    <MapContainer
      center={center as any}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredLocations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${getCategoryColor(
              location.category
            ).replace('#', '')}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })}
          onClick={() => onLocationClick?.(location)}
        >
          <Popup>
            <div className="p-2 w-48">
              <h3 className="font-semibold text-slate-900">{location.name}</h3>
              <p className="text-sm text-slate-600 mt-1">{location.description}</p>
              {location.googleMapsUrl && (
                <a
                  href={location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block"
                >
                  Ver no Google Maps →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;
