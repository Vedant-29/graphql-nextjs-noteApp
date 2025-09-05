'use client';

import NotesList from '@/components/NotesList';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NotesList />
    </main>
  );
}