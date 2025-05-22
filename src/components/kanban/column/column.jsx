import { useDroppable } from '@dnd-kit/core';
import Task from '../../task/pages/Task';
import styles from './Column.module.css';
import { CircleX,Pencil } from 'lucide-react';

function Column({ column , onEditTitle, onDeleteColumn }) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className={styles.column} ref={setNodeRef}>
      <div className={styles.header}>
        <h3 className={styles.title}>{column.title}</h3>
        <div className={styles.actions}>
          <button className={styles.updateBtn} onClick={() => onEditTitle(column.id, column.title)}><Pencil color='white'/></button>
          <button className={styles.deleteBtn} ><CircleX color='white'/></button>
        </div>
      </div>
      {column.tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Column;