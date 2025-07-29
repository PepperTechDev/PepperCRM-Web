import Column from "../column/column";
import styles from "./Board.module.css";
import Swal from "sweetalert2";
import {Plus} from "lucide-react";
import {useDroppable} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext,} from "@dnd-kit/sortable";

function Board({
                   columns,
                   users,
                   labels,
                   setColumns,
                   onEditTitle,
                   onDeleteColumn,
                   onAddTask,
                   onEditTask,
                   onDeleteTask,
                   onCopyTask,
                   onChangeAssignedTo,
                   onViewComments,
                   onAddChecklistItem,
                   onToggleChecklistItem,
                   onEditChecklistItem,
                   onDeleteChecklistItem,
                   onAssignLabels,
               }) {
    const {setNodeRef} = useDroppable({
        id: "board", // Necesario para que actúe como área de drop
    });

    const handleAddColumn = async () => {
        const {value: title} = await Swal.fire({
            title: "Add New Column",
            input: "text",
            inputLabel: "Column name",
            inputPlaceholder: "Enter column title",
            showCancelButton: true,
        });

        if (title) {
            const newColumn = {
                id: `col-${Date.now()}`,
                title,
                tasks: [],
            };
            setColumns((prev) => [...prev, newColumn]);
        } else if (title === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to enter a column name!",
            });
        }
    };

    return (
        <div className={styles.boardContainer}>
            <div className={styles.board} ref={setNodeRef}>
                <SortableContext
                    items={columns.map((col) => col.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    {columns.map((column) => (
                        <Column
                            key={column.id}
                            column={column}
                            users={users}
                            labels={labels}
                            onEditTitle={onEditTitle}
                            onDeleteColumn={onDeleteColumn}
                            onAddTask={onAddTask}
                            onEditTask={onEditTask}
                            onDeleteTask={onDeleteTask}
                            onCopyTask={onCopyTask}
                            onChangeAssignedTo={onChangeAssignedTo}
                            onViewComments={onViewComments}
                            onAddChecklistItem={onAddChecklistItem}
                            onToggleChecklistItem={onToggleChecklistItem}
                            onEditChecklistItem={onEditChecklistItem}
                            onDeleteChecklistItem={onDeleteChecklistItem}
                            onAssignLabels={onAssignLabels}
                        />
                    ))}
                </SortableContext>
                <button className={styles.addButton} onClick={handleAddColumn}>
                    <Plus size={16}/> Add Column
                </button>
            </div>
        </div>
    );
}

export default Board;
