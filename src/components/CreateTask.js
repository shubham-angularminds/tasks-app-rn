import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  VStack,
  Button,
  FormControl,
  Input,
  Stack,
  NativeBaseProvider,
  Center,
  Select,
  CheckIcon,
  Box,
} from "native-base";
import { useState } from "react";
import { Button as Btn } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BuildingAFormExample() {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [service, setService] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tasksData, setTasksData] = React.useState([]);

  const clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };

  const storeData = async (value) => {
    try {
      let existingTransactions = await getData();
      const updatedTransactions = [...existingTransactions, value];
      console.log("updated transactins : ", updatedTransactions);

      await AsyncStorage.setItem(
        "taskData",
        JSON.stringify(updatedTransactions)
      );

      // let currentValue = await getData().then((data) => data) || [];
      // console.log("current value ", currentValue);
      // totalValue = [...currentValue, value];
      // const jsonValue = JSON.stringify(totalValue);
      // await AsyncStorage.setItem("taskData", jsonValue);
    } catch (err) {
      // saving error
      console.log(err);
    }
  };

  const getData = async () => {
    let transactions = await AsyncStorage.getItem("taskData");
    if (transactions) {
      return JSON.parse(transactions);
    } else {
      return [];
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    console.log("form Data: ", formData);
    storeData(formData);
    // validate() ? console.log(formData) : console.log("Validation Failed");
  };

  const handleTitleInputChange = (value) => {
    setFormData({ ...formData, title: value });
  };

  const handleDescriptionInputChange = (value) => {
    setFormData({ ...formData, description: value });
  };

  const handleConfirm = (date) => {
    setFormData({ ...formData, dueDate: date });
    hideDatePicker();
  };

  return (
    <VStack width="100%">
      <FormControl>
        <FormControl.Label>Title</FormControl.Label>
        <Input
          variant="underlined"
          p={2}
          placeholder="Title"
          onChangeText={handleTitleInputChange}
        />
        <FormControl.Label>Description</FormControl.Label>
        <Input
          variant="underlined"
          p={2}
          placeholder="Description"
          onChangeText={handleDescriptionInputChange}
        />

        <Button onPress={showDatePicker} colorScheme="cyan">
          Select Date
        </Button>
        <Box mt="5">
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </Box>

        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button>
      </FormControl>
    </VStack>
  );
}

function Example() {
  return (
    <Center flex={1}>
      <BuildingAFormExample />
    </Center>
  );
}

const CreateTask = ({ navigation }) => {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  return (
    <Center flex={1} px="3">
      <Example />
    </Center>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
