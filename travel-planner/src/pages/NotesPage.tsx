import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import useStore from '../store/travelStore';

const NotesPage: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const trips = useStore((state) => state.trips);
  const addNote = useStore((state) => state.addNote);
  const updateNote = useStore((state) => state.updateNote);
  const deleteNote = useStore((state) => state.deleteNote);

  const trip = trips.find((t) => t.id === tripId);

  if (!trip) {
    return <div className="text-center py-8">Viagem não encontrada</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      if (editingId) {
        updateNote(trip.id, editingId, title, content);
        setEditingId(null);
      } else {
        addNote(trip.id, title, content);
      }
      setTitle('');
      setContent('');
      setShowForm(false);
    }
  };

  const handleEdit = (noteId: string) => {
    const note = trip.notes.find((n) => n.id === noteId);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setEditingId(noteId);
      setShowForm(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notas e Dicas - {trip.name}</h1>
          <p className="text-slate-600">Guarde informações e dicas importantes sobre sua viagem</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nova Nota
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da nota"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4 text-lg font-medium"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva sua nota aqui..."
            rows={6}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium"
            >
              {editingId ? 'Atualizar Nota' : 'Guardar Nota'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setTitle('');
                setContent('');
              }}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      {trip.notes.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg">
          <p className="text-slate-600">Nenhuma nota ainda. Comece a adicionar dicas e informações!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trip.notes.map((note) => (
            <div key={note.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-slate-900 flex-1">{note.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note.id)}
                    className="text-slate-400 hover:text-primary-600 transition"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteNote(trip.id, note.id)}
                    className="text-slate-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-slate-600 whitespace-pre-wrap line-clamp-4">{note.content}</p>
              <p className="text-xs text-slate-400 mt-4">
                Criado em {new Date(note.createdAt).toLocaleDateString('pt-PT')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;
