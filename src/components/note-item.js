class NoteItem extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'body', 'created-at'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'Tanpa Judul';
        const body = this.getAttribute('body') || 'Tanpa Isi';
        const createdAt = this.getAttribute('created-at') || new Date().toISOString();

        const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

        this.innerHTML = `
        <article class="note-card">
            <h3 class="note-title">${title}</h3>
            <p class="note-date">${formattedDate}</p>
            <p class="note-body">${body}</p>
        </article>
        `;
    }
}

customElements.define('note-item', NoteItem);