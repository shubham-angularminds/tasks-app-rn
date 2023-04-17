import { View, Text } from "react-native";
import React from "react";
import TasksList from "./components/TaskList";
import { useDispatch, useSelector } from "react-redux";

export default function Completed() {
  return <TasksList status={true} />;
}
