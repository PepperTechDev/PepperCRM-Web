import { useDroppable, useDraggable } from "@dnd-kit/core";
import Task from "../../task/pages/Task";
import styles from "./Column.module.css";
import { CircleX, Pencil, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function Column({
  column,
  onEditTitle,
  onDeleteColumn,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onCopyTask,
  onAddChecklistItem,
  onToggleChecklistItem,
  onEditChecklistItem,
  onDeleteChecklistItem,
}) {
  const {
    setNodeRef: setDraggableRef,
    attributes,
    listeners,
  } = useDraggable({ id: column.id });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: column.id,
  });

  const setNodeRef = (node) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  const handleAddTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: "New Card",
      html: `
      <div class="${styles.formGroup}">
        <label for="cardTitle" class="${styles.formLabel}">Title:</label>
        <input
          type="text"
          id="cardTitle"
          class="${styles.input}"
          placeholder="Write the title of the card"
        />
      </div>
      <div class="${styles.formGroup}">
        <label for="cardDescription" class="${styles.formLabel}">Description:</label>
        <textarea
          id="cardDescription"
          class="${styles.input} ${styles.textarea}"
          placeholder="Add a detailed description"
        ></textarea>
      </div>
      <div class="${styles.formGroup}">
        <label for="cardDueDate" class="${styles.formLabel}">Deadline:</label>
        <input
          type="datetime-local"
          id="cardDueDate"
          class="${styles.input}"
        />
      </div>
    `,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      customClass: {
        popup: styles.addForm,
        confirmButton: styles.btnConfirm,
        cancelButton: styles.btnCancel,
      },
      buttonsStyling: false,
      didOpen: () => {
        const dueInput = Swal.getPopup().querySelector("#cardDueDate");
        if (dueInput) {
          // Impide fechas pasadas
          dueInput.min = new Date().toISOString().slice(0, 16);
        }
      },
      preConfirm: () => {
        const titleEl = document.getElementById("cardTitle");
        const descEl = document.getElementById("cardDescription");
        const dueEl = document.getElementById("cardDueDate");

        const title = titleEl.value.trim();
        const description = descEl.value.trim();
        const dueRaw = dueEl.value;
        if (!title) {
          Swal.showValidationMessage("Title cannot be empty");
          return null;
        }
        if (!description) {
          Swal.showValidationMessage("Description cannot be empty");
          return null;
        }
        return {
          title,
          description,
          dueDate: dueRaw ? new Date(dueRaw).toISOString() : null,
        };
      },
    });

    if (formValues) {
      onAddTask(column.id, {
        id: `task-${Date.now()}`,
        title: formValues.title,
        content: formValues.description, // tu componente Task usa `content`
        dueDate: formValues.dueDate,
        checklist: [], // Initialize empty checklist for new tasks
      });
    }
  };

  return (
    <div
      className={styles.column}
      ref={setNodeRef}
      style={{
        backgroundColor: isOver ? "#e3f2fd" : "white", // Visual feedback
        transition: "background-color 0.2s ease-in-out",
      }}
    >
      <div className={styles.header}>
        <h3
          className={styles.title}
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }}
        >
          {column.title}
        </h3>
        <div className={styles.actions}>
          <button
            className={styles.updateBtn}
            onClick={() => onEditTitle(column.id, column.title)}
          >
            <Pencil />{" "}
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDeleteColumn(column.id)}
          >
            <CircleX />
          </button>
        </div>
      </div>
      <div>
        {column.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEditTask={(t) => onEditTask(column.id, t)}
            onDeleteTask={(t) => onDeleteTask(column.id, t)}
            onCopyTask={(t) => onCopyTask(column.id, t)}
             onAddChecklistItem={(itemText) => onAddChecklistItem(column.id, task.id, itemText)}
            onToggleChecklistItem={(checklistItemId) => onToggleChecklistItem(column.id, task.id, checklistItemId)}
            onEditChecklistItem={(checklistItemId, newText) => onEditChecklistItem(column.id, task.id, checklistItemId, newText)}
            onDeleteChecklistItem={(checklistItemId) => onDeleteChecklistItem(column.id, task.id, checklistItemId)}
          />
        ))}
      </div>
      <button className={styles.addTaskBtn} onClick={handleAddTask}>
        <Plus size={16} /> Add card
      </button>
    </div>
  );
}

export default Column;
