import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Calendar, Eye, Heart } from 'lucide-react';
import useStore from '../store/travelStore';
import { calculateStats } from '../utils/constants';

const HomePage: React.FC = () => {
  const trips = useStore((state) => state.trips);
  const currentTrip = useStore((state) => state.currentTrip);
  const selectTrip = useStore((state) => state.selectTrip);

  useEffect(() => {
    useStore((state) => state.initializeFromStorage)()();
  }, []);

  if (trips.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo ao Travel Planner!</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Comece a organizar a sua viagem em família. Crie uma nova viagem e adicione todos os
            locais que deseja visitar.
          </p>
          <Link
            to="/add-trip"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
          >
            <Plus className="w-5 h-5" />
            Criar Primeira Viagem
          </Link>
        </div>
      </div>
    );
  }

  const trip = currentTrip || trips[0];
  const stats = calculateStats(trip.locations);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Trip Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{trip.name}</h1>
            <p className="text-lg text-slate-600 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {trip.destination}
            </p>
            {trip.description && (
              <p className="text-slate-600 mt-2">{trip.description}</p>
            )}
          </div>
          <Link
            to={`/trips/${trip.id}/edit`}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
          >
            Editar
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Total de Locais</p>
          <p className="text-3xl font-bold text-primary-600">{stats.total}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-slate-600" />
            <p className="text-slate-600 text-sm font-medium">Já Visitados</p>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.visited}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-rose-600" />
            <p className="text-slate-600 text-sm font-medium">Favoritos</p>
          </div>
          <p className="text-3xl font-bold text-rose-600">{stats.favorites}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <p className="text-slate-600 text-sm font-medium mb-2">Progresso</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all"
              style={{ width: `${stats.total ? (stats.visited / stats.total) * 100 : 0}%` }}
            />
          </div>
          <p className="text-sm text-slate-600">
            {Math.round((stats.visited / Math.max(stats.total, 1)) * 100)}%
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Link
          to={`/trips/${trip.id}/locations`}
          className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900">Locais</h3>
          <p className="text-sm text-slate-600 mt-1">{trip.locations.length} locais</p>
        </Link>
        <Link
          to={`/trips/${trip.id}/map`}
          className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900">Mapa</h3>
          <p className="text-sm text-slate-600 mt-1">Visualizar no mapa</p>
        </Link>
        <Link
          to={`/trips/${trip.id}/checklist`}
          className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <Calendar className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900">Checklist</h3>
          <p className="text-sm text-slate-600 mt-1">Itens para levar</p>
        </Link>
        <Link
          to={`/trips/${trip.id}/notes`}
          className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-semibold text-slate-900">Notas</h3>
          <p className="text-sm text-slate-600 mt-1">{trip.notes.length} notas</p>
        </Link>
      </div>

      {/* Other Trips */}
      {trips.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Outras Viagens</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trips
              .filter((t) => t.id !== trip.id)
              .map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectTrip(t.id)}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition text-left"
                >
                  <h3 className="font-semibold text-slate-900 mb-1">{t.name}</h3>
                  <p className="text-sm text-slate-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {t.destination}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">{t.locations.length} locais</p>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
