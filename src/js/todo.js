const todoButton = document.querySelector(".button-todo");
const todo = document.querySelector(".todo");

let todoOpen = false;

function toggleTodo() {
  if (todoOpen === false) {
    todoOpen = true;
    todo.style.transform = "translateX(0)";
  } else if (todoOpen === true) {
    todoOpen = false;
    todo.style.transform = "translateX(120%)";
  }
}

const todoFunction = {
  action(e) {
    if (e.target.classList.contains("todo-action")) {
      const action = e.target.dataset.todoAction;
      const elemItem = e.target.closest(".todo-item");
      if (action === "deleted" && elemItem.dataset.todoState === "deleted") {
        elemItem.remove();
      } else {
        elemItem.dataset.todoState = action;
      }
      this.save();
    } else if (e.target.classList.contains("todo-icon")) {
      this.add();
      this.save();
    }
  },

  add() {
    const elemText = document.querySelector(".todo-text");
    if (elemText.disabled || !elemText.value.length) {
      return;
    }
    document
      .querySelector(".todo-items")
      .insertAdjacentHTML("beforeend", this.create(elemText.value));
    elemText.value = "";
  },

  create(text) {
    return `<li class="todo-item" data-todo-state="active">
    <span class="todo-task">${text}</span>
    <span class="todo-action todo-action_restore" data-todo-action="active"></span>
    <span class="todo-action todo-action_complete" data-todo-action="completed"></span>
    <span class="todo-action todo-action_delete" data-todo-action="deleted"></span></li>`;
  },

  init() {
    const fromStorage = localStorage.getItem("todo");
    if (fromStorage) {
      document.querySelector(".todo-items").innerHTML = fromStorage;
    }
    document
      .querySelector(".todo-options")
      .addEventListener("change", this.update);
    document.addEventListener("click", this.action.bind(this));
  },

  update() {
    const option = document.querySelector(".todo-options").value;
    document.querySelector(".todo-items").dataset.todoOption = option;
    document.querySelector(".todo-text").disabled = option !== "active";
  },

  save() {
    localStorage.setItem(
      "todo",
      document.querySelector(".todo__items").innerHTML
    );
  },
};

todoFunction.init();
todoButton.addEventListener("click", toggleTodo);
