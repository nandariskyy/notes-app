class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
