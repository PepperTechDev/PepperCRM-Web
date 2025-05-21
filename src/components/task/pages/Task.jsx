import { useDraggable } from '@dnd-kit/core';
import styles from '../styles/Task.module.css';

function Task({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
  };

  return (
    <div className={styles.task} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {task.content}
    </div>
  );
}

export default Task;