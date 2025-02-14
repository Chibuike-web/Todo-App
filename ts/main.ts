const textInput = document.getElementById("text-input") as HTMLInputElement;
const todosContainer = document.getElementById("todos-container") as HTMLElement;
const cancelBtnSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1760_33)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.97 0L17.678 0.707L9.546 8.84L17.678 16.972L16.971 17.679L8.839 9.547L0.707 17.679L0 16.97L8.132 8.838L0 0.707L0.707 0L8.84 8.132L16.971 0H16.97Z" fill="#494C6B"/>
</g>
<defs>
<clipPath id="clip0_1760_33">
<rect width="18" height="18" fill="white"/>
</clipPath>
</defs>
</svg>
`;

let todoCount: number = 0;
let bottomDivRendered: boolean = false;

textInput.onkeydown = (e: KeyboardEvent): void => {
	if (e.key === "Enter" && textInput.value) {
		todoCount++;

		// Create todo container and inner elements
		const todoContainer = document.createElement("div");
		todoContainer.className = "todo-container";

		const todoItem = document.createElement("div");
		todoItem.className = "todo-item";

		const cancelBtn = document.createElement("button");
		cancelBtn.innerHTML = cancelBtnSvg;
		cancelBtn.className = "cancel-btn";

		// Append items to the container
		todoContainer.appendChild(todoItem);
		todoContainer.appendChild(cancelBtn);
		todosContainer?.appendChild(todoContainer);

		const uniqueId = `task-${todoCount}`;

		const checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.className = "checkbox";
		checkBox.id = uniqueId;
		todoItem.appendChild(checkBox);

		// Create the label and append it
		const label = document.createElement("label");
		label.setAttribute("for", uniqueId);
		label.textContent = textInput.value;
		todoItem.appendChild(label);

		// Clear the text input
		textInput.value = "";

		(checkBox as HTMLInputElement).onclick = (e: MouseEvent): void => {
			// Get the label in the current todo item
			const activeLabel = todoContainer.querySelector("label") as HTMLLabelElement | null;
			// Toggle the "checked" class based on the checkbox state
			if ((checkBox as HTMLInputElement).checked) {
				activeLabel?.classList.add("checked");
				cancelBtn.onclick = (e: MouseEvent): void => {
					e.preventDefault();
					todoContainer.remove();

					// Query the DOM for the bottom row each time
					const bottomDiv = document.querySelector(".bottom-row");
					if (todosContainer.children.length === 0 && bottomDiv) {
						bottomDivRendered = false;
						bottomDiv?.remove();
					}
				};
			} else {
				activeLabel?.classList.remove("checked");
			}
		};

		// If the bottom row hasn't been rendered, add it
		if (todosContainer && !bottomDivRendered) {
			const bottomDiv = document.createElement("div");
			bottomDiv.classList.add("bottom-row");
			const paragraph = document.createElement("p");
			paragraph.textContent = "5 items left";
			bottomDiv.appendChild(paragraph);
			todosContainer.insertAdjacentElement("afterend", bottomDiv);
			bottomDivRendered = true;
		}
	}
};
