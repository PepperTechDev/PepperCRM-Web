import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2 } from "lucide-react";
import styles from "./../styles/Task.module.css";

function Task({ task, onEditTask, onDeleteTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
    const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
  };

  return (
    <div ref={setNodeRef} className={styles.task} style={{ cursor: "grab", ...style }}>
      <span {...listeners} {...attributes} style={{ flex: 1, cursor: "grab" }}>
        {task.content}
      </span>
      {task.dueDate && (
        <div className={styles.dueDate}>
          <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
        </div>
      )}
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