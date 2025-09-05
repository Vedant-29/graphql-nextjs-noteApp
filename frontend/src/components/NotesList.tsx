import { useState } from 'react';
import { useNotes, useCreateNote, useUpdateNote, useDeleteNote } from '@/hooks/useNotes';
import { Note } from '@/types';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';

export default function NotesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Apollo hooks
  const { loading, error, data } = useNotes(searchTerm);
  const [createNote, { loading: creating }] = useCreateNote();
  const [updateNote, { loading: updating }] = useUpdateNote();
  const [deleteNote, { loading: deleting }] = useDeleteNote();

  const handleCreateNote = async (title: string, content: string) => {
    try {
      await createNote({ variables: { title, content } });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Error creating note:', err);
    }
  };

  const handleUpdateNote = async (title: string, content: string) => {
    if (!editingNote) return;
    
    try {
      await updateNote({ 
        variables: { 
          id: editingNote.id, 
          title, 
          content 
        } 
      });
      setEditingNote(null);
    } catch (err) {
      console.error('Error updating note:', err);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote({ variables: { id } });
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
    setShowCreateForm(false);
  };

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading notes: {error.message}</p>
          <p className="text-sm text-red-500 mt-1">Make sure your backend server is running on port 4000.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
            <p className="text-gray-600 mt-1">
              {data?.notes.length || 0} notes total
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            disabled={creating}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600">
              {loading ? 'Searching...' : `Found ${data?.notes.length || 0} notes matching "${searchTerm}"`}
            </p>
          )}
        </div>
      </div>

      {/* Notes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : data?.notes.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {searchTerm ? 'No notes found' : 'No notes yet'}
          </h3>
          <p className="mt-2 text-gray-500">
            {searchTerm 
              ? `No notes match your search "${searchTerm}". Try a different search term.`
              : 'Get started by creating your first note!'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create your first note
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.notes.map((note: Note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      {/* Loading overlay for delete operations */}
      {deleting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center space-x-3">
              <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-700">Deleting note...</span>
            </div>
          </div>
        </div>
      )}

      {/* Forms */}
      {showCreateForm && (
        <NoteForm
          onSave={handleCreateNote}
          onCancel={handleCancelEdit}
          loading={creating}
        />
      )}

      {editingNote && (
        <NoteForm
          note={editingNote}
          onSave={handleUpdateNote}
          onCancel={handleCancelEdit}
          loading={updating}
        />
      )}
    </div>
  );
}