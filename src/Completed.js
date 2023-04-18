import { View, Text } from "react-native";
import React from "react";
import TasksList from "./components/TskListNew";
import { useDispatch, useSelector } from "react-redux";

export default function Completed() {
  const tasks = useSelector((state) => state.tasks);
  const filteredTasks = tasks.filter((t) => t.completed === true);

  return <TasksList status='Completed' taskList={filteredTasks}/>;
}
