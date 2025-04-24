import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useTasks } from '@/hooks/useTasks';
import { useEffect, useState } from 'react';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask } = useTasks();
  const router = useRouter();

  const task = tasks.find(task => task.id === id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Prefill form once task is loaded
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Task not found.</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert('Validation Error', 'Title cannot be empty');
      return;
    }

    updateTask(task.id, { title, description });
    router.back(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  notFound: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
});
