import { useDroppable, useDraggable } from "@dnd-kit/core";
import Task from "../../task/pages/Task";
import styles from "./Column.module.css";
import { CircleX, Pencil, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function Column({ column, onEditTitle, onDeleteColumn, onAddTask, onEditTask, onDeleteTask, onCopyTask }) {
  const { setNodeRef: setDraggableRef, attributes, listeners } = useDraggable({ id: column.id });
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: column.id });

  const setNodeRef = (node) => {
    setDraggableRef(node);
    setDroppableRef(node);
  }

  const handleAddTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: "New Card",
      html: `
        <input type="text" id="taskContent" class="swal2-input" placeholder="Task content" />
        <input type="datetime-local" id="taskDueDate" class="swal2-input" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const content = document.getElementById("taskContent").value;
        const dueDate = document.getElementById("taskDueDate").value;
        if (!content) {
          Swal.showValidationMessage("Task content cannot be empty");
          return null;
        }
        return { content, dueDate: dueDate ? new Date(dueDate).toISOString() : null };
      },
      showCancelButton: true,
    });

    if (formValues) {
      onAddTask(column.id, {
        id: `task-${Date.now()}`,
        content: formValues.content,
        dueDate: formValues.dueDate,
      });
    }
  };

  return (
    <div className={styles.column} ref={setNodeRef}
          style={{
        backgroundColor: isOver ? "#e3f2fd" : "white", // Visual feedback
        transition: "background-color 0.2s ease-in-out",
      }}>
      <div className={styles.header} >
        <h3 className={styles.title} {...attributes} {...listeners} style={{ cursor: "grab" }}>{column.title}</h3>
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
            <CircleX  />
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
