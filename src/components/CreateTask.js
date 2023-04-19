import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  VStack,
  Button,
  FormControl,
  Input,
  Center,
  Stack,
  Box,
  WarningOutlineIcon,
  Alert,
  HStack,
  IconButton,
  CloseIcon,
} from "native-base";
import { useState } from "react";
import { Button as Btn } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addTask, deleteTask } from "../actions";
import uuid from "react-native-uuid";

const CreateTask = ({ navigation }) => {
  const dispatch = useDispatch();

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [success, setSuccess] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  function showAlert() {
    return (
      <Alert w="100%" status="success">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                "Task is Created Succesfully"
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" />}
              _icon={{
                color: "coolGray.600",
              }}
            />
          </HStack>
        </VStack>
      </Alert>
    );
  }

  const handleConfirm = (date) => {
    setData({ ...formData, date: date });
    hideDatePicker();
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = "Title is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      const task = {
        id: uuid.v4(),
        completed: false,
        ...formData,
      };
      dispatch(addTask(task));
      setSuccess(true);
    }
  };

  return (
    <Center flex={1} px="2">
      <Box w="100%" maxWidth="300px" rounded="10" bg="white" pt="10" pb="10">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Title</FormControl.Label>
            <Input
              placeholder="Title"
              onChangeText={(value) => setData({ ...formData, title: value })}
              isRequired
              isInvalid={!!errors.title}
            />
            {errors.title && <WarningOutlineIcon color="red.500" size={4} />}
            {errors.title && (
              <FormControl.ErrorMessage>
                {errors.title}
              </FormControl.ErrorMessage>
            )}
          </Stack>
          <Stack mx="4" my="4">
            <FormControl.Label>Description</FormControl.Label>
            <Input
              placeholder="Description"
              onChangeText={(value) =>
                setData({ ...formData, description: value })
              }
              isRequired
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <WarningOutlineIcon color="red.500" size={4} />
            )}
            {errors.description && (
              <FormControl.ErrorMessage>
                {errors.description}
              </FormControl.ErrorMessage>
            )}
          </Stack>
          <Stack mx="4" my="4">
            <Btn title="Due Date" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            {errors.date && <WarningOutlineIcon color="red.500" size={4} />}
            {errors.date && (
              <FormControl.ErrorMessage>{errors.date}</FormControl.ErrorMessage>
            )}

            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
              Submit
            </Button>
          </Stack>
        </FormControl>
        {success && showAlert()}
      </Box>
    </Center>
  );
};

export default CreateTask;

const styles = StyleSheet.create({});
