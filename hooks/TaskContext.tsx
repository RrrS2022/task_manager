import { createContext, useContext, useState } from 'react';
import { Task, TaskStatus } from '../types';
import { INITIAL_TASKS } from '../data/mockdata';

// 1. Create context
const TasksContext = createContext<any>(null);

// 2. Create provider component
export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: TaskStatus.PENDING,
      timeCreated: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
            ...task,
            status:
              task.status === TaskStatus.PENDING
                ? TaskStatus.COMPLETED
                : TaskStatus.PENDING,
          }
          : task
      )
    );
  };

  const updateTask = (
    id: string,
    updated: { title: string; description: string }
  ) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updated } : task
      )
    );
  };

  const [searchQuery, setSearchQuery ] = useState('');
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <TasksContext.Provider
      value={{ tasks, filteredTasks, searchQuery, setSearchQuery, addTask, deleteTask, toggleTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );

  
};

// 3. Export context hook
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
