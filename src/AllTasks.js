import { View, Text } from "react-native";
import React from "react";
import TasksList from "./components/TskListNew";
import { useDispatch, useSelector } from "react-redux";

export default function AllTasks() {
    const tasks = useSelector((state) => state.tasks);

    return <TasksList status='all' taskList={tasks} />;
}
