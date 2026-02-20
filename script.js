//THIS IS FOR OPENING AND CLOSING MODALS AND DROPDOWNS
const dropdown = document.getElementById('categoryDropdown');
const header = dropdown.querySelector('.dropdown-header');
const options = dropdown.querySelectorAll('.dropdown-list li');
const selected = dropdown.querySelector('.selected');
const notesBox = document.querySelector('.notes-box')
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal-btn');

const searchInput = document.querySelector('.input-area input');

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
    selectedFilter = option.dataset.value;
    dropdown.classList.remove("open");
    render();
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
let selectedFilter = "all";
let searchQuery = "";



try {
  notes = JSON.parse(localStorage.getItem("notes")) || [];
} catch (error) {
  notes = [];
}

const saveToStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
}




// THIS IS FOR SEARCHING NOTES
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  render();
});





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
    notes = notes.map (n => 
      n.id === editingIndex
        ? {...n, title, content, tag, date}
        :n
    );

    editingIndex = null;
  } else {
    notes.push ({
      id: Date.now(),
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
    const noteId = Number(box.dataset.id);
    const note = notes.find(n => n.id === noteId);

    inputTitle.value = note.title;
    inputContent.value = note.content;

    const tagInput = document.querySelector(`input[name="noteTag"][value="${note.tag}"]`);
    if (tagInput) tagInput.checked = true;

    editingIndex = noteId;

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

  // const filteredNotes = selectedFilter === "all"
  //   ? notes
  //   : notes.filter(note => note.tag === selectedFilter);

  const filteredNotes = notes.filter(note => {
    if (selectedFilter !== "all" && note.tag !==selectedFilter) {
      return false;
    }

    const searchableText = `${note.title} ${note.content}`.toLowerCase();
    return searchableText.includes(searchQuery);
  });


  filteredNotes.forEach((note, index) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add("notes-box");
    noteElement.dataset.id = note.id;

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
      notes = notes.filter(n => n.id !== note.id);
      saveToStorage();
      render();
    });

    notesContainer.appendChild(noteElement);
  });
  
};


render();

