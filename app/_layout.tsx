import { TasksProvider } from "@/hooks/TaskContext";
import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <TasksProvider>
      {/** placeholder for the currently matched screen route */}
      <Slot />
    </TasksProvider>
  );
}
