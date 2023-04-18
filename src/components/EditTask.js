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
import { updateTask } from "../actions";

const EditTask = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { task } = route.params;


  const [formData, setData] = React.useState(task);
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
                "Task is Updated Succesfully"
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      const task = {
        ...formData,
      };
      dispatch(updateTask(task));
      setSuccess(true);
    }
  };

  return (
    <Center flex={1} px="2">
      <Box w="100%" maxWidth="300px">
        <FormControl isRequired>
          <Stack mx="4">
            <FormControl.Label>Edit Title</FormControl.Label>
            <Input
              placeholder="Title"
              defaultValue={task.title}
              onChangeText={(value) => setData({ ...formData, title: value })}
              isRequired
              isInvalid={!!errors.title}
            />
            {errors.title && <WarningOutlineIcon color="red.500" size={4} />}
            {errors.title && (
              <FormControl.ErrorMessage>{errors.title}</FormControl.ErrorMessage>
            )}
          </Stack>
          <Stack mx="4" my="4">
            <FormControl.Label>Edit Description</FormControl.Label>
            <Input
              defaultValue={task.description}
              placeholder="Description"
              onChangeText={(value) =>
                setData({ ...formData, description: value })
              }
              isInvalid={!!errors.description}
            />
            {errors.description && <WarningOutlineIcon color="red.500" size={4} />}
            {errors.description && (
              <FormControl.ErrorMessage>{errors.description}</FormControl.ErrorMessage>
            )}
          </Stack>
          <Stack mx="4" my="4">
            <Btn title="Edit Date" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              date={new Date(task.date)}
            />

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

export default EditTask;

const styles = StyleSheet.create({});
