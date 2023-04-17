import { View, Text } from "react-native";
import React from "react";
import TasksList from "./components/TaskList";

export default function UnCompleted() {
  return <TasksList status={false} />;
}
