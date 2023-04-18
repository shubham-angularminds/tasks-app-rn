import { View, Text } from "react-native";
import React from "react";
import TasksList from "./components/TskListNew";
import { useDispatch, useSelector } from "react-redux";


export default function UnCompleted() {
  const tasks = useSelector((state) => state.tasks);
  const filteredTasks = tasks.filter((t) => t.completed === false);

  return <TasksList status='Todo' taskList={filteredTasks}/>;
}
