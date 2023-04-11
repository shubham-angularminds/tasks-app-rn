import { NativeBaseProvider } from "native-base";
import TasksList from "./TaskList";

export default function App() {
  return (
    <NativeBaseProvider>
      <TasksList />
    </NativeBaseProvider>
  );
}
