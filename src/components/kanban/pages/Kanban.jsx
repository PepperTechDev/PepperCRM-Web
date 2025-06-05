import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import Board from '../board/board';
import { fetchKanbanData } from '../../task/services/ApiKanban';
import Navbar from '../../navbar/pages/Navbar';
import Sidebar from '../../sidebar/pages/Sidebar';
import styles from '../styles/Kanban.module.css';
import Swal from 'sweetalert2';
import { initialData } from '../../placeholderdata';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  updateColumnTitle,
  deleteColumn as deleteColumnApi,
  reorderColumns,
} from '../service/kanbanService';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

  const handleEditColumnTitle = async (columnId, currentTitle) => {
  const { value: newTitle } = await Swal.fire({
    title: 'Edit Column Title',
    input: 'text',
    inputValue: currentTitle,
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Title cannot be empty!';
      }
    },
  });

  if (!newTitle || newTitle === currentTitle) return;
  // Uncomment the following lines to enable the API call for updating the column title

   try {
      // await updateColumnTitle(columnId, newTitle);
     const updatedColumns = columns.map((col) =>
       col.id === columnId ? { ...col, title: newTitle } : col
     );

     setColumns(updatedColumns);

     Swal.fire('Updated!', 'The column title was changed.', 'success');
   } catch (err) {
     console.error('Error updating column title:', err);
    Swal.fire('Error', 'There was a problem updating the column.', 'error');
   }
};

  const handleDeleteColumn = async (columnId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
    });
    if (isConfirmed) {
      try {
        // Uncomment the following line to enable the API call for deleting the column
        // await deleteColumnApi(columnId);

        const updatedColumns = columns.filter((col) => col.id !== columnId);
        setColumns(updatedColumns);

        Swal.fire('Deleted!', 'The column has been deleted.', 'success');
      } catch (err) {
        console.error('Error deleting column:', err);
        Swal.fire('Error', 'There was a problem deleting the column.', 'error');
      }
    }
  }


const handleDragEnd = (event) => {
  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const activeColumnIndex = columns.findIndex(col => col.id === active.id);
  const overColumnIndex = columns.findIndex(col => col.id === over.id);

  if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(activeColumnIndex, 1);
    newColumns.splice(overColumnIndex, 0, movedColumn);
    //place here the axios function to update the column order in the backend
    
    setColumns(newColumns);
    return;
  }


  const fromColumnIndex = columns.findIndex(col =>
    col.tasks.some(task => task.id === active.id)
  );
  const toColumnIndex = columns.findIndex(col =>
    col.id === over.id || col.tasks.some(task => task.id === over.id)
  );

  //if didn't find the columns, return nothing
  if (fromColumnIndex === -1 || toColumnIndex === -1) return;

  const fromColumn = columns[fromColumnIndex];
  const toColumn = columns[toColumnIndex];

  const task = fromColumn.tasks.find(task => task.id === active.id);
  if (!task || (fromColumn.id === toColumn.id)) return;

  const updatedFromTasks = fromColumn.tasks.filter(t => t.id !== active.id);
  const updatedToTasks = [...toColumn.tasks, task];

  const newColumns = [...columns];
  newColumns[fromColumnIndex] = { ...fromColumn, tasks: updatedFromTasks };
  newColumns[toColumnIndex] = { ...toColumn, tasks: updatedToTasks };

  setColumns(newColumns);
};

  const handleAddTask = (columnId, newTask) => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );

    // Actualiza también el initialData en memoria
    const colIndex = initialData.findIndex(col => col.id === columnId);
    if (colIndex !== -1) {
      initialData[colIndex].tasks.push(newTask);
    }
  };

  const handleEditTask = async (columnId, task) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Card",
      html: `
        <input type="text" id="taskContent" class="swal2-input" value="${task.content}" />
        <input type="datetime-local" id="taskDueDate" class="swal2-input" value="${
          task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ""
        }" />
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
      setColumns((cols) =>
        cols.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map((t) =>
                  t.id === task.id
                    ? { ...t, content: formValues.content, dueDate: formValues.dueDate }
                    : t
                ),
              }
            : col
        )
      );
    }
  };

  const handleDeleteTask = async (columnId, task) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete card?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });
    if (isConfirmed) {
      setColumns(cols =>
        cols.map(col =>
          col.id === columnId
            ? { ...col, tasks: col.tasks.filter(t => t.id !== task.id) }
            : col
        )
      );
    }
  };

  const handleCopyTask = async (columnId, task) => {
    const id = uuidv4();
    const newTask = {
      ...task,
      id: `task-${id}`, 
      content: `${task.content} (Copy)`, // Modifica el contenido para indicar que es una copia
    };
    // add axios call to copy the task in the backend
    
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    );
  }

  const handleSetDueDate = async (columnId, task) => {
    const { value: dueDate } = await Swal.fire({
      title: "Set Due Date",
      html: `
        <input type="datetime-local" id="dueDate" class="swal2-input" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const input = document.getElementById("dueDate");
        return input.value ? new Date(input.value) : null;
      },
      showCancelButton: true,
    });
  
    if (dueDate) {
      setColumns(cols =>
        cols.map(col =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map(t =>
                  t.id === task.id ? { ...t, dueDate } : t
                ),
              }
            : col
        )
      );
    }
  };

  return (
    <section className={styles.containerKanban}>
        <Sidebar />
        <div className={styles.flexKanban}>
        <Navbar/>
        <DndContext onDragEnd={handleDragEnd}>
            <Board
              columns={columns}
              setColumns={setColumns}
              onEditTitle={handleEditColumnTitle}
              onDeleteColumn={handleDeleteColumn}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onCopyTask={handleCopyTask}
            />
        </DndContext>
        </div>
    </section>
  );
}

export default Kanban;