const d = document;

// ? Category Array :
let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Coding",
    img: "coding.png",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "fitness.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "finance.png",
  },
];
// ? Task Array :
let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Complete coding challenge",
    category: "Coding",
    completed: false,
  },
  {
    id: 5,
    task: "Take a 30-minute walk",
    category: "Health",
    completed: false,
  },
  {
    id: 6,
    task: "Do a 20-minute HIIT workout",
    category: "Fitness",
    completed: false,
  },
  {
    id: 7,
    task: "Watch an educational video online",
    category: "Education",
    completed: false,
  },
  {
    id: 8,
    task: "Review monthly budget",
    category: "Finance",
    completed: false,
  },

  // Add more tasks for each category as desired
];

// * Defining all necessary elements : -->

let selectedCategory = categories[0];
const wrapper = d.querySelector(".wrapper");
const backBtn = d.querySelectorAll(".back-btn");
const addBtn = d.querySelector(".task-btn");
const cancelBtn = d.querySelector(".cancel-btn");
const addTaskMenu = d.querySelector(".add-task-wrapper");
const blackBackDrop = d.querySelector(".black-backdrop");
const categTask = d.querySelector(".category-task");
const totalTask = d.querySelector(".total-tasks");
const categoryContainer = d.querySelector(".categories");
const categScreen = d.querySelector(".category-screen");
const categoryTitle = d.querySelector(".category-title");
const categoryImg = d.querySelector(".categ-img img");
const taskContainer = d.querySelector("#task-list");
const taskInput = d.querySelector("#task-input");
const categorySelct = d.querySelector("#category-select");
const addTaskBtn = d.querySelector(".addBtn");
const categoryScreen = d.querySelector(".category-screen");


// * Basic Functions : -->

// Save data func
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
};

// Get stored Data func
const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  const selectedCategoryLocal = JSON.parse(localStorage.getItem("selectedCategory"));
  if (tasksLocal) {
    tasks = tasksLocal;
  }
  if (selectedCategoryLocal) {
    selectedCategory = selectedCategoryLocal;
  } else {
    selectedCategory = categories[0];
  }
};

// Toggle Screen func
const toggleMenu = () => {
  wrapper.classList.toggle("show-category");
};

// Toggle add form func
const toggleAddForm = () => {
  addTaskMenu.classList.toggle("active");
  blackBackDrop.classList.toggle("active");
  addBtn.classList.toggle("active");

};
// Update total tasks func
const updateTotal = () => {
  const categoryTask = tasks.filter((task) => {
    return task.category.toLocaleLowerCase() === selectedCategory.title.toLocaleLowerCase();
  });
  categTask.innerHTML = categoryTask.length;
  totalTask.innerHTML = tasks.length;

};


// * Render Categories func : -->

const renderCategory = () => {
  categoryContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTask = tasks.filter((task) => {
      return task.category.toLocaleLowerCase() === category.title.toLocaleLowerCase();
    });
    const div = d.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      wrapper.classList.toggle("show-category");
      selectedCategory = category;
      updateTotal();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `./images/${category.img}`;
      renderTask();
      saveLocal();
    });
    div.innerHTML = `<div class="left">
                  <div class="categ-img"><img src="./images/${category.img}" alt="${category.title}"></div>
                  <div class="content">
                    <h1 class="category-title">${category.title}</h1>
                    <p><span class="category-task">${categoryTask.length}</span> Tasks</p>
                  </div>
                </div>
                <div class="right"><i class='bx bx-dots-vertical-rounded'></i></div>`;
    categoryContainer.appendChild(div);
  });
};

// * Render Taks func : -->

const renderTask = () => {
  taskContainer.innerHTML = "";
  const categoryTask = tasks.filter((task) => {
    return task.category.toLocaleLowerCase() === selectedCategory.title.toLocaleLowerCase();
  });
  if (categoryTask.length === 0) {
    taskContainer.innerHTML = `<p class = "no-task">No tasks in this category.</p>`;
  } else {
    categoryTask.forEach((task) => {
      const li = d.createElement("li");
      li.innerHTML = task.task;

      if (task.completed) li.classList.add("checked");

      const span = d.createElement("span");
      span.classList.add("img");

      li.appendChild(span);
      taskContainer.appendChild(li);
    });
    updateTotal();
    renderCategory();
    saveLocal();
  }

};

// * Rendering options func : -->

const renderCategoryOptions = () => {
  categorySelct.innerHTML = "";
  categories.forEach((category) => {
    const option = d.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelct.appendChild(option);
  });
};

// * Add a task func : -->

const addTaskFunc = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelct.value;

  if (task === "") {
    alert("Please enter a task before continuing!");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task: task,
      category: category,
      completed: false
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    toggleAddForm();
    renderTask();
    updateTotal();
  }
};

//  * Click func for checking and del tasks : -->

taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const taskText = e.target.textContent.trim();
    const taskIndex = tasks.findIndex(task => task.task === taskText);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
    }
    e.target.classList.toggle("checked");
    saveLocal();
    updateTotal();
  } else if (e.target.tagName === "SPAN") {
    const taskText = e.target.parentElement.textContent.trim();
    const taskIndex = tasks.findIndex(task => task.task === taskText);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
    } 
    e.target.parentElement.remove();
    saveLocal();
    updateTotal();
  }
});

// * All basic Click func : -->

addTaskBtn.addEventListener("click", addTaskFunc);

backBtn.forEach(element => {
  element.addEventListener("click", toggleMenu);
});

addBtn.addEventListener("click", toggleAddForm);
cancelBtn.addEventListener("click", toggleAddForm);

// * Calling Funcs: -->
getLocal();
renderCategory();
renderCategoryOptions();
renderTask();
updateTotal()