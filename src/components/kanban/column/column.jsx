import { useDroppable } from '@dnd-kit/core';
import Task from '../../task/pages/Task';
import styles from './Column.module.css';

function Column({ column }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className={styles.column}ref={setNodeRef}>
      <h3>{column.title}</h3>
      {column.tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;