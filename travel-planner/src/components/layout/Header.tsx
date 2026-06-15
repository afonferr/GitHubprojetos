import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin } from 'lucide-react';
import useStore from '../store/travelStore';

const Header: React.FC = () => {
  const currentTrip = useStore((state) => state.currentTrip);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition">
            <MapPin className="w-8 h-8" />
            <span className="text-xl font-bold">Travel Planner</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {currentTrip && (
              <div className="text-sm">
                <p className="text-slate-600">Viagem atual:</p>
                <p className="font-semibold text-slate-900">{currentTrip.name}</p>
              </div>
            )}
            <Link
              to="/add-trip"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
            >
              <Plus className="w-5 h-5" />
              Nova Viagem
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
