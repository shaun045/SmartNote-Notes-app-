//THIS IS FOR OPENING AND CLOSING MODALS AND DROPDOWNS
const dropdown = document.getElementById('categoryDropdown');
const header = dropdown.querySelector('.dropdown-header');
const options = dropdown.querySelectorAll('.dropdown-list li');
const selected = dropdown.querySelector('.selected');
const notesBox = document.querySelector('.notes-box')
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal-btn');

const notesContainer = document.querySelector('.notes-container');

// THIS IS FOR ADDING NOTES INFORMATION
const addNotes = document.querySelector('.add-btn');
const inputTitle = document.querySelector('.modal-title input');
const inputContent = document.querySelector('.modal-description-title textarea');
const saveBtn = document.querySelector('.modal-save-btn button');


header.addEventListener('click', () => {
  dropdown.classList.toggle("open");
})

options.forEach(option => {
  option.addEventListener('click', () => {
    selected.textContent = option.textContent;
    dropdown.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});


notesContainer.addEventListener('click', (e) => {
  const box = e.target.closest('.notes-box');
  if (box) {
    modal.classList.add("open");
  }
});


closeModal.addEventListener('click', () => {
  modal.classList.remove("open");
});








// THIS IS FOR STORING THE DATA
let notes = [];

try {
  notes = JSON.parse(localStorage.getItem("notes")) || [];
} catch (error) {
  notes = [];
}

const saveToStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
}



// THIS IS FOR ADDING NOTES 
addNotes.addEventListener('click', () => {
  modal.classList.add("open");
});

saveBtn.addEventListener('click', () => {
  const inputTag = document.querySelector('input[name=noteTag]:checked');
  const tag = inputTag ? inputTag.value : 'none';

  const title = inputTitle.value;
  const content = inputContent.value;
  const date = new Date().toLocaleString();

  let note = {
    title,
    content,
    tag,
    date
  };

  notes.push(note);

  saveToStorage();
  render();

  modal.classList.remove("open");
});



//THIS IS FOR RENDERING DATA INFORMATION
const render = () => {
  notesContainer.innerHTML = "";

  notes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add("notes-box");

    noteElement.innerHTML = `
      <div class="notes-title">
        <h2>${note.title}</h2> 
          <span class="note-btn">
            <i class="fa-solid fa-trash"></i>
          </span>
      </div>
      <div class="note-description">
        <p>${note.content}</p>
      </div>
      <div class="note-footer">
        <div class="note-tag">
          ${note.tag}
        </div>
        <div class="note-date">
          ${note.date}
        </div>
      </div>
    `;

    const deleteBtn = noteElement.querySelector('.note-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notes.splice(index, 1);
      saveToStorage();
      render();
    });

    notesContainer.appendChild(noteElement);
  });
  
};


render();

