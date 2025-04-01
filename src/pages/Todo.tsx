import { useState } from "react";
import TaskForm from "../components/TaskForm";
import FilterButtons from "../components/FilterButtons";
import TaskList from "../components/TaskList";
import { Task, FilterStatus } from "../types/Task";

function Todo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showStatus, setShowStatus] = useState<FilterStatus>('all');

    const addTask = (description: string) => {
        const newTask: Task = {
            id: tasks.length + 1,
            description,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const markTaskAsCompleted = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    const deleteTask = (id: number) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        }
    };

    const editTask = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, isEditing: !task.isEditing} : task
            )
        );
    };

    const onChangeTaskDescription = (id: number, description: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? {...task, description} : task
            )
        );
    };

    const filteredTasks = () => {
        switch (showStatus) {
            case 'active':
                return tasks.filter(task => !task.completed);
            case 'completed':
                return tasks.filter(task => task.completed);
            default:
                return tasks;
        }
    };

    const activeTasksCount = tasks.filter(task => !task.completed).length;

    return (
        <div className="todo-container">
            <div className="todo-app">
                <h1 className="app-title">TodoMatic</h1>
                <h2 className="app-subtitle">What needs to be done?</h2>

                <TaskForm onAddTask={addTask} />

                <FilterButtons
                    currentFilter={showStatus}
                    onFilterChange={setShowStatus}
                />

                <div className="todo-list-container">
                    <h2 className="tasks-count">
                        {activeTasksCount} {activeTasksCount > 0 ? "tasks" : "task"} remaining
                    </h2>

                    <TaskList
                        tasks={filteredTasks()}
                        onToggleComplete={markTaskAsCompleted}
                        onDelete={deleteTask}
                        onEdit={editTask}
                        onChangeDescription={onChangeTaskDescription}
                    />
                </div>
            </div>
        </div>
    );
}

export default Todo;