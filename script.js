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


closeModal.addEventListener('click', () => {
  modal.classList.remove("open");
});









// THIS IS FOR STORING THE DATA
let notes = [];
let editingIndex = null;

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
  editingIndex = null;
  inputTitle.value = "";
  inputContent.value = "";
  modal.classList.add("open");
});

saveBtn.addEventListener('click', () => {
  const inputTag = document.querySelector('input[name=noteTag]:checked');
  const tag = inputTag ? inputTag.value : 'none';

  const title = inputTitle.value;
  const content = inputContent.value;
  const date = new Date().toLocaleString();


  if (editingIndex !== null) {
    notes[editingIndex] = {
      title,
      content,
      tag,
      date
    };

    editingIndex = null;
  } else {
    notes.push ({
      title,
      content,
      tag,
      date
    });
  }


  saveToStorage();
  render();

  modal.classList.remove("open");
});






//THIS IS FOR OPENING MODAL
notesContainer.addEventListener('click', (e) => {
  const box = e.target.closest('.notes-box');

  if (box) {
    const index = [...notesContainer.children].indexOf(box);
    const note = notes[index];

    inputTitle.value = note.title;
    inputContent.value = note.content;

    const tagInput = document.querySelector(`input[name="noteTag"][value="${note.tag}"]`);
    if (tagInput) tagInput.checked = true;

    editingIndex = index;

    modal.classList.add("open");
  }
});






//THIS IS FOR TAG FUNCTION
function getTagIcon(tag) {
  const icons = {
    work: 'briefcase',
    personal: 'user',
    ideas: 'lightbulb',
    reminder: 'bell'
  };
  return icons[tag] || 'tag';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




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
              <span class="tag-display display-${note.tag}">
                <i class="fa-solid fa-${getTagIcon(note.tag)}"></i> ${capitalize(note.tag)}
              </span>
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

