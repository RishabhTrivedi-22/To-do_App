const d = document;

const wrapper = d.querySelector(".wrapper");
const categorySelect = d.querySelectorAll(".category");
const backBtn = d.querySelectorAll(".back-btn")

const toggleMenu = () => {
  wrapper.classList.toggle("show-category");
};

backBtn.forEach(element => {
  element.addEventListener("click", toggleMenu)
})
categorySelect.forEach(element => {
  element.addEventListener("click", toggleMenu)
});