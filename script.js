const dropdown = document.getElementById('categoryDropdown');
const header = dropdown.querySelector('.dropdown-header');
const options = dropdown.querySelectorAll('.dropdown-list li');
const selected = dropdown.querySelector('.selected');
const notesContainer = document.querySelector('.notes-box')
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal-btn')


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

notesContainer.addEventListener('click', () => {
  modal.classList.add("open");
})

closeModal.addEventListener('click', () => {
  modal.classList.remove("open");
})

