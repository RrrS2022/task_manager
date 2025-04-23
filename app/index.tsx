import AddTask from "@/components/AddTask";
import TaskFilter from "@/components/TaskFIlter";
import TaskList from "@/components/TaskList";
import { useStateForPath } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Task, TaskStatus } from "../types"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  /**
   * add a new task
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
   * delete a task by its id
   */
  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id != id)
    setTasks(newTasks)
  };
/**
 * 
 * @param id  task id
 * find the task, flip its status (pending <-> completed)
 */
  const toggleTask = (id: string) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id
      ? {
        ...task,
        status: 
          task.status ===TaskStatus.PENDING
            ? TaskStatus.COMPLETED
            : TaskStatus.PENDING
      } : task
      )
    );
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks
      case 'completed':
        return tasks.filter(task => task.status === TaskStatus.COMPLETED)
      case 'active':
        return tasks.filter(task => task.status === TaskStatus.PENDING)
      default:
        return tasks;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskManager</Text>
      <AddTask addTask={addTask} />
      {/* <TaskList tasks={getFilteredTasks()} deleteTask={deleteTask} toggleTask={toggleTask}/> */}
      {/* <TaskFilter setFilter={setFilter}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});