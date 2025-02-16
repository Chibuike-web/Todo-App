export const activeButtonEvent = (activeBtn, updateTodoCount) => {
    activeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("click");
        const todoItems = document.querySelectorAll(".todo-item");
        todoItems.forEach((todoItem) => {
            const todoContainer = todoItem.closest(".todo-container");
            const input = todoItem.querySelector("input");
            if (!input?.checked && todoContainer) {
                todoContainer.remove();
                // Directly update the global variables
                updateTodoCount();
            }
        });
    });
};
