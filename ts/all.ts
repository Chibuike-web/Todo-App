import { updateTodoCount } from "./main.js";
const allBtn = document.querySelector(".all-btn");

allBtn?.addEventListener("click", (e: Event) => {
	e.preventDefault();

	const todoContainer = document.querySelectorAll(".todo-container");
	todoContainer.forEach((todo) => {
		todo.classList.remove("hide-todo");
		updateTodoCount();
	});
});
