import 'animate.css';
import '../styles/style.css';
import './components/app-bar.js';
import './components/note-input.js';
import './components/note-item.js';
import './components/loading-indicator.js';
import NotesApi from './data/api.js';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  const notesGrid = document.querySelector('#notesGrid');
  const loadingIndicator = document.querySelector('#loading');
  const tabActive = document.querySelector('#tabActive');
  const tabArchived = document.querySelector('#tabArchived');

  let currentTab = 'active';

  const showLoading = () => loadingIndicator.classList.remove('hidden');
  const hideLoading = () => loadingIndicator.classList.add('hidden');

  const showToast = (icon, title) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const loadNotes = async () => {
    showLoading();
    try {
      const notes =
        currentTab === 'active'
          ? await NotesApi.getNonArchived()
          : await NotesApi.getArchived();

      renderNotes(notes);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Memuat Data',
        text: error.message,
      });
    } finally {
      hideLoading();
    }
  };

  const renderNotes = (notes) => {
    notesGrid.innerHTML = '';
    if (notes.length === 0) {
      notesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b;">Tidak ada catatan.</p>`;
      return;
    }

    notes.forEach((note) => {
      const item = document.createElement('note-item');
      item.setAttribute('id', note.id);
      item.setAttribute('title', note.title);
      item.setAttribute('body', note.body);
      item.setAttribute('created-at', note.createdAt);
      item.setAttribute('archived', note.archived);
      notesGrid.appendChild(item);
    });
  };

  document.addEventListener('note-added', async (e) => {
    showLoading();
    try {
      await NotesApi.createNote(e.detail);
      showToast('success', 'Catatan berhasil ditambahkan');
      loadNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambah Catatan',
        text: error.message,
      });
    } finally {
      hideLoading();
    }
  });

  document.addEventListener('note-delete', async (e) => {
    const { id } = e.detail;
    const confirm = await Swal.fire({
      title: 'Hapus Catatan?',
      text: 'Tindakan ini tidak dapat dibatalkan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
    });

    if (confirm.isConfirmed) {
      showLoading();
      try {
        await NotesApi.deleteNote(id);
        showToast('success', 'Catatan berhasil dihapus');
        loadNotes();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: error.message,
        });
      } finally {
        hideLoading();
      }
    }
  });

  document.addEventListener('note-archive-toggle', async (e) => {
    const { id, isArchived } = e.detail;
    showLoading();
    try {
      if (isArchived) {
        await NotesApi.unarchiveNote(id);
        showToast('success', 'Catatan dipindahkan dari arsip');
      } else {
        await NotesApi.archiveNote(id);
        showToast('success', 'Catatan berhasil diarsipkan');
      }
      loadNotes();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah Status',
        text: error.message,
      });
    } finally {
      hideLoading();
    }
  });

  tabActive.addEventListener('click', () => {
    currentTab = 'active';
    tabActive.classList.add('active');
    tabArchived.classList.remove('active');
    loadNotes();
  });

  tabArchived.addEventListener('click', () => {
    currentTab = 'archived';
    tabArchived.classList.add('active');
    tabActive.classList.remove('active');
    loadNotes();
  });

  loadNotes();
});
