type Status = 'incomplete' | 'in-progress' | 'complete';

interface Task {
    id: number;
    text: string;
    status: Status;
}

export default Task;