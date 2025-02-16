export const activeButtonEvent = (activeBtn: HTMLElement) => {
	activeBtn.addEventListener("click", (e: Event) => {
		e.preventDefault();
		console.log("click");
		const todoItems = document.querySelectorAll(".todo-item");
		todoItems.forEach((todoItem) => {
			const todoContainer = todoItem.closest(".todo-container");
			const input = todoItem.querySelector("input");
			if (!input?.checked && todoContainer) {
				todoContainer.remove();
			} else {
				return;
			}
		});
		console.log(todoItems);
	});
};
