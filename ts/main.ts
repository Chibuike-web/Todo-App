import "./active.js";

// Cached DOM elements
const textInput = document.getElementById("text-input") as HTMLInputElement;
const todosContainer = document.getElementById("todos-container") as HTMLElement;
const todoItemQuantity = document.querySelector(".todo-item-quantity");
const filterContainer = document.querySelector(".filter-container");
const bottomDiv = document.querySelector(".bottom-row");
let todoCount = 0;

const cancelBtnSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
	<g clip-path="url(#clip0_1760_33)">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M16.97 0L17.678 0.707L9.546 8.84L17.678 16.972L16.971 17.679L8.839 9.547L0.707 17.679L0 16.97L8.132 8.838L0 0.707L0.707 0L8.84 8.132L16.971 0H16.97Z" fill="#494C6B"/>
	</g>
	<defs>
		<clipPath id="clip0_1760_33">
			<rect width="18" height="18" fill="white"/>
		</clipPath>
	</defs>
</svg>`;

// Initialize todo count display
if (todoItemQuantity) {
	const todos = todosContainer.querySelectorAll(".todo-container");
	todoItemQuantity.textContent = `${todos.length} items left`;
}

//  Update the bottom row paragraph with the current number of todo items.
export function updateTodoCount(): void {
	const todos = todosContainer.querySelectorAll(".todo-container");
	const bottomRowParagraph = document.querySelector(".bottom-row p");
	if (bottomRowParagraph) {
		bottomRowParagraph.textContent = `${todos.length} items left`;
	}
}

// Attach event to checkbox for toggling the checked state and handling deletion.
function attachCheckEvent(checkbox: HTMLInputElement): void {
	checkbox.addEventListener("click", () => {
		const todoItem = checkbox.closest(".todo-item");
		const todoContainer = checkbox.closest(".todo-container");
		const cancelBtn = todoContainer?.querySelector(".cancel-btn");

		if (checkbox.checked) {
			todoItem?.classList.add("checked");

			if (cancelBtn) {
				(cancelBtn as HTMLButtonElement).onclick = (e: MouseEvent) => {
					e.preventDefault();

					// Only remove if the checkbox is still checked
					if (!checkbox.checked) return;

					todoContainer?.remove();
					updateTodoCount();

					// Hide bottom row if no todos remain
					if (todosContainer.children.length === 0 && bottomDiv) {
						bottomDiv.classList.add("hide");
					}
				};
			}
		} else {
			todoItem?.classList.remove("checked");
		}
	});
}

// Attach events to any pre-existing checkboxes
const checkboxes = document.querySelectorAll(".checkbox");
checkboxes.forEach((checkbox) => attachCheckEvent(checkbox as HTMLInputElement));

// Setup filtering buttons to manage active state.
const filteredBtns = filterContainer?.querySelectorAll("button");
filteredBtns?.forEach((filteredBtn) => {
	filteredBtn.addEventListener("click", (e) => {
		e.preventDefault();
		filteredBtns.forEach((btn) => btn.classList.remove("active"));
		filteredBtn.classList.add("active");
	});
});

// Handle adding a new todo item when Enter is pressed.
textInput.onkeydown = (e: KeyboardEvent): void => {
	if (e.key === "Enter" && textInput.value) {
		todoCount++;

		// Create elements for the new todo
		const todoContainer = document.createElement("div");
		todoContainer.className = "todo-container";

		const todoItem = document.createElement("label");
		todoItem.className = "todo-item";

		const cancelBtn = document.createElement("button");
		cancelBtn.innerHTML = cancelBtnSvg;
		cancelBtn.className = "cancel-btn";

		// Build todo structure
		todoContainer.appendChild(todoItem);
		todoContainer.appendChild(cancelBtn);
		todosContainer.appendChild(todoContainer);

		const checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.className = "checkbox";
		todoItem.appendChild(checkBox);

		const p = document.createElement("p");
		p.textContent = textInput.value;
		todoItem.appendChild(p);

		// Clear the input after adding
		textInput.value = "";

		attachCheckEvent(checkBox);

		// Ensure the bottom row is visible
		bottomDiv?.classList.remove("hide");

		// Update todo count display
		updateTodoCount();
	}
};
