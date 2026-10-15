class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['id', 'title', 'body', 'created-at', 'archived'];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const title = this.getAttribute('title') || '';
    const body = this.getAttribute('body') || '';
    const createdAt = this.getAttribute('created-at') || '';
    const isArchived = this.getAttribute('archived') === 'true';

    const formattedDate = new Date(createdAt).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    this.innerHTML = `
      <article class="note-card animate__animated animate__fadeInUp">
        <div class="note-content">
          <h3 class="note-title">${title}</h3>
          <p class="note-date">${formattedDate}</p>
          <p class="note-body">${body}</p>
        </div>
        <div class="note-actions">
          <button class="btn-archive" data-id="${id}">
            ${isArchived ? 'Pindahkan' : 'Arsipkan'}
          </button>
          <button class="btn-delete" data-id="${id}">Hapus</button>
        </div>
      </article>
    `;

    this.querySelector('.btn-delete').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-delete', {
          detail: { id },
          bubbles: true,
        })
      );
    });

    this.querySelector('.btn-archive').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('note-archive-toggle', {
          detail: { id, isArchived },
          bubbles: true,
        })
      );
    });
  }
}

customElements.define('note-item', NoteItem);
