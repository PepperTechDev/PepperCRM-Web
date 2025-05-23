import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2 } from "lucide-react";
import styles from "./../styles/Task.module.css";

function Task({ task, onEditTask, onDeleteTask }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={styles.task}
      style={{ cursor: "grab" }}
    >
      {/* Solo el texto es draggable */}
      <span {...listeners} {...attributes} style={{ flex: 1, cursor: "grab" }}>
        {task.content}
      </span>
      <div className={styles.taskActions}>
        <button
          className={styles.iconBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEditTask(task);
          }}
        >
          <Pencil size={16} />
        </button>
        <button
          className={styles.iconBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteTask(task);
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default Task;