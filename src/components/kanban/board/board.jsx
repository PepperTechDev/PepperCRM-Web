import Column from '../column/column';
import styles from './Board.module.css';
import Swal from 'sweetalert2';

function Board({ columns, setColumns }) {
  const handleAddColumn = async () => {
    const { value: title } = await Swal.fire({
      title: 'Add New Column',
      input: 'text',
      inputLabel: 'Column name',
      inputPlaceholder: 'Enter column title',
      showCancelButton: true,
    });

    if (title) {
      const newColumn = {
        id: `col-${Date.now()}`,
        title,
        tasks: [],
      };
      setColumns(prev => [...prev, newColumn]);
    }
    else if(title === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You need to enter a column name!',
        });
    }
  };

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        {columns.map(column => (
          <Column key={column.id} column={column} />
        ))}
        <button className={styles.addButton} onClick={handleAddColumn}>
          ➕ Add Column
        </button>
      </div>
    </div>
  );
}

export default Board;