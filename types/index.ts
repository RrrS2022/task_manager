/**
 * define a task
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    timeCreated: Date;
}

/**
 * define task status
 */
export enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed"
}

/**
 * interface for forming the input data
 */
export interface TaskForm {
    title: string;
    description: string;
}