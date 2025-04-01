import {Task} from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onChangeDescription: (id: number, description: string) => void;
}

function TaskList({ tasks, onToggleComplete, onEdit, onChangeDescription, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className="empty-state">No tasks to display</p>;
    }

    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onChangeDescription={onChangeDescription}
                />
            ))}
        </ul>
    );
}

export default TaskList;