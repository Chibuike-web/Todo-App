import { updateTodoCount } from "./main.js";
const activeBtn = document.querySelector(".active-btn");
activeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const todoContainer = document.querySelectorAll(".todo-container");
    todoContainer.forEach((todo) => {
        todo.classList.remove("hide-todo");
    });
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
