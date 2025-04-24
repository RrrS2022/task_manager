import { useTasks } from "@/hooks/TaskContext";
import { Task, TaskStatus } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";

export default function TaskDetail() {
    // get id from the rout params 
    const { id } = useLocalSearchParams<{ id: string }>();

    const { tasks, toggleTask, deleteTask } = useTasks();
    
    // use router to go back or push to anaother screen
    const router = useRouter();

    const task = tasks.find((task: { id: string; }) => task.id === id);

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Task not found</Text>
            </View>
        )

    }

      // Confirm before deleting a task 
    const handleDelete = () => {
        Alert.alert(
        'Delete Task',
        'Are you sure you want to delete this task?',
        [
            { text: 'Cancel', style: 'cancel' }, // cancel option
            {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
                deleteTask(task.id); // delete task
                router.back();       // go back to previous screen
            },
            },
        ]
        );
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>← Back</Text>
            </Pressable>
            {/* Display task detials */}
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.meta}>Status: {task.status}</Text>
            <Text style={styles.meta}>
            Created: {task.timeCreated.toLocaleString()}
            </Text>
    
            {/* Action buttons: Toggle / Edit / Delete */}
            <View style={styles.buttonGroup}>
                {/* Toggle button: change status between pending/completed */}
                <Pressable
                    style={[
                    styles.button,
                    task.status === TaskStatus.COMPLETED && styles.pendingButton,
                    ]}
                    onPress={() => {
                    toggleTask(task.id); // toggle status
                    router.back();       // go back after toggle (optional)
                    }}
                >
                    <Text style={styles.buttonText}>
                    {task.status === TaskStatus.PENDING ? 'Mark as Completed' : 'Mark as Pending'}
                    </Text>
                </Pressable>
        
                {/* Edit button: navigate to edit screen */}
                <Pressable
                    style={[styles.button, styles.editButton]}
                    onPress={() => router.push(`/edit/${task.id}`)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
        
                {/* Delete button: open confirmation dialog */}
                <Pressable
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
    
}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 16,
      },
    backText: {
    fontSize: 16,
    color: '#007bff',
    },
    notFound: {
      fontSize: 18,
      color: '#999',
      textAlign: 'center',
      marginTop: 50,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      color: '#555',
      marginBottom: 16,
    },
    meta: {
      fontStyle: 'italic',
      color: '#888',
      marginBottom: 4,
    },
    buttonGroup: {
      marginTop: 24,
      gap: 12,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    editButton: {
      backgroundColor: '#6c757d',
    },
    pendingButton: {
      backgroundColor: '#17a2b8',
    },
  });
  