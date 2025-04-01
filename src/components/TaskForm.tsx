import {FormEvent, useState} from "react";

interface TaskFormProps {
    onAddTask: (description: string) => void;
}

function TaskForm({onAddTask}: TaskFormProps) {
    const [newTaskText, setNewTaskText] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const taskText = newTaskText.trim();

        if (taskText) {
            onAddTask(taskText);
            setNewTaskText("");
        }
    };

    return (
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
    );
}

export default TaskForm;