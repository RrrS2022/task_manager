import { useTasks } from '@/hooks/TaskContext';
import { View, TextInput, StyleSheet } from 'react-native';


export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useTasks();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
