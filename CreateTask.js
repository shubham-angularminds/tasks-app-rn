import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  VStack,
  Button,
  FormControl,
  Input,
  NativeBaseProvider,
  Center,
  Select,
  CheckIcon,
} from "native-base";
import { useState } from "react";
import { Button as Btn } from "react-native";

function BuildingAFormExample() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [service, setService] = React.useState("");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
    validate() ? console.log(formData) : console.log("Validation Failed");
  };

  return (
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired isInvalid={"name" in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Title
        </FormControl.Label>
        <Input
          placeholder="John"
          onChangeText={(value) => setData({ ...formData, title: value })}
        />
        {"title" in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Title should contain atleast 3 character.
          </FormControl.HelperText>
        )}
      </FormControl>
      <FormControl isRequired isInvalid={"description" in errors}>
        <FormControl.Label
          _text={{
            bold: true,
          }}
        >
          Description
        </FormControl.Label>
        <Input
          placeholder="Description"
          onChangeText={(value) => setData({ ...formData, description: value })}
        />
        {"description" in errors ? (
          <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
        ) : (
          <FormControl.HelperText>
            Description should contain atleast 3 character.
          </FormControl.HelperText>
        )}
      </FormControl>
{/* 
      <Btn onPress={showDatepicker} title="Show date picker!" mt="5" colorScheme="cyan"/>
      <Btn onPress={showTimepicker} title="Show time picker!" mt="5" colorScheme="cyan"/>
      <Text>selected: {date.toLocaleString()}</Text> */}

      <Btn onPress={showDatepicker} title="Show date picker!" />
      <Btn onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* <Select
        selectedValue={service}
        minWidth="200"
        accessibilityLabel="Choose Status"
        placeholder="Choose Status"
        _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        <Select.Item label="Started" value="Started" />
        <Select.Item label="Pending" value="Pending" />
        <Select.Item label="Completed" value="Completed" />
      </Select> */}

      <Button onPress={onSubmit} mt="5" colorScheme="cyan">
        Submit
      </Button>
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
