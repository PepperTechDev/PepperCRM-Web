import {useEffect, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import Board from "../board/board";
import {fetchKanbanData} from "../../task/services/ApiKanban";
import Navbar from "../../navbar/pages/Navbar";
import Sidebar from "../../sidebar/pages/Sidebar";
import styles from "../styles/Kanban.module.css";
import Swal from "sweetalert2";
import {initialData} from "../../placeholderdata";
import "react-datepicker/dist/react-datepicker.css";
import withReactContent from "sweetalert2-react-content";
import {v4 as uuidv4} from "uuid";
import {getBoartAll, sendEmail} from "../service/kanbanService";
import {loadKanbanData, saveKanbanData} from "../../../utils/localCache";
import {getUser} from "../../../features/user/services/UserService";

let USER_ID = null;

function Kanban() {
    const mySwalReact = withReactContent(Swal);
    const saved = loadKanbanData();
    const [columns, setColumns] = useState(() =>
        saved?.columns?.length ? saved.columns : initialData.columns
    );
    const [users, setUsers] = useState(() =>
        saved?.users?.length ? saved.users : initialData.users
    );
    const [labels, setLabels] = useState(() =>
        saved?.labels?.length ? saved.labels : initialData.labels || []
    );
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (saved?.columns?.length) return;

        const loadFromApi = async () => {
            try {
                const res = await fetchKanbanData();
                if (res.data.columns?.length) {
                    setColumns(res.data.columns);
                    setUsers(res.data.users);
                }
            } catch (err) {
                console.error("Error loading Kanban data:", err);
            }
        };
        loadFromApi();

        // Ejemplo de otra fuente de tableros (opcional)
        getBoartAll()
            .then(({columns: apiCols}) => {
                console.log("Tableros cargados:", apiCols);
                // Si quisieras mezclar usuarios:
                // setUsers(apiUsers);
            })
            .catch((err) => console.error("No pude cargar tableros:", err));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Persist in cache on every change
    useEffect(() => {
        saveKanbanData({columns, users, labels});
    }, [columns, users, labels]);

    // Create new label
    const handleAddLabel = async () => {
        const {value: formValues} = await Swal.fire({
            title: "New Label",
            html: `
        <input id="labelName" class="swal2-input" placeholder="Label name">
        <input id="labelColor" type="color" class="swal2-input" value="#ff0000">
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Add",
            preConfirm: () => {
                const name = document.getElementById('labelName').value.trim();
                const color = document.getElementById('labelColor').value;
                if (!name) {
                    Swal.showValidationMessage('Label name cannot be empty');
                    return null;
                }
                return {name, color};
            }
        });

        if (formValues) {
            const newLabel = {id: `label-${uuidv4()}`, ...formValues};
            setLabels(prev => [...prev, newLabel]);
            Swal.fire('Added!', `Label "${formValues.name}" created.`, 'success');
        }
    };

    // Assign labels to a task
    const handleAssignLabels = (columnId, taskId, selectedLabelIds) => {
        setColumns(prevCols =>
            prevCols.map(col =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map(task =>
                            task.id === taskId
                                ? {...task, labels: selectedLabelIds}
                                : task
                        ),
                    }
                    : col
            )
        );
    };


    const handleEditColumnTitle = async (columnId, currentTitle) => {
        const {value: newTitle} = await Swal.fire({
            title: "Edit Column Title",
            input: "text",
            inputValue: currentTitle,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Title cannot be empty!";
                }
            },
        });

        if (!newTitle || newTitle === currentTitle) return;
        // Uncomment the following lines to enable the API call for updating the column title

        try {
            // await updateColumnTitle(columnId, newTitle);
            const updatedColumns = columns.map((col) =>
                col.id === columnId ? {...col, title: newTitle} : col
            );

            setColumns(updatedColumns);

            Swal.fire("Updated!", "The column title was changed.", "success");
        } catch (err) {
            console.error("Error updating column title:", err);
            Swal.fire("Error", "There was a problem updating the column.", "error");
        }
    };

    const handleDeleteColumn = async (columnId) => {
        const {isConfirmed} = await Swal.fire({
            title: "Are you sure?",

            icon: "warning",
            showCancelButton: true,
        });
        if (isConfirmed) {
            try {
                // Uncomment the following line to enable the API call for deleting the column
                // await deleteColumnApi(columnId);

                const updatedColumns = columns.filter((col) => col.id !== columnId);
                setColumns(updatedColumns);

                Swal.fire("Deleted!", "The column has been deleted.", "success");
            } catch (err) {
                console.error("Error deleting column:", err);
                Swal.fire("Error", "There was a problem deleting the column.", "error");
            }
        }
    };

    const handleDragEnd = (event) => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const activeColumnIndex = columns.findIndex((col) => col.id === active.id);
        const overColumnIndex = columns.findIndex((col) => col.id === over.id);

        if (activeColumnIndex !== -1 && overColumnIndex !== -1) {
            const newColumns = [...columns];
            const [movedColumn] = newColumns.splice(activeColumnIndex, 1);
            newColumns.splice(overColumnIndex, 0, movedColumn);
            //place here the axios function to update the column order in the backend

            setColumns(newColumns);
            return;
        }

        const fromColumnIndex = columns.findIndex((col) =>
            col.tasks.some((task) => task.id === active.id)
        );
        const toColumnIndex = columns.findIndex(
            (col) =>
                col.id === over.id || col.tasks.some((task) => task.id === over.id)
        );

        //if didn't find the columns, return nothing
        if (fromColumnIndex === -1 || toColumnIndex === -1) return;

        const fromColumn = columns[fromColumnIndex];
        const toColumn = columns[toColumnIndex];

        const task = fromColumn.tasks.find((task) => task.id === active.id);
        if (!task || fromColumn.id === toColumn.id) return;

        const updatedFromTasks = fromColumn.tasks.filter((t) => t.id !== active.id);
        const updatedToTasks = [...toColumn.tasks, task];

        const newColumns = [...columns];
        newColumns[fromColumnIndex] = {...fromColumn, tasks: updatedFromTasks};
        newColumns[toColumnIndex] = {...toColumn, tasks: updatedToTasks};

        setColumns(newColumns);
    };

    const handleAddTask = (columnId, newTask) => {
        setColumns((cols) =>
            cols.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: [
                            ...col.tasks,
                            {
                                ...newTask,
                                checklist: [], // Initialize checklist for new tasks
                            },
                        ],
                    }
                    : col
            )
        );

        // Actualiza también el initialData en memoria
        const colIndex = initialData.findIndex((col) => col.id === columnId);
        if (colIndex !== -1) {
            initialData[colIndex].tasks.push(newTask);
        }
    };

    const handleEditTask = async (columnId, task) => {
        const {value: formValues} = await Swal.fire({
            title: "Edit Card",
            html: `
    <div class="${styles.formGroup}">
      <label for="cardTitle" class="${styles.formLabel}">Title:</label>
      <input
        type="text"
        id="cardTitle"
        class="${styles.input}"
        placeholder="Write the title of the card"
      />
    </div>
    <div class="${styles.formGroup}">
      <label for="cardDescription" class="${styles.formLabel}">Descripción:</label>
      <textarea
        id="cardDescription"
        class="${styles.input} ${styles.textarea}"
        placeholder="Add a detailed description"
      ></textarea>
    </div>
    <div class="${styles.formGroup}">
      <label for="cardDueDate" class="${styles.formLabel}">Deadline:</label>
      <input
        type="datetime-local"
        id="cardDueDate"
        class="${styles.input}"
      />
    </div>
  `,
            focusConfirm: false,
            didOpen: () => {
                const dueInput = Swal.getPopup().querySelector("#cardDueDate");
                if (dueInput) {
                    dueInput.min = new Date().toISOString().slice(0, 16);
                }
            },
            preConfirm: () => {
                const titleEl = document.getElementById("cardTitle");
                const descEl = document.getElementById("cardDescription");
                const dueEl = document.getElementById("cardDueDate");

                const title = titleEl.value.trim();
                const description = descEl.value.trim();
                const dueRaw = dueEl.value;

                if (!description) {
                    Swal.showValidationMessage("Description cannot be empty");
                    return null;
                }
                return {
                    title,
                    description,
                    dueDate: dueRaw ? new Date(dueRaw).toISOString() : null,
                };
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
                                    ? {
                                        ...t,
                                        title: formValues.title,
                                        content: formValues.description,
                                        dueDate: formValues.dueDate,
                                    }
                                    : t
                            ),
                        }
                        : col
                )
            );
        }
    };

    const handleDeleteTask = async (columnId, task) => {
        const {isConfirmed} = await Swal.fire({
            title: "Delete card?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
        });
        if (isConfirmed) {
            setColumns((cols) =>
                cols.map((col) =>
                    col.id === columnId
                        ? {...col, tasks: col.tasks.filter((t) => t.id !== task.id)}
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

        setColumns((cols) =>
            cols.map((col) =>
                col.id === columnId ? {...col, tasks: [...col.tasks, newTask]} : col
            )
        );
    };

    // New Checklist Handlers
    const handleAddChecklistItem = (columnId, taskId, itemText) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map((task) =>
                            task.id === taskId
                                ? {
                                    ...task,
                                    checklist: [
                                        ...(task.checklist || []), // Ensure checklist exists
                                        {id: uuidv4(), text: itemText, completed: false},
                                    ],
                                }
                                : task
                        ),
                    }
                    : col
            )
        );
    };

    const handleToggleChecklistItem = (columnId, taskId, checklistItemId) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map((task) =>
                            task.id === taskId
                                ? {
                                    ...task,
                                    checklist: task.checklist.map((item) =>
                                        item.id === checklistItemId
                                            ? {...item, completed: !item.completed}
                                            : item
                                    ),
                                }
                                : task
                        ),
                    }
                    : col
            )
        );
    };

    const handleEditChecklistItem = (
        columnId,
        taskId,
        checklistItemId,
        newText
    ) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map((task) =>
                            task.id === taskId
                                ? {
                                    ...task,
                                    checklist: task.checklist.map((item) =>
                                        item.id === checklistItemId
                                            ? {...item, text: newText}
                                            : item
                                    ),
                                }
                                : task
                        ),
                    }
                    : col
            )
        );
    };

    const handleDeleteChecklistItem = (columnId, taskId, checklistItemId) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.id === columnId
                    ? {
                        ...col,
                        tasks: col.tasks.map((task) =>
                            task.id === taskId
                                ? {
                                    ...task,
                                    checklist: task.checklist.filter(
                                        (item) => item.id !== checklistItemId
                                    ),
                                }
                                : task
                        ),
                    }
                    : col
            )
        );
    };

    const handleViewComments = async (task, columnId) => {
        // Asegura que siempre haya un array de comentarios
        const comments = task.comments || [];

        // Renderiza los comentarios existentes en HTML
        const commentsHtml = comments.length
            ? `<ul style="text-align:left;padding-left:1em;">
        ${comments
                .map(
                    (c) =>
                        `<li><b>${c.author}:</b> ${c.comment}</li>`
                )
                .join("")}
      </ul>`
            : `<div style="color:#888;">No comments yet.</div>`;

        // Renderiza el select de usuarios
        const userOptions = users
            .map(
                (u) =>
                    `<option value="${u.id}">${u.name}</option>`
            )
            .join("");

        const {value: formValues} = await mySwalReact.fire({
            title: `Comments for "${task.content}"`,
            html: `
      <div style="margin-bottom:12px;max-height:120px;overflow:auto">${commentsHtml}</div>
      <div style="margin-bottom:8px;text-align:left;">
        <label for="userSelect"><b>User:</b></label>
        <select id="userSelect" class="${styles.input}" style="width:100%;margin-top:2px;">
          <option value="">Select a user</option>
          ${userOptions}
        </select>
      </div>
      <div style="text-align:left;">
        <label for="commentInput"><b>Comment:</b></label>
        <textarea id="commentInput" class="${styles.input} ${styles.textarea}" rows="3" style="width:100%;margin-top:2px;" placeholder="Write a comment"></textarea>
      </div>
    `,
            showCancelButton: true,
            confirmButtonText: 'Add Comment',
            cancelButtonText: 'Close',
            preConfirm: () => {
                const userId = document.getElementById('userSelect').value;
                const comment = document.getElementById('commentInput').value.trim();
                if (!userId && comment) {
                    Swal.showValidationMessage('Please select a user.');
                    return false;
                }
                if (userId && !comment) {
                    Swal.showValidationMessage('Please write a comment.');
                    return false;
                }
                if (!userId && !comment) {
                    // No new comment to add, just close
                    return null;
                }
                const user = users.find(u => u.id === userId);
                return {author: user.name, comment};
            }
        });

        // Si se agregó un comentario nuevo
        if (formValues) {
            setColumns((cols) =>
                cols.map((col) =>
                    col.id === columnId
                        ? {
                            ...col,
                            tasks: col.tasks.map((t) =>
                                t.id === task.id
                                    ? {
                                        ...t,
                                        comments: [...(t.comments || []), formValues],
                                    }
                                    : t
                            ),
                        }
                        : col
                )
            );
            Swal.fire('Saved!', 'Comment added.', 'success');
        }
    };

    const handleAssignUser = async (task, columnId) => {
        const {value: selectedUserId} = await mySwalReact.fire({
            title: `Assign user to ${task.content}`,
            input: "select",
            inputOptions: users.reduce((acc, user) => {
                acc[user.id] = user.name;
                return acc;
            }, {}),
            inputPlaceholder: "Select a user",
            showCancelButton: true,
        });

        if (selectedUserId) {
            const selectedUser = users.find((u) => u.id === selectedUserId);
            setColumns((cols) =>
                cols.map((col) =>
                    col.id === columnId
                        ? {
                            ...col,
                            tasks: col.tasks.map((t) =>
                                t.id === task.id ? {...t, assignedTo: selectedUser} : t
                            ),
                        }
                        : col
                )
            );

            Swal.fire(
                "Assigned!",
                `${selectedUser.name} was assigned to the task.`,
                "success"
            );
        }
    };

    // Solicita permiso para notificaciones al cargar la app
    useEffect(() => {
        if (Notification && Notification.permission !== "granted") {
            Notification.requestPermission();
        }
    }, []);

    // Programa alertas para deadlines de tareas
    useEffect(() => {
        // Limpia timers anteriores
        if (window._kanbanDeadlineTimers) {
            window._kanbanDeadlineTimers.forEach(clearTimeout);
        }
        window._kanbanDeadlineTimers = [];

        columns.forEach((col) => {
            col.tasks.forEach((task) => {
                if (task.dueDate) {
                    const due = new Date(task.dueDate).getTime();
                    const now = Date.now();
                    if (due > now) {
                        const timeout = setTimeout(async () => {
                            const msg = `La tarjeta "${
                                task.title || task.content
                            }"¡ está vencida!`;
                            if (Notification.permission === "granted") {
                                new Notification("¡Tarjeta vencida!", {body: msg});
                            } else {
                                alert(msg);
                            }
                            // Enviar email
                            try {
                                USER_ID = localStorage.getItem("userId");
                                const user = await getUser(USER_ID);
                                setProfile(user);
                                await sendEmail({
                                    recipient: profile.email,
                                    msgBody: msg,
                                    subject: "Notificación de vencimiento de tarjeta",
                                });
                            } catch (error) {
                                Swal.fire(
                                    "Error",
                                    "No se pudo enviar el correo de notificación.",
                                    "error" + error
                                );
                            }
                        }, due - now);
                        window._kanbanDeadlineTimers.push(timeout);
                    }
                }
            });
        });
    }, [columns]);

    useEffect(() => {
        if (saved?.columns?.length) return;
        const loadFromApi = async () => {
            try {
                const res = await fetchKanbanData();
                if (res.data.columns?.length) {
                    setColumns(res.data.columns);
                    setUsers(res.data.users);
                    // y ya se guardará automáticamente por el useEffect anterior
                }
            } catch (e) {
                console.error("No pude cargar datos desde API:", e);
            }
        };
        loadFromApi();
    }, []);

    return (
        <section className={styles.containerKanban}>
            <Sidebar/>
            <div className={styles.flexKanban}>
                <Navbar/>

                <div style={{margin: '16px 0', textAlign: 'right'}}>
                    <button className="btn" onClick={handleAddLabel}>
                        + Add Label
                    </button>
                </div>

                <DndContext onDragEnd={handleDragEnd}>
                    <Board
                        columns={columns}
                        users={users}
                        labels={labels}
                        setColumns={setColumns}
                        onEditTitle={handleEditColumnTitle}
                        onDeleteColumn={handleDeleteColumn}
                        onAddTask={handleAddTask}
                        onEditTask={handleEditTask}
                        onDeleteTask={handleDeleteTask}
                        onCopyTask={handleCopyTask}
                        onAddChecklistItem={handleAddChecklistItem}
                        onToggleChecklistItem={handleToggleChecklistItem}
                        onEditChecklistItem={handleEditChecklistItem}
                        onDeleteChecklistItem={handleDeleteChecklistItem}
                        onViewComments={handleViewComments}
                        onChangeAssignedTo={handleAssignUser}
                        onAssignLabels={handleAssignLabels}
                    />
                </DndContext>
            </div>
        </section>
    );
}

export default Kanban;
