import { activeButtonEvent } from "./active.js";
const textInput = document.getElementById("text-input");
const todosContainer = document.getElementById("todos-container");
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
let todoCount = 0;
let bottomDivRendered = false;
function updateTodoCount() {
    const bottomRowParagraph = document.querySelector(".bottom-row p");
    if (bottomRowParagraph) {
        bottomRowParagraph.textContent = `${todoCount} items left`;
    }
}
textInput.onkeydown = (e) => {
    if (e.key === "Enter" && textInput.value) {
        todoCount++;
        // Create todo container and inner elements
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        const uniqueId = `task-${todoCount}`;
        const todoItem = document.createElement("label");
        todoItem.setAttribute("for", uniqueId);
        todoItem.className = "todo-item";
        const cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = cancelBtnSvg;
        cancelBtn.className = "cancel-btn";
        // Append items to the container
        todoContainer.appendChild(todoItem);
        todoContainer.appendChild(cancelBtn);
        todosContainer?.appendChild(todoContainer);
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.id = uniqueId;
        todoItem.appendChild(checkBox);
        const p = document.createElement("p");
        p.textContent = textInput.value;
        todoItem.appendChild(p);
        // Clear the text input
        textInput.value = "";
        checkBox.onclick = (e) => {
            // Get the label in the current todo item
            const activeLabel = todoContainer.querySelector("label");
            // Toggle the "checked" class based on the checkbox state
            if (checkBox.checked) {
                activeLabel?.classList.add("checked");
                cancelBtn.onclick = (e) => {
                    if (!checkBox.checked) {
                        return;
                    }
                    e.preventDefault();
                    todoContainer.remove();
                    todoCount--;
                    updateTodoCount();
                    // Query the DOM for the bottom row each time
                    const bottomDiv = document.querySelector(".bottom-row");
                    if (todosContainer.children.length === 0 && bottomDiv) {
                        bottomDivRendered = false;
                        bottomDiv?.remove();
                    }
                };
            }
            else {
                activeLabel?.classList.remove("checked");
            }
        };
        // If the bottom row hasn't been rendered, add it
        if (todosContainer && !bottomDivRendered) {
            const bottomDiv = document.createElement("div");
            bottomDiv.classList.add("bottom-row");
            const paragraph = document.createElement("p");
            paragraph.textContent = `${todoCount} items left`;
            bottomDiv.appendChild(paragraph);
            const filterContainer = document.createElement("div");
            filterContainer.className = "filter-container";
            const allBtn = document.createElement("button");
            allBtn.type = "button";
            allBtn.textContent = "All";
            allBtn.className = "all-btn";
            allBtn.classList.add("active");
            filterContainer.appendChild(allBtn);
            const activeBtn = document.createElement("button");
            activeBtn.type = "button";
            activeBtn.textContent = "Active";
            activeBtn.className = "active-btn";
            filterContainer.appendChild(activeBtn);
            activeButtonEvent(activeBtn, updateTodoCount);
            const completedBtn = document.createElement("button");
            completedBtn.type = "button";
            completedBtn.textContent = "Completed";
            completedBtn.className = "completed-btn";
            filterContainer.appendChild(completedBtn);
            const filteredBtns = filterContainer.querySelectorAll("button");
            filteredBtns.forEach((filteredBtn) => {
                filteredBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    filteredBtns.forEach((btn) => btn.classList.remove("active"));
                    filteredBtn.classList.add("active");
                });
            });
            bottomDiv.appendChild(filterContainer);
            const clearCompletedBtn = document.createElement("button");
            clearCompletedBtn.type = "button";
            clearCompletedBtn.className = "clear-completed-btn";
            clearCompletedBtn.textContent = "Clear Completed";
            bottomDiv.appendChild(clearCompletedBtn);
            todosContainer.insertAdjacentElement("afterend", bottomDiv);
            bottomDivRendered = true;
        }
        else {
            updateTodoCount();
        }
    }
};
