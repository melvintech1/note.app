// components/note-list.js
class NoteList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._notes = [];
    }

    set notes(value) {
        this._notes = value;
        this.render();
    }

    get notes() {
        return this._notes;
    }

    connectedCallback() {
        this.render();
    }

    renderLoading() {
        this.shadowRoot.innerHTML = `
            <style>
                .loading {
                    text-align: center;
                    padding: 2rem;
                    color: #7f8c8d;
                }
                
                .spinner {
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
            
            <div class="loading">
                <div class="spinner"></div>
                <p>Memuat catatan...</p>
            </div>
        `;
    }

    render() {
        if (this._notes.length === 0) {
            this.shadowRoot.innerHTML = `
                <style>
                    .empty-state {
                        text-align: center;
                        padding: 3rem;
                        color: #7f8c8d;
                    }
                    
                    .empty-state h3 {
                        margin-bottom: 1rem;
                        color: #2c3e50;
                    }
                </style>
                
                <div class="empty-state">
                    <h3>📝 Belum ada catatan</h3>
                    <p>Tambahkan catatan pertama Anda menggunakan form di atas!</p>
                </div>
            `;
            return;
        }

        this.shadowRoot.innerHTML = `
            <style>
                .notes-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 1.5rem;
                    padding: 1rem 0;
                }
                
                @media (max-width: 768px) {
                    .notes-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
            
            <div class="notes-grid">
                ${this._notes.map(note => `
                    <note-item 
                        title="${this.escapeHtml(note.title)}" 
                        body="${this.escapeHtml(note.body)}"
                        created-at="${note.createdAt || ''}"
                    ></note-item>
                `).join('')}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

customElements.define('note-list', NoteList);