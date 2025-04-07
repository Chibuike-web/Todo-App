import "./active.js";
import "./completed.js";
import "./all.js";
import "./draggable.js";

// Cached DOM elements
const textInput = document.getElementById("text-input") as HTMLInputElement;
const todosContainer = document.getElementById("todos-container") as HTMLElement;
const todoItemQuantity = document.querySelector(".todo-item-quantity");
const filterContainer = document.querySelector(".filter-container");
const bottomDiv = document.querySelector(".bottom-row");
const clearCompletedBtn = document.querySelector(".clear-completed-btn");

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
	let result;
	if (todos.length > 1) {
		result = `${todos.length} items left`;
	} else {
		result = `${todos.length} item left`;
	}
	todoItemQuantity.textContent = result;
}

//  Update the bottom row paragraph with the current number of todo items.
export function updateTodoCount(): void {
	const todos = todosContainer.querySelectorAll(".todo-container");
	const bottomRowParagraph = document.querySelector(".bottom-row p");
	let length = todos.length;

	todos.forEach((todo) => {
		if (todo.classList.contains("hide-todo")) {
			length--;
		}
	});

	if (bottomRowParagraph) {
		let result;
		if (length > 1) {
			result = `${length} items left`;
		} else {
			result = `${length} item left`;
		}
		bottomRowParagraph.textContent = result;
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
				cancelBtn.addEventListener("click", (e: Event) => {
					e.preventDefault();
					// Only remove if the checkbox is still checked
					if (!checkbox.checked) return;
					todoContainer?.remove();
					updateTodoCount();
					// Hide bottom row if no todos remain
					if (todosContainer.children.length === 0 && bottomDiv) {
						bottomDiv.classList.add("hide");
					}
				});
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
textInput.addEventListener("keydown", (e: KeyboardEvent): void => {
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
});

clearCompletedBtn?.addEventListener("click", (e) => {
	e.preventDefault();
	const todos = document.querySelectorAll(".todo-container");
	todos.forEach((todo) => {
		const todoItem = todo.querySelector(".todo-item");
		if (todoItem?.classList.contains("checked")) {
			todo.remove();
			updateTodoCount();
		}
	});
});

const iconMoon = `<svg
							width="26"
							height="26"
							viewBox="0 0 26 26"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_1760_29)">
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M13 0C13.81 0 14.603 0.074 15.373 0.216C10.593 1.199 7 5.43 7 10.5C7 16.299 11.701 21 17.5 21C20.496 21 23.2 19.745 25.113 17.732C23.22 22.572 18.51 26 13 26C5.82 26 0 20.18 0 13C0 5.82 5.82 0 13 0Z"
									fill="white"
								/>
							</g>
							<defs>
								<clipPath id="clip0_1760_29">
									<rect width="26" height="26" fill="white" />
								</clipPath>
							</defs>
						</svg>`;

const iconSun = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 21C13.2652 21 13.5196 21.1054 13.7071 21.2929C13.8946 21.4804 14 21.7348 14 22V25C14 25.2652 13.8946 25.5196 13.7071 25.7071C13.5196 25.8946 13.2652 26 13 26C12.7348 26 12.4804 25.8946 12.2929 25.7071C12.1054 25.5196 12 25.2652 12 25V22C12 21.7348 12.1054 21.4804 12.2929 21.2929C12.4804 21.1054 12.7348 21 13 21ZM7.343 18.657C7.53047 18.8445 7.63579 19.0988 7.63579 19.364C7.63579 19.6292 7.53047 19.8835 7.343 20.071L5.222 22.192C5.0334 22.3742 4.7808 22.475 4.5186 22.4727C4.2564 22.4704 4.00559 22.3652 3.82018 22.1798C3.63477 21.9944 3.5296 21.7436 3.52733 21.4814C3.52505 21.2192 3.62584 20.9666 3.808 20.778L5.928 18.657C6.02087 18.564 6.13116 18.4903 6.25256 18.4399C6.37396 18.3896 6.50408 18.3637 6.6355 18.3637C6.76692 18.3637 6.89704 18.3896 7.01844 18.4399C7.13984 18.4903 7.25013 18.564 7.343 18.657ZM20.071 18.657L22.192 20.778C22.3742 20.9666 22.475 21.2192 22.4727 21.4814C22.4704 21.7436 22.3652 21.9944 22.1798 22.1798C21.9944 22.3652 21.7436 22.4704 21.4814 22.4727C21.2192 22.475 20.9666 22.3742 20.778 22.192L18.657 20.072C18.4694 19.8845 18.3639 19.6301 18.3638 19.3649C18.3637 19.0996 18.469 18.8451 18.6565 18.6575C18.844 18.4699 19.0984 18.3644 19.3636 18.3643C19.6289 18.3642 19.8834 18.4695 20.071 18.657ZM13 8C14.3261 8 15.5979 8.52678 16.5355 9.46447C17.4732 10.4021 18 11.6739 18 13C18 14.3261 17.4732 15.5979 16.5355 16.5355C15.5979 17.4732 14.3261 18 13 18C11.6739 18 10.4021 17.4732 9.46447 16.5355C8.52678 15.5979 8 14.3261 8 13C8 11.6739 8.52678 10.4021 9.46447 9.46447C10.4021 8.52678 11.6739 8 13 8ZM25 12C25.2652 12 25.5196 12.1054 25.7071 12.2929C25.8946 12.4804 26 12.7348 26 13C26 13.2652 25.8946 13.5196 25.7071 13.7071C25.5196 13.8946 25.2652 14 25 14H22C21.7348 14 21.4804 13.8946 21.2929 13.7071C21.1054 13.5196 21 13.2652 21 13C21 12.7348 21.1054 12.4804 21.2929 12.2929C21.4804 12.1054 21.7348 12 22 12H25ZM4 12C4.26522 12 4.51957 12.1054 4.70711 12.2929C4.89464 12.4804 5 12.7348 5 13C5 13.2652 4.89464 13.5196 4.70711 13.7071C4.51957 13.8946 4.26522 14 4 14H1C0.734784 14 0.48043 13.8946 0.292893 13.7071C0.105357 13.5196 0 13.2652 0 13C0 12.7348 0.105357 12.4804 0.292893 12.2929C0.48043 12.1054 0.734784 12 1 12H4ZM22.192 3.808C22.3795 3.99553 22.4848 4.24984 22.4848 4.515C22.4848 4.78016 22.3795 5.03447 22.192 5.222L20.072 7.343C19.8845 7.53064 19.6301 7.63611 19.3649 7.6362C19.0996 7.6363 18.8451 7.53101 18.6575 7.3435C18.4699 7.15599 18.3644 6.90162 18.3643 6.63635C18.3642 6.37108 18.4695 6.11664 18.657 5.929L20.778 3.808C20.9655 3.62053 21.2198 3.51521 21.485 3.51521C21.7502 3.51521 22.0045 3.62053 22.192 3.808ZM5.222 3.808L7.343 5.928C7.53077 6.11538 7.63642 6.36967 7.6367 6.63494C7.63698 6.90021 7.53188 7.15473 7.3445 7.3425C7.15712 7.53027 6.90283 7.63592 6.63756 7.6362C6.37229 7.63648 6.11777 7.53138 5.93 7.344L3.808 5.222C3.62584 5.0334 3.52505 4.7808 3.52733 4.5186C3.5296 4.2564 3.63477 4.00559 3.82018 3.82018C4.00559 3.63477 4.2564 3.5296 4.5186 3.52733C4.7808 3.52505 5.0334 3.62584 5.222 3.808ZM13 0C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1V4C14 4.26522 13.8946 4.51957 13.7071 4.70711C13.5196 4.89464 13.2652 5 13 5C12.7348 5 12.4804 4.89464 12.2929 4.70711C12.1054 4.51957 12 4.26522 12 4V1C12 0.734784 12.1054 0.48043 12.2929 0.292893C12.4804 0.105357 12.7348 0 13 0Z" fill="white"/>
</svg>
`;

const themeToggler = document.querySelector(".theme-toggler");
let darkTheme = localStorage.getItem("darkTheme") === "enabled";

function toggleTheme() {
	darkTheme = !darkTheme;
	document.body.classList.toggle("dark-theme", darkTheme);
	if (themeToggler) {
		themeToggler.innerHTML = darkTheme ? iconSun : iconMoon;
	}
	localStorage.setItem("darkTheme", darkTheme ? "enabled" : "disabled");
}

if (darkTheme) {
	document.body.classList.add("dark-theme");
	if (themeToggler) {
		themeToggler.innerHTML = iconSun;
	}
} else {
	if (themeToggler) {
		themeToggler.innerHTML = iconMoon;
	}
}
themeToggler?.addEventListener("click", toggleTheme);
