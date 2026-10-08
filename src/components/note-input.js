class NoteInput extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupValidationAndEvents();
    }

    render() {
    this.innerHTML = `
        <div class="note-input-container">
        <h2>Buat Catatan Baru</h2>
        <form id="addNoteForm">
            <div class="form-group">
            <label for="title">Judul Catatan</label>
            <input 
                type="text" 
                id="title" 
                name="title" 
                placeholder="Masukkan judul (min 3 karakter)..." 
                required 
                minlength="3"
            />
            <small class="error-message" id="titleError"></small>
            </div>
            
            <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea 
                id="body" 
                name="body" 
                rows="5" 
                placeholder="Tuliskan detail catatan Anda di sini..." 
                required 
                minlength="5"
                ></textarea>
                <small class="error-message" id="bodyError"></small>
            </div>

            <button type="submit" id="submitBtn" disabled>Tambah Catatan</button>
        </form>
        </div>
    `;
    }

    setupValidationAndEvents() {
        const titleInput = this.querySelector('#title');
        const bodyInput = this.querySelector('#body');
        const titleError = this.querySelector('#titleError');
        const bodyError = this.querySelector('#bodyError');
        const submitBtn = this.querySelector('#submitBtn');
        const form = this.querySelector('#addNoteForm');

        const validateForm = () => {
        let isValid = true;

        // Realtime validation untuk Title
        if (titleInput.value.trim().length === 0) {
            titleError.textContent = 'Judul tidak boleh kosong.';
            isValid = false;
        } else if (titleInput.value.trim().length < 3) {
            titleError.textContent = 'Judul minimal 3 karakter.';
            isValid = false;
        } else {
            titleError.textContent = '';
        }

        // Realtime validation untuk Body
        if (bodyInput.value.trim().length === 0) {
            bodyError.textContent = 'Isi catatan tidak boleh kosong.';
            isValid = false;
        } else if (bodyInput.value.trim().length < 5) {
            bodyError.textContent = 'Isi catatan minimal 5 karakter.';
            isValid = false;
        } else {
            bodyError.textContent = '';
        }

        submitBtn.disabled = !isValid;
        };

        titleInput.addEventListener('input', validateForm);
        bodyInput.addEventListener('input', validateForm);

        form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newNote = {
            id: `notes-${Date.now()}`,
            title: titleInput.value,
            body: bodyInput.value,
            createdAt: new Date().toISOString(),
            archived: false,
        };

        // Custom event untuk mengirimkan data catatan baru ke app.js
        this.dispatchEvent(new CustomEvent('note-added', {
            detail: newNote,
            bubbles: true,
        }));

        form.reset();
        submitBtn.disabled = true;
        });
    }
}

customElements.define('note-input', NoteInput);