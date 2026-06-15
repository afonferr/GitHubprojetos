import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '../../types';

interface PhotoGalleryProps {
  photos: Photo[];
  locationName: string;
  onClose?: () => void;
  onRemovePhoto?: (photoId: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, locationName, onClose, onRemovePhoto }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  if (photos.length === 0) {
    return (
      <div className="bg-slate-100 rounded-lg p-8 text-center">
        <p className="text-slate-500">Nenhuma foto adicionada ainda</p>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-4">
      <div className="relative bg-slate-900 rounded-lg overflow-hidden aspect-video">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || locationName}
          className="w-full h-full object-cover"
        />
        
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full transition"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {onRemovePhoto && (
          <button
            onClick={() => onRemovePhoto(currentPhoto.id)}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
            aria-label="Remover foto"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {photos.length}
        </div>
      </div>

      {currentPhoto.caption && (
        <p className="text-sm text-slate-600 italic">{currentPhoto.caption}</p>
      )}

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                idx === currentIndex ? 'border-primary-500' : 'border-slate-200'
              }`}
            >
              <img src={photo.url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
