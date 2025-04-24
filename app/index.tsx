import AddTask from "@/components/AddTask";
import TaskFilter from "@/components/TaskFIlter";
import TaskList from "@/components/TaskList";
import { useStateForPath } from "@react-navigation/native";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Task, TaskStatus } from "../types"
import { ScrollView } from "react-native";
import { INITIAL_TASKS } from "@/data/mockdata";
import { useTasks } from "@/hooks/TaskContext";

export default function Home() {
  // const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const getFilteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks
      case 'completed':
        return tasks.filter((task: { status: TaskStatus; }) => task.status === TaskStatus.COMPLETED)
      case 'active':
        return tasks.filter((task: { status: TaskStatus; }) => task.status === TaskStatus.PENDING)
      default:
        return tasks;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskManager</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AddTask addTask={addTask} />
        <TaskList 
          tasks={getFilteredTasks()} 
          deleteTask={deleteTask} 
          toggleTask={toggleTask}/>
        <TaskFilter setFilter={setFilter}/>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 60, 
  },
});