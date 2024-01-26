const d = document;

const wrapper = d.querySelector(".wrapper");
const categorySelect = d.querySelectorAll(".category");
const backBtn = d.querySelectorAll(".back-btn");
const addBtn = d.querySelector(".add-btn");
const cancelBtn = d.querySelector(".cancel-btn");
const addTaskMenu = d.querySelector(".add-task-wrapper");
const blackBackDrop = d.querySelector(".black-backdrop");

const toggleMenu = () => {
  wrapper.classList.toggle("show-category");
};

backBtn.forEach(element => {
  element.addEventListener("click", toggleMenu);
});
categorySelect.forEach(element => {
  element.addEventListener("click", toggleMenu);
});

const toggleAddForm = () => {
  addTaskMenu.classList.toggle("active");
  blackBackDrop.classList.toggle("active");
  addBtn.classList.toggle("active");

};

addBtn.addEventListener("click", toggleAddForm);
cancelBtn.addEventListener("click", toggleAddForm)