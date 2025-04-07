const todosContainer = document.getElementById("todos-container") as HTMLElement;
const cards = document.querySelectorAll(".todo-container") as NodeListOf<HTMLElement>;

cards.forEach((card) => {
	card.addEventListener("dragstart", dragStart);
	card.addEventListener("dragend", dragEnd);
	card.addEventListener("dragover", dragOver);
	card.addEventListener("drop", drop);
});

function dragStart(e: DragEvent): void {
	const target = e.target as HTMLElement;
	target.classList.add("dragging");
	e.dataTransfer?.setData("text/plain", target.outerHTML);
	setTimeout(() => {
		target.classList.add("ghost");
	}, 0);
}

function dragEnd(e: DragEvent): void {
	const target = e.target as HTMLElement;
	target.classList.remove("dragging");
	cards.forEach((c) => c.classList.remove("ghost"));
}

function dragOver(e: DragEvent): void {
	e.preventDefault();
}

function drop(e: DragEvent): void {
	e.preventDefault();
	const target = e.target as HTMLElement;

	const draggedCard = document.querySelector(".dragging") as HTMLElement | null;

	if (!draggedCard || target === draggedCard) return;

	// draggedCard?.remove();

	const targetCard = target.closest(".todo-container") as HTMLElement | null;
	if (targetCard) {
		const targetCardSize = targetCard.getBoundingClientRect();
		const mousePositionY = e.clientY;
		const midpoint = (targetCardSize.top + targetCardSize.bottom) / 2;

		if (mousePositionY < midpoint) {
			targetCard?.insertAdjacentElement("beforebegin", draggedCard);
		} else if (mousePositionY > midpoint) {
			targetCard.insertAdjacentElement("afterend", draggedCard);
		} else {
			todosContainer.appendChild(draggedCard);
		}
	}
}
