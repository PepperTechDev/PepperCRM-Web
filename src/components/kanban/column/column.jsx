import { useDroppable } from "@dnd-kit/core";
import Task from "../../task/pages/Task";
import styles from "./Column.module.css";
import { CircleX, Pencil, Plus, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function Column({ column, onEditTitle, onDeleteColumn, onAddTask, onEditTask, onDeleteTask }) {
  const { setNodeRef } = useDroppable({ id: column.id });

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
    <div className={styles.column} ref={setNodeRef}>
      <div className={styles.header}>
        <h3 className={styles.title}>{column.title}</h3>
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
