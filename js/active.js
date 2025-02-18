import { updateTodoCount } from "./main.js";
const activeBtn = document.querySelector(".active-btn");
activeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(activeBtn);
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach((todoItem) => {
        const todoContainer = todoItem.closest(".todo-container");
        const input = todoItem.querySelector("input");
        if (input?.checked && todoContainer) {
            todoContainer.classList.add("hide-todo");
            updateTodoCount();
        }
    });
});
