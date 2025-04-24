import { View, Pressable, Text, StyleSheet } from 'react-native';

interface TaskFilterProps {
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export default function TaskFilter({ setFilter }: TaskFilterProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => setFilter('all')}>
        <Text style={styles.buttonText}>All</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setFilter('active')}>
        <Text style={styles.buttonText}>Active</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setFilter('completed')}>
        <Text style={styles.buttonText}>Completed</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: '600',
  },
});
