import { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { INITIAL_TASKS } from '../data/mockdata';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  /**
   * Add a new task
   */
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

  /**
   * Delete a task by its id
   */
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  /**
   * Toggle task status
   */
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

  /**
   * Update task title/description
   */
  const updateTask = (id: string, updatedData: Partial<Omit<Task, 'id' | 'status' | 'timeCreated'>>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? {
              ...task,
              ...updatedData,
            }
          : task
      )
    );
  };

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
  };
};
