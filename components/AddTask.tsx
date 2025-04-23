import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface AddTaskProps {
  addTask: (title: string, description: string) => void;
}

export default function AddTask({ addTask }: AddTaskProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") return;
    addTask(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Task description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.descriptionInput]}
        multiline
        numberOfLines={3}
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top", // ensures multiline input starts at top on Android
  },
});
