"use strict";
const todosContainer = document.getElementById("todos-container");
const cards = document.querySelectorAll(".todo-container");
cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    card.addEventListener("dragover", dragOver);
    card.addEventListener("drop", drop);
});
function dragStart(e) {
    const target = e.target;
    target.classList.add("dragging");
    e.dataTransfer?.setData("text/plain", target.outerHTML);
    setTimeout(() => {
        target.classList.add("ghost");
    }, 0);
}
function dragEnd(e) {
    const target = e.target;
    target.classList.remove("dragging");
    cards.forEach((c) => c.classList.remove("ghost"));
}
function dragOver(e) {
    e.preventDefault();
}
function drop(e) {
    e.preventDefault();
    const target = e.target;
    const draggedCard = document.querySelector(".dragging");
    if (!draggedCard || target === draggedCard)
        return;
    // draggedCard?.remove();
    const targetCard = target.closest(".todo-container");
    if (targetCard) {
        const targetCardSize = targetCard.getBoundingClientRect();
        const mousePositionY = e.clientY;
        const midpoint = (targetCardSize.top + targetCardSize.bottom) / 2;
        if (mousePositionY < midpoint) {
            targetCard?.insertAdjacentElement("beforebegin", draggedCard);
        }
        else if (mousePositionY > midpoint) {
            targetCard.insertAdjacentElement("afterend", draggedCard);
        }
        else {
            todosContainer.appendChild(draggedCard);
        }
    }
}
