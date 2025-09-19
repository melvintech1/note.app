// components/note-item.js
class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'body', 'created-at'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const title = this.getAttribute('title') || 'No Title';
        const body = this.getAttribute('body') || 'No content';
        const createdAt = this.getAttribute('created-at') || '';

        this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background: white;
                    border-radius: 8px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    height: fit-content;
                }
                
                .note-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                }
                
                .note-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 0.8rem;
                    word-break: break-word;
                }
                
                .note-body {
                    color: #34495e;
                    line-height: 1.5;
                    margin-bottom: 1rem;
                    word-break: break-word;
                }
                
                .note-date {
                    font-size: 0.8rem;
                    color: #7f8c8d;
                    text-align: right;
                }
            </style>
            
            <div class="note-card">
                <h3 class="note-title">${this.escapeHtml(title)}</h3>
                <p class="note-body">${this.escapeHtml(body)}</p>
                ${createdAt ? `<div class="note-date">${new Date(createdAt).toLocaleDateString('id-ID')}</div>` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

customElements.define('note-item', NoteItem);