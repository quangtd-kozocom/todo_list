export type Task = {
    id: number;
    description: string;
    completed: boolean;
    isEditing?: boolean;
};

export type FilterStatus = 'all' | 'active' | 'completed';