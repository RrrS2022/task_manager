import { createContext, useContext, useState } from 'react';
import { Task, TaskStatus } from '../types';
import { INITIAL_TASKS } from '../data/mockdata';

// set up an empty context with a default value null
const TasksContext = createContext<any>(null);

// Create provider component, children refers to all nested components inside the provider
export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  // hold current list of tasks
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // generate a new task object using the passed in title and decription
  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(), // create a unique id
      title,
      description,
      status: TaskStatus.PENDING, // set deault status to pending
      timeCreated: new Date(),
    }; 
    // add the new task to the top of the task list
    setTasks(prev => [newTask, ...prev]);
  };

  // filters out the task with the matching id
  const deleteTask = (id: string) => {
    // update the state with the new array
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // find the task with the matching id and toggle its status
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

// Export context hook
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
