// script.js
import './components/note-list.js';
import './components/note-input.js';

// ✅ DATA DUMMY YANG DISEDIAKAN DICODING (di-hardcode langsung)
const getNotes = () => {
  return [
    {
      id: "notes-1",
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: "notes-2",
      title: "Functional Component",
      body: "Functional component merupakan React component yang dibuat menggunakan fungsi JavaScript. Agar fungsi JavaScript dapat disebut component ia harus mengembalikan React element dan dipanggil layaknya React component.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: "notes-3",
      title: "Modularization",
      body: "Modularization merupakan teknik dalam memecah atau menggunakan kode dalam berkas JavaScript secara terpisah berdasarkan tanggung jawabnya masing-masing.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: "notes-4",
      title: "Lifecycle",
      body: "Dalam konteks React component, lifecycle merupakan kumpulan method yang menjadi siklus hidup mulai dari component dibuat (constructor), dicetak (render), pasca-cetak (componentDidMount), dan sebagainya.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: "notes-5",
      title: "ESM",
      body: "ESM (ECMAScript Module) merupakan format modularisasi standar JavaScript.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    },
    {
      id: "notes-6",
      title: "Module Bundler",
      body: "Dalam JavaScript, module bundler merupakan tools yang digunakan untuk menggabungkan seluruh modul JavaScript yang digunakan oleh aplikasi menjadi satu berkas.",
      createdAt: "2022-04-14T04:27:34.572Z",
      archived: false,
    }
  ];
};

// ✅ FUNGSI UNTUK MENAMBAH CATATAN (SIMULASI)
function addNewNote(noteData) {
  const newNote = {
    id: `notes-${Date.now()}`,
    title: noteData.title,
    body: noteData.body,
    createdAt: new Date().toISOString(),
    archived: false
  };
  
  console.log('Catatan baru ditambahkan (simulasi):', newNote);
  alert(`Catatan berhasil ditambahkan! (Simulasi)\nJudul: ${newNote.title}`);
  
  const noteListElement = document.querySelector('note-list');
  const currentNotes = noteListElement.notes || [];
  noteListElement.notes = [...currentNotes, newNote];
}


// ✅ JALANKAN SAAT HALAMAN SIAP
document.addEventListener('DOMContentLoaded', () => {
  const noteListElement = document.querySelector('note-list');
  const noteInputElement = document.querySelector('note-input');
  
  // Ambil data dummy
  const notesData = getNotes();
  
  // Tampilkan data dummy
  noteListElement.notes = notesData;
  
  // Setup form handler
  noteInputElement.onSubmit = addNewNote;
});