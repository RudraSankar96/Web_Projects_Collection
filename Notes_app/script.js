// Load notes from localStorage when app starts
document.addEventListener("DOMContentLoaded", loadNotes);

function addNote() {
  const noteText = document.getElementById("noteText").value;
  if (!noteText.trim()) {
    alert("Please write something before adding!");
    return;
  }

  const notes = getNotes();
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("noteText").value = "";
  loadNotes();
}

function loadNotes() {
  const notesContainer = document.getElementById("notesContainer");
  const notes = getNotes();

  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.innerHTML = `
      <p>${note}</p>
      <div class="note-buttons">
        <button class="edit" onclick="editNote(${index})">Edit</button>
        <button class="delete" onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    notesContainer.appendChild(noteElement);
  });
}

function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  loadNotes();
}

function editNote(index) {
  const notes = getNotes();
  const newNote = prompt("Edit your note:", notes[index]);
  if (newNote !== null) {
    notes[index] = newNote;
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }
}
