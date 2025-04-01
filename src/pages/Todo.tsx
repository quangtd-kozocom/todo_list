import {FormEvent, useState} from "react";

type Task = {
    id: number;
    description: string;
    completed: boolean;
    isEditing?: boolean;
}

function Todo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showStatus, setShowStatus] = useState<'all' | 'active' | 'completed'>('all');
    const [newTaskText, setNewTaskText] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newTaskText.trim()) {
            const newTask: Task = {
                id: tasks.length + 1,
                description: newTaskText.trim(),
                completed: false
            };
            setTasks([...tasks, newTask]);
            setNewTaskText("");
        }
    }

    const markTaskAsCompleted = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    }

    const deleteTask = (id: number) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        }
    }

    const editTask = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, isEditing: !task.isEditing} : task
            )
        );
    }

    const onChangeTaskDescription = (id: number, description: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, description} : task
            )
        );
    }

    const filteredTasks = () => {
        switch (showStatus) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    }

    const activeTasksCount = tasks.filter(task => !task.completed).length;

    return (
        <div className="todo-container">
            <div className="todo-app">
                <h1 className="app-title">TodoMatic</h1>
                <h2 className="app-subtitle">What needs to be done?</h2>

                <form onSubmit={handleSubmit} className="todo-form">
                    <input
                        type="text"
                        placeholder="Enter a new task"
                        name="task"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        className="todo-input"
                    />
                    <button type="submit" className="btn btn-add">Add</button>
                </form>

                <div className="filter-buttons">
                    <button
                        type="button"
                        onClick={() => setShowStatus("all")}
                        className={`btn filter-btn ${showStatus === 'all' ? 'active' : ''}`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowStatus("active")}
                        className={`btn filter-btn ${showStatus === 'active' ? 'active' : ''}`}
                    >
                        Active
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowStatus("completed")}
                        className={`btn filter-btn ${showStatus === 'completed' ? 'active' : ''}`}
                    >
                        Completed
                    </button>
                </div>

                <div className="todo-list-container">
                    <h2 className="tasks-count">
                        {activeTasksCount} {activeTasksCount > 0 ? "tasks" : "task"} remaining
                    </h2>

                    {filteredTasks().length > 0 ? (
                        <ul className="todo-list">
                            {filteredTasks().map((task) => (
                                <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
                                    <div className="todo-item-content">
                                        <input
                                            id={`task${task.id}`}
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => markTaskAsCompleted(task.id)}
                                            className="todo-checkbox"
                                        />

                                        {task.isEditing ? (
                                            <input
                                                type="text"
                                                value={task.description}
                                                onChange={e => onChangeTaskDescription(task.id, e.target.value)}
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
                                            onClick={() => editTask(task.id)}
                                            className="btn btn-edit"
                                        >
                                            {task.isEditing ? "Save" : "Edit"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteTask(task.id)}
                                            className="btn btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-state">No tasks to display</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Todo;