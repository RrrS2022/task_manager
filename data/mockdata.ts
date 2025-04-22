import { Task, TaskStatus } from "../types";

export const mockTask: Task[] = [
    {
        id: "1",
        title: "setup", 
        description: "setup enviornment" , 
        status: TaskStatus.COMPLETED,
        timeCreated: new Date("2025-04-20T09:15:00"), 
    },
    {
        id: "2",
        title: "read documentation", 
        description: "read documentation about React Native" , 
        status: TaskStatus.COMPLETED,
        timeCreated: new Date("2025-04-20T09:30:00"), 
    },
    {
        id: "3",
        title: "Review algorithm", 
        description: "" , 
        status: TaskStatus.PENDING,
        timeCreated: new Date("2025-04-21T19:15:00"), 
    },
    {
        id: "4",
        title: "Task Manager App", 
        description: "Build a task manager app using React Native and TypeScript" , 
        status: TaskStatus.COMPLETED,
        timeCreated: new Date("2025-04-21T20:01:00"), 
    }
]