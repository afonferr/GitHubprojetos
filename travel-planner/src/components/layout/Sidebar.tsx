import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Home, Plus, Settings } from 'lucide-react';
import useStore from '../store/travelStore';

const Sidebar: React.FC = () => {
  const trips = useStore((state) => state.trips);
  const currentTrip = useStore((state) => state.currentTrip);
  const selectTrip = useStore((state) => state.selectTrip);

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-primary-50 rounded-lg transition"
          >
            <Home className="w-5 h-5" />
            <span>Página Principal</span>
          </Link>

          <div className="pt-4">
            <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Minhas Viagens
            </h3>
            <div className="space-y-1">
              {trips.length === 0 ? (
                <p className="px-4 py-2 text-sm text-slate-500">Nenhuma viagem ainda</p>
              ) : (
                trips.map((trip) => (
                  <button
                    key={trip.id}
                    onClick={() => selectTrip(trip.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                      currentTrip?.id === trip.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{trip.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4 space-y-2">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition"
        >
          <Settings className="w-5 h-5" />
          <span>Definições</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
