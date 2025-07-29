// Task.jsx
import {useDraggable} from "@dnd-kit/core";
import {
    CheckSquare,
    CircleUserRound,
    Copy,
    MessageCircle,
    Pencil,
    PlusCircle,
    Square,
    Tag,
    Trash2,
    XCircle,
} from "lucide-react";
import styles from "./../styles/Task.module.css";
import Swal from "sweetalert2"; // Import Swal for adding checklist items

function Task({
                  task,
                  labels,
                  onEditTask,
                  onDeleteTask,
                  onCopyTask,
                  onAddChecklistItem,
                  onToggleChecklistItem,
                  onEditChecklistItem,
                  onDeleteChecklistItem,
                  onViewComments,
                  onChangeAssignedTo,
                  onAssignLabels,
              }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: task.id});
    const dragStyle = {transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : ""};


    const fallbackLabels = [
        {id: 'example-1', name: 'Urgente', color: '#ff0000'},
        {id: 'example-2', name: 'Revisión', color: '#00ff00'},
        {id: 'example-3', name: 'Opcional', color: '#0000ff'}
    ];
    const allLabels = (labels && labels.length > 0) ? labels : fallbackLabels;
    const primaryLabelId = task.labels && task.labels.length > 0 ? task.labels[0] : null;
    const primaryLabel = allLabels.find(l => l.id === primaryLabelId);
    const cardBorder = primaryLabel ? `4px solid ${primaryLabel.color}` : 'none';

    // Handle label assignment popup with checkboxes
    const handleLabelClick = async (e) => {
        e.stopPropagation();

        const html = allLabels.map(lbl => (
            `<div style="display:flex; align-items: center; margin-bottom: 8px;">
         <input type='checkbox' id='${lbl.id}' name='labels' value='${lbl.id}'
           ${task.labels?.includes(lbl.id) ? 'checked' : ''} />
         <label for='${lbl.id}' style='margin-left: 8px;'>
           <span style='display:inline-block;width:12px;height:12px;background-color:${lbl.color};margin-right:4px;border-radius:2px;'></span>
           ${lbl.name}
         </label>
       </div>`
        )).join('');

        const {value: selected} = await Swal.fire({
            title: 'Assign Labels',
            html,
            showCancelButton: true,
            confirmButtonText: 'OK',
            focusConfirm: false,
            preConfirm: () => Array.from(
                document.querySelectorAll('input[name="labels"]:checked')
            ).map(input => input.value)
        });

        if (selected) onAssignLabels(selected);
    };


    const handleAddChecklistClick = async () => {
        const {value: itemText} = await Swal.fire({
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
        const {value: newText} = await Swal.fire({
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
        <div
            ref={setNodeRef}
            className={styles.task}
            style={{cursor: "grab", borderLeft: cardBorder, ...dragStyle}}
        >
            <div {...listeners} {...attributes} style={{flex: 1, cursor: "grab"}}>
                {task.labels && task.labels.length > 0 && (
                    <div className={styles.labelsContainer}>
                        {task.labels.map((lid) => {
                            const lbl = labels.find((l) => l.id === lid);
                            return (
                                <span
                                    key={lid}
                                    className={styles.label}
                                    style={{backgroundColor: lbl?.color}}
                                >
                  {lbl?.name}
                </span>
                            );
                        })}
                    </div>
                )}
                {task.title && <div className={styles.taskTitle}>{task.title}</div>}

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
                                {item.completed ? (
                                    <CheckSquare size={18}/>
                                ) : (
                                    <Square size={18}/>
                                )}
                            </button>
                            <span
                                className={`${styles.checklistItemText} ${
                                    item.completed ? styles.completed : ""
                                }`}
                                onClick={() => handleEditChecklistItemClick(item)} // Allow editing by clicking text
                            >
                {item.text}
              </span>
                            <button
                                className={styles.checklistDeleteBtn}
                                onClick={() => onDeleteChecklistItem(item.id)}
                            >
                                <XCircle size={16}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.taskActionsRow}>
                {/* Label button */}
                <button
                    className={styles.iconBtn}
                    type="button"
                    onClick={handleLabelClick}
                >
                    <Tag size={16}/>
                </button>
                {/* Other action icons... */}
            </div>

            <button
                className={styles.addChecklistBtn}
                onClick={handleAddChecklistClick}
            >
                <PlusCircle size={16}/> Add Checklist Item
            </button>
            <div className={styles.taskEnd}>
                <div className={styles.taskActions}>
                    <button
                        className={styles.iconBtn}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onEditTask(task);
                        }}
                    >
                        <Pencil size={16}/>
                    </button>
                    <button
                        className={styles.iconBtn}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(task);
                        }}
                    >
                        <Trash2 size={16}/>
                    </button>
                    <button
                        className={styles.iconBtn}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onCopyTask(task);
                        }}
                    >
                        <Copy size={16}/>
                    </button>

                    <button
                        className={styles.iconBtn}
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewComments(task);
                        }}
                    >
                        <MessageCircle size={16}/>
                        {task.comments && task.comments.length > 0 && (
                            <span className={styles.commentCount}>
                {task.comments.length}
              </span>
                        )}
                    </button>

                    <div className={styles.assignedTo}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onChangeAssignedTo(task);
                            }}
                            className={styles.iconBtn}
                        >
                            <CircleUserRound size={20}/>
                        </button>

                        {task.assignedTo ? (
                            <span>{task.assignedTo.name}</span>
                        ) : (
                            <span className={styles.unassigned}>Unassigned</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;
