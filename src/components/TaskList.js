import {
  ScrollView,
  VStack,
  Center,
  Heading,
  Box,
  HStack,
  Badge,
  Spacer,
  Text,
  Pressable,
  Flex,
  ThreeDotsIcon,
  Fab,
  Icon,
  HamburgerIcon,
  Menu,
  Checkbox,
} from "native-base";
import { useEffect } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { Button, View, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, toggleTaskStatus } from "../actions";


const formatDate = (date) => {
  return moment(date).format("DD MMMM yyyy");
};

const TasksList = ({ status }) => {
  const tasks = useSelector((state) => state.tasks);
  console.log("status : ", status);

  const filteredTasks =
    status != undefined ? tasks.filter((t) => t.completed === status) : tasks;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Tasks have been updated", tasks);
  }, [tasks]);

  const handleAddTask = () => {
    console.log("Add Task Button Clicked");
    navigation.navigate("CreateTask", { name: "Shubham" });
  };

  const onRemove = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCheckToggle = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  return (
    <ScrollView w="full" showsVerticalScrollIndicator={false}>
      <Center mb="8" py="4" bg="blue.700" color="white">
        <Heading fontSize="xl" color="white" mb="4" mt="10">
          {status == undefined
            ? "All Tasks"
            : status
              ? "Completed"
              : "Uncompleted"}
        </Heading>
      </Center>

      <VStack space={4} alignItems="center" px="3">
        {filteredTasks?.map((data, index) => (

          <Flex
            key={index}
            alignItems="center"
            mb="2"
            direction="row"
            rounded="8"
            overflow="hidden"
            borderWidth="1"
            borderColor="coolGray.300"
            shadow="3"
            bg="coolGray.100"
            p="5"
            flex="1"
            w="full"
          >


            <Box flexBasis="0" flexGrow="1">
              <HStack alignItems="center">
                <Badge
                  colorScheme="blue"
                  _text={{
                    color: "white",
                  }}
                  variant="solid"
                  rounded="2"
                >
                  {data.completed ? "Completed" : "Uncompleted"}
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  Due by {formatDate(data.date)}
                </Text>
                <Spacer />
                <Menu
                  w="190"
                  trigger={(triggerProps) => {
                    return (
                      <Pressable
                        accessibilityLabel="More options menu"
                        {...triggerProps}
                      >
                        <HamburgerIcon />
                      </Pressable>
                    );
                  }}
                >
                  <Menu.Item>
                    <Button
                      title="Edit"
                      onPress={() => {
                        navigation.navigate("EditTask", { task: data });
                      }}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <Button title="Delete" onPress={() => onRemove(data.id)} />
                  </Menu.Item>
                </Menu>
              </HStack>
              {data.completed ? (
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                  strikeThrough
                >
                  {data.title}
                </Text>
              ) : (
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                >
                  {data.title}
                </Text>
              )}

              <HStack alignItems="center">
                <Text mt="2" fontSize="sm" color="coolGray.700">
                  {data.description}
                </Text>
                <Spacer />

                <Checkbox
                  defaultIsChecked={data.completed}
                  onChange={() => handleCheckToggle(data.id)}
                >
                  Done
                </Checkbox>
              </HStack>
            </Box>
          </Flex>

        ))}
      </VStack>
      <Fab
        renderInPortal={true}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        onPress={handleAddTask}
        bg="blue.700"
      />
    </ScrollView >
  );
};

export default TasksList;
