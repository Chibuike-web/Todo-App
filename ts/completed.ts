import { updateTodoCount } from "./main.js";
const completedBtn = document.querySelector(".completed-btn");

completedBtn?.addEventListener("click", (e: Event) => {
	e.preventDefault();
	console.log(completedBtn);
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
