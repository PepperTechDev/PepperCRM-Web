export function saveKanbanData(data) {
  localStorage.setItem("kanbanData", JSON.stringify(data));
}

export function loadKanbanData() {
  const data = localStorage.getItem("kanbanData");
  return data ? JSON.parse(data) : null;
}