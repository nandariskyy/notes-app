import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import initialNotes from './data/notes-data.js';

let notes = [...initialNotes];

const notesGrid = document.querySelector('#notesGrid');
const noteInput = document.querySelector('note-input');

function renderNotes() {
    notesGrid.innerHTML = '';

    notes.forEach((note) => {
        const noteItem = document.createElement('note-item');
    
        // Kriteria Opsional 3: Menggunakan Custom Attribute
        noteItem.setAttribute('title', note.title);
        noteItem.setAttribute('body', note.body);
        noteItem.setAttribute('created-at', note.createdAt);

        notesGrid.appendChild(noteItem);
    });
}

// Mendengar event saat ada catatan baru dari <note-input>
noteInput.addEventListener('note-added', (e) => {
    const newNote = e.detail;
    notes.unshift(newNote);
    renderNotes();
});

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
});