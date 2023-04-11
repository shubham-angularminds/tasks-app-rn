import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, VStack, Center, useTheme, Heading, NativeBaseProvider } from "native-base";
import TasksList from "./TaskList"

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <TasksList />
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
