import { View, Text, StyleSheet } from 'react-native';
import { Task } from '../types';

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps){
    return (
        <View style={styles.container}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.status}>
          Status: {task.status === 'pending' ? '⏳ Pending' : '✅ Completed'}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    },
    title: {

    },
    description: {

    },
    status: {
        
    }
})