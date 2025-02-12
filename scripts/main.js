var textInput = document.getElementById("text-input");
var todosContainer = document.getElementById("todos-container");
var todoCount = 0;
textInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        todoCount++;
        console.log(textInput.value);
        var todoContainer = document.createElement("div");
        todoContainer.className = "todo-container";
        var todoItem = document.createElement("div");
        todoItem.className = "todo-item";
        todoContainer.appendChild(todoItem);
        todosContainer === null || todosContainer === void 0 ? void 0 : todosContainer.appendChild(todoContainer);
        var uniqueId = "task-".concat(todoCount);
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "checkbox";
        checkBox.id = uniqueId;
        todoItem.appendChild(checkBox);
        var label = document.createElement("label");
        label.setAttribute("for", uniqueId);
        label.textContent = textInput.value;
        todoItem.appendChild(label);
    }
};
