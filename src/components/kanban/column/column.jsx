import { useDroppable } from "@dnd-kit/core";
import Task from "../../task/pages/Task";
import styles from "./Column.module.css";
import { CircleX, Pencil, Plus } from "lucide-react";
import Swal from "sweetalert2";

function Column({ column, onEditTitle, onDeleteColumn, onAddTask }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const handleAddTask = async () => {
    const { value: content } = await Swal.fire({
      title: "New Card",
      input: "text",
      inputPlaceholder: "Write...",
      showCancelButton: true,
    });
    if (content) {
      onAddTask(column.id, { id: `task-${Date.now()}`, content }); // Usa 'content'
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
          <Task key={task.id} task={task} />
        ))}
      </div>
      <button className={styles.addTaskBtn} onClick={handleAddTask}>
        <Plus size={16} /> Add card
      </button>
    </div>
  );
}

export default Column;
