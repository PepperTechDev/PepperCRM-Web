import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Board from '../board/board';
import { fetchKanbanData } from '../../../services/ApiKanban';
import Navbar from '../../navbar/pages/Navbar';
import Sidebar from '../../sidebar/pages/Sidebar';
import styles from '../styles/Kanban.module.css';
function Kanban() {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchKanbanData();
        setColumns(res.data);
      } catch (err) {
        console.error('Error loading Kanban data:', err);
      }
    };
    loadData();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromColumnIndex = columns.findIndex(col =>
      col.tasks.some(task => task.id === active.id)
    );
    const toColumnIndex = columns.findIndex(col => col.id === over.id);

    if (fromColumnIndex === -1 || toColumnIndex === -1) return;

    const fromColumn = columns[fromColumnIndex];
    
    const toColumn = columns[toColumnIndex];

    const task = fromColumn.tasks.find(task => task.id === active.id);
    //TODO implement here axios.put and update the status of the toColumn

    const updatedFromTasks = fromColumn.tasks.filter(t => t.id !== active.id);
    const updatedToTasks = [...toColumn.tasks, task];

    const newColumns = [...columns];
    newColumns[fromColumnIndex] = { ...fromColumn, tasks: updatedFromTasks };
    newColumns[toColumnIndex] = { ...toColumn, tasks: updatedToTasks };

    setColumns(newColumns);
  };

  return (
    <section className={styles.containerKanban}>
        <Sidebar />
        <div className={styles.flexKanban}>
        <Navbar/>
        <DndContext onDragEnd={handleDragEnd}>
            <Board columns={columns} setColumns={setColumns} />
        </DndContext>
        </div>
    </section>
  );
}

export default Kanban;