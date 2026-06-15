import React from 'react';
import { Heart, MapPin, Eye, EyeOff } from 'lucide-react';
import { Location } from '../../types';
import { getCategoryInfo } from '../../utils/constants';

interface LocationCardProps {
  location: Location;
  onSelect?: (location: Location) => void;
  onToggleFavorite?: (locationId: string) => void;
  onToggleVisited?: (locationId: string) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onSelect,
  onToggleFavorite,
  onToggleVisited,
}) => {
  const categoryInfo = getCategoryInfo(location.category);
  const hasPhotos = location.photos.length > 0;

  return (
    <div
      onClick={() => onSelect?.(location)}
      className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      {hasPhotos ? (
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <img src={location.photos[0].url} alt={location.name} className="w-full h-full object-cover" />
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium text-white ${
            categoryInfo?.color || 'bg-slate-600'
          }`}>
            {categoryInfo?.label}
          </div>
        </div>
      ) : (
        <div className={`aspect-video flex items-center justify-center ${categoryInfo?.color || 'bg-slate-600'}`}>
          {categoryInfo?.icon && <categoryInfo.icon className="w-8 h-8" />}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-900 flex-1">{location.name}</h3>
          <div className="flex gap-1">
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(location.id);
                }}
                className={`p-2 rounded transition ${
                  location.isFavorite
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-slate-100 text-slate-400 hover:text-rose-600'
                }`}
              >
                <Heart className="w-4 h-4" fill={location.isFavorite ? 'currentColor' : 'none'} />
              </button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{location.description}</p>

        <div className="space-y-2 text-sm">
          {location.address && (
            <div className="flex items-start gap-2 text-slate-700">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{location.address}</span>
            </div>
          )}
          {location.ticketPrice && (
            <p className="text-slate-700">
              <span className="font-medium">Preço:</span> {location.ticketPrice}
            </p>
          )}
          {location.personalRating && (
            <p className="text-slate-700">
              <span className="font-medium">Avaliação:</span> {location.personalRating}/5 ⭐
            </p>
          )}
        </div>

        {onToggleVisited && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisited(location.id);
            }}
            className={`mt-4 w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              location.isVisited
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {location.isVisited ? (
              <>
                <Eye className="w-4 h-4" />
                Já Visitado
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4" />
                Marcar como Visitado
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
