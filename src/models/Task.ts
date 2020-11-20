export type Status = 'incomplete' | 'in-progress' | 'complete';

export interface Task {
    id: number;
    text: string;
    status: Status;
}
