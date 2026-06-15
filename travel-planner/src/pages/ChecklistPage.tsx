import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, Check } from 'lucide-react';
import useStore from '../store/travelStore';

const ChecklistPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const trips = useStore((state) => state.trips);
  const addChecklistItem = useStore((state) => state.addChecklistItem);
  const toggleChecklistItem = useStore((state) => state.toggleChecklistItem);
  const deleteChecklistItem = useStore((state) => state.deleteChecklistItem);

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return <div className="text-center py-8">Viagem não encontrada</div>;
  }

  const handleAddItem = () => {
    if (newItem.trim()) {
      addChecklistItem(trip.id, newItem, selectedCategory);
      setNewItem('');
    }
  };

  const categories = ['Documentos', 'Roupas', 'Higiene', 'Eletrônicos', 'Outros'];
  const completedCount = trip.checklist.filter((item) => item.completed).length;
  const progress = trip.checklist.length ? (completedCount / trip.checklist.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Checklist - {trip.name}</h1>
      <p className="text-slate-600 mb-8">Organize os itens que precisa levar na viagem</p>

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium text-slate-900">Progresso</p>
          <p className="text-sm text-slate-600">
            {completedCount} de {trip.checklist.length} itens
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Add Item Form */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Adicionar Item</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
            placeholder="Ex: Passaporte, Adaptador, Chinelos..."
            className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Selecionar categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Items */}
      {trip.checklist.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <p className="text-slate-600">Nenhum item ainda. Comece a adicionar!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category) => {
            const categoryItems = trip.checklist.filter((item) => item.category === category);
            if (categoryItems.length === 0) return null;

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-slate-700 mb-3 text-uppercase">{category}</h3>
                <div className="space-y-2 mb-6">
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-lg p-4 flex items-center gap-3 hover:shadow-sm transition"
                    >
                      <button
                        onClick={() => toggleChecklistItem(trip.id, item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                          item.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-slate-300 hover:border-primary-500'
                        }`}
                      >
                        {item.completed && <Check className="w-4 h-4 text-white" />}
                      </button>
                      <span
                        className={`flex-1 ${
                          item.completed
                            ? 'text-slate-400 line-through'
                            : 'text-slate-900'
                        }`}
                      >
                        {item.text}
                      </span>
                      <button
                        onClick={() => deleteChecklistItem(trip.id, item.id)}
                        className="text-slate-400 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChecklistPage;
