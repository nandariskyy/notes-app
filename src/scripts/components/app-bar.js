class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header class="app-bar">
        <h1>📝 Notes App</h1>
      </header>
    `;
  }
}

customElements.define('app-bar', AppBar);
