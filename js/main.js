"use strict";
const textInput = document.getElementById("text-input");
const todosContainer = document.getElementById("todos-container");
let todoCount = 0;
let bottomDivRendered = false;
textInput.onkeydown = (e) => {
    if (e.key === "Enter") {
        todoCount++;
        console.log(textInput.value);
        const todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        const todoItem = document.createElement("div");
        todoItem.className = "todo-item";
        todoContainer.appendChild(todoItem);
        todosContainer === null || todosContainer === void 0 ? void 0 : todosContainer.appendChild(todoContainer);
        const uniqueId = `task-${todoCount}`;
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.id = uniqueId;
        todoItem.appendChild(checkBox);
        const label = document.createElement("label");
        label.setAttribute("for", uniqueId);
        label.textContent = textInput.value;
        todoItem.appendChild(label);
        if (todosContainer && !bottomDivRendered) {
            const bottomDiv = document.createElement("div");
            const paragraph = document.createElement("p");
            paragraph.textContent = "5 items left";
            bottomDiv.appendChild(paragraph);
            todosContainer.insertAdjacentElement("afterend", bottomDiv);
            bottomDivRendered = true;
        }
    }
};
