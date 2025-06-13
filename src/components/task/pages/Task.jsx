// Task.jsx
import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2, Copy, PlusCircle, CheckSquare, Square, XCircle } from "lucide-react";
import styles from "./../styles/Task.module.css";
import Swal from "sweetalert2"; // Import Swal for adding checklist items

function Task({
  task,
  onEditTask,
  onDeleteTask,
  onCopyTask,
  onAddChecklistItem,
  onToggleChecklistItem,
  onEditChecklistItem,
  onDeleteChecklistItem,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
  };


  const handleAddChecklistClick = async () => {
    const { value: itemText } = await Swal.fire({
      title: "Add Checklist Item",
      input: "text",
      inputPlaceholder: "Enter item description",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Item description cannot be empty!";
        }
      },
    });

    if (itemText) {
      onAddChecklistItem(itemText);
    }
  };

  const handleEditChecklistItemClick = async (item) => {
    const { value: newText } = await Swal.fire({
      title: "Edit Checklist Item",
      input: "text",
      inputValue: item.text,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Item description cannot be empty!";
        }
      },
    });

    if (newText && newText !== item.text) {
      onEditChecklistItem(item.id, newText);
    }
  };


  return (
    <div ref={setNodeRef} className={styles.task} style={{ cursor: "grab", ...style }}>
        <div
      {...listeners}
       {...attributes}
      style={{ flex: 1, cursor: "grab" }}
     >
       {task.title && (
         <div className={styles.taskTitle}>{task.title}</div>
       )}

       {task.content && (
        <div className={styles.taskDescription}>{task.content}</div>
      )}
    </div>
      {task.dueDate && (
        <div className={styles.dueDate}>
          <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
        </div>
      )}

      {/* Checklist Section */}
      {task.checklist && task.checklist.length > 0 && (
        <div className={styles.checklistContainer}>
          <h4 className={styles.checklistTitle}>Checklist</h4>
          {task.checklist.map((item) => (
            <div key={item.id} className={styles.checklistItem}>
              <button
                className={styles.checklistToggleBtn}
                onClick={() => onToggleChecklistItem(item.id)}
              >
                {item.completed ? <CheckSquare size={18} /> : <Square size={18} />}
              </button>
              <span
                className={`${styles.checklistItemText} ${item.completed ? styles.completed : ''}`}
                onClick={() => handleEditChecklistItemClick(item)} // Allow editing by clicking text
              >
                {item.text}
              </span>
              <button
                className={styles.checklistDeleteBtn}
                onClick={() => onDeleteChecklistItem(item.id)}
              >
                <XCircle size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className={styles.addChecklistBtn}
        onClick={handleAddChecklistClick}
      >
        <PlusCircle size={16} /> Add Checklist Item
      </button>

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
      
        <button
          className={styles.iconBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // Handle comments logic here
            onViewComments(task);
          }}
          >
          <MessageCircle size={16} />
        </button>
        
      </div>
    </div>
  );
}

export default Task;