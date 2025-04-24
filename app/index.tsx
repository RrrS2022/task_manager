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
import SearchBar from "@/components/SearchBar";

export default function Home() {
  // const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
    searchQuery,
  } = useTasks();

  const getFilteredTasks = () => {
    let filtered = tasks;

    // 1. Filter by status
    if (filter === 'active') {
      filtered = filtered.filter((task: { status: TaskStatus; }) => task.status === TaskStatus.PENDING);
    } else if (filter === 'completed') {
      filtered = filtered.filter((task: { status: TaskStatus; }) => task.status === TaskStatus.COMPLETED);
    }

    // 2. Filter by search query (case-insensitive)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((task: { title: string; }) =>
        task.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskManager</Text>
      <SearchBar />
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