import { updateTodoCount } from "./main.js";
const completedBtn = document.querySelector(".completed-btn");

completedBtn?.addEventListener("click", (e: Event) => {
	e.preventDefault();

	const todoContainer = document.querySelectorAll(".todo-container");
	todoContainer.forEach((todo) => {
		todo.classList.remove("hide-todo");
		updateTodoCount();
	});

	const todoItems = document.querySelectorAll(".todo-item");
	todoItems.forEach((todoItem) => {
		const todoContainer = todoItem.closest(".todo-container");
		const input = todoItem.querySelector("input");
		if (!input?.checked && todoContainer) {
			todoContainer.classList.add("hide-todo");
			updateTodoCount();
		}
	});
});
