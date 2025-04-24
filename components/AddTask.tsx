import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

// defines the expected props for AddTask component
interface AddTaskProps {
  addTask: (title: string, description: string) => void;
}

export default function AddTask({ addTask }: AddTaskProps) {
  // manage the values typed into text inputs for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // prevent adding empty tasks
    if (title.trim() === "") return;
    // call the function passed in as a prop and update the global task list
    addTask(title, description);
    // clears the inputs after successful suubmission
    setTitle("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle} // update the local state as the user types
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
