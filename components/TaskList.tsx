import { View, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { Task } from '../types';

// Props definition for TaskList
interface TaskListProps {
  tasks: Task[]; // Array of tasks to display
  toggleTask: (id: string) => void; // Function to toggle status
  deleteTask: (id: string) => void; // Function to delete a task
}

// Functional component to render the list of tasks
export default function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  return (
    // Wrap all task items in a vertical container
    <View style={styles.listContainer}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ))}
    </View>
  );
}

// Styling for the list container
const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,
  },
});
