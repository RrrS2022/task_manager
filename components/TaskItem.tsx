import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Task, TaskStatus } from '../types';
import { useRouter } from 'expo-router';

/**
 * defines the props for taskItem component
 */
interface TaskItemProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

/**
 * TaskItem component receives a task and control functions as props
 */
export default function TaskItem({ task, toggleTask, deleteTask }: TaskItemProps) {
  {/* decide text decoration based on task status */}
  const textStyle = {
    textDecorationLine: task.status === TaskStatus.COMPLETED ? 'line-through' : 'none' as 'none' | 'line-through',
  };

  const router  = useRouter();
  return (
    <Pressable onPress={() => router.push(`/task/${task.id}`)}>
      <View style={styles.container}>
        <Text style={[styles.title, textStyle]}>{task.title}</Text>
        <Text style={[styles.description, textStyle]}>{task.description}</Text>
        <Text style={styles.status}>Status: {task.status}</Text>
        <View style={styles.buttons}>
          {/* button to toggle task status */}
          <Pressable style={styles.button} onPress={() => toggleTask(task.id)}>
            <Text style={styles.buttonText}>Toggle</Text>
          </Pressable>
          {/* button to delete the task*/}
          <Pressable style={[styles.button, styles.deleteButton]} onPress={() => deleteTask(task.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#555',
    marginBottom: 4,
  },
  status: {
    fontStyle: 'italic',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
  },
});

