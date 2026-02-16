//THIS IS FOR OPENING AND CLOSING MODALS AND DROPDOWNS
const dropdown = document.getElementById('categoryDropdown');
const header = dropdown.querySelector('.dropdown-header');
const options = dropdown.querySelectorAll('.dropdown-list li');
const selected = dropdown.querySelector('.selected');
const notesBox = document.querySelector('.notes-box')
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal-btn');

// THIS IS FOR ADDING NOTES INFORMATION
const addNotes = document.querySelector('.add-btn');
const inputTitle = document.querySelector('.modal-title input');
const inputContent = document.querySelector('.modal-description-title textarea');
const inputTag = document.querySelector('.modal-tags tag-option');
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

notesBox.addEventListener('click', () => {
  modal.classList.add("open");
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
  const title = inputTitle.value;
  const content = inputContent.value;
  const tag = inputTag.value;
  const date = new Date().toLocaleDateString();

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
  const notesContainer = document.querySelector('.notes-container');
  // notesContainer.innerHTML = "";
  
}

render();

