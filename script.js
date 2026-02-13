const dropdown = document.getElementById('categoryDropdown');
const header = dropdown.querySelector('.dropdown-header');
const options = dropdown.querySelectorAll('.dropdown-list li');
const selected = dropdown.querySelector('.selected');


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