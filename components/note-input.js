// components/note-input.js
class NoteInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._submitCallback = null;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    set onSubmit(callback) {
        this._submitCallback = callback;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .input-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    margin-bottom: 2rem;
                }
                
                .form-title {
                    margin-bottom: 1.5rem;
                    color: #2c3e50;
                    font-weight: 600;
                }
                
                .form-group {
                    margin-bottom: 1.5rem;
                }
                
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #34495e;
                }
                
                input, textarea {
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }
                
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #3498db;
                }
                
                textarea {
                    min-height: 120px;
                    resize: vertical;
                }
                
                .error-message {
                    color: #e74c3c;
                    font-size: 0.9rem;
                    margin-top: 0.3rem;
                    display: none;
                }
                
                button {
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 4px;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                
                button:hover {
                    background: #2980b9;
                }
                
                button:disabled {
                    background: #bdc3c7;
                    cursor: not-allowed;
                }
            </style>
            
            <form class="input-form" id="noteForm">
                <h2 class="form-title">Tambah Catatan Baru</h2>
                
                <div class="form-group">
                    <label for="title">Judul</label>
                    <input type="text" id="title" name="title" placeholder="Masukkan judul catatan" required>
                    <div class="error-message" id="titleError"></div>
                </div>
                
                <div class="form-group">
                    <label for="body">Isi Catatan</label>
                    <textarea id="body" name="body" placeholder="Tulis isi catatan di sini..." required></textarea>
                    <div class="error-message" id="bodyError"></div>
                </div>
                
                <button type="submit" id="submitBtn">Tambah Catatan</button>
            </form>
        `;
    }

    setupEventListeners() {
        const form = this.shadowRoot.getElementById('noteForm');
        const titleInput = this.shadowRoot.getElementById('title');
        const bodyInput = this.shadowRoot.getElementById('body');
        const titleError = this.shadowRoot.getElementById('titleError');
        const bodyError = this.shadowRoot.getElementById('bodyError');

        // Realtime validation (Kriteria Opsional 2)
        titleInput.addEventListener('input', () => {
            this.validateField(titleInput, titleError, 'Judul harus diisi dan minimal 4 karakter');
        });

        bodyInput.addEventListener('input', () => {
            this.validateField(bodyInput, bodyError, 'Isi catatan harus diisi');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isValid = this.validateForm();
            
            if (isValid && this._submitCallback) {
                const formData = new FormData(form);
                const noteData = {
                    title: formData.get('title'),
                    body: formData.get('body')
                };
                
                this._submitCallback(noteData);
                form.reset();
            }
        });
    }

    validateField(field, errorElement, message) {
        if (field.value.trim() === '') {
            this.showError(field, errorElement, message);
            return false;
        }
        
        if (field.id === 'title' && field.value.trim().length < 4) {
            this.showError(field, errorElement, 'Judul minimal 4 karakter');
            return false;
        }
        
        this.hideError(field, errorElement);
        return true;
    }

    validateForm() {
        const titleInput = this.shadowRoot.getElementById('title');
        const bodyInput = this.shadowRoot.getElementById('body');
        const titleError = this.shadowRoot.getElementById('titleError');
        const bodyError = this.shadowRoot.getElementById('bodyError');

        const isTitleValid = this.validateField(titleInput, titleError, 'Judul harus diisi dan minimal 4 karakter');
        const isBodyValid = this.validateField(bodyInput, bodyError, 'Isi catatan harus diisi');

        return isTitleValid && isBodyValid;
    }

    showError(field, errorElement, message) {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    hideError(field, errorElement) {
        field.style.borderColor = '#ddd';
        errorElement.style.display = 'none';
    }
}

customElements.define('note-input', NoteInput);