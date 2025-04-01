import {Task} from "../types/Task";

interface TaskItemProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onChangeDescription: (id: number, description: string) => void;
}

function TaskItem({task, onToggleComplete, onDelete, onEdit, onChangeDescription} : TaskItemProps) {
    return (
        <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <div className="todo-item-content">
                <input
                    id={`task${task.id}`}
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)}
                    className="todo-checkbox"
                />

                {task.isEditing ? (
                    <input
                        type="text"
                        value={task.description}
                        onChange={e => onChangeDescription(task.id, e.target.value)}
                        className="todo-edit-input"
                    />
                ) : (
                    <label
                        htmlFor={`task${task.id}`}
                        className="todo-label"
                    >
                        {task.description}
                    </label>
                )}
            </div>

            <div className="todo-item-actions">
                <button
                    type="button"
                    onClick={() => onEdit(task.id)}
                    className="btn btn-edit"
                >
                    {task.isEditing ? "Save" : "Edit"}
                </button>
                <button
                    type="button"
                    onClick={() => onDelete(task.id)}
                    className="btn btn-delete"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TaskItem;