import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2, Copy } from "lucide-react";
import styles from "./../styles/Task.module.css";

function Task({ task, onEditTask, onDeleteTask , onCopyTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
    const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
  };

  return (
    <div ref={setNodeRef} className={styles.task} style={{ cursor: "grab", ...style }}>
        <div
      {...listeners}
       {...attributes}
      style={{ flex: 1, cursor: "grab" }}
     >
       {/* Si manejas título por separado */}
       {task.title && (
         <div className={styles.taskTitle}>{task.title}</div>
       )}

       {/* Descripción */}
       {task.content && (
        <div className={styles.taskDescription}>{task.content}</div>
      )}
       {/* Si en tu modelo usas `task.description` en lugar de `content`, sustitúyelo aquí */}
    </div>
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
          <button
          className={styles.iconBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCopyTask(task);
          }}
        >
          <Copy size={16} />
        </button>
      </div>
    </div>
  );
}

export default Task;