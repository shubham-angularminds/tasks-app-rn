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
  Avatar,
} from "native-base";
import { useEffect, useState } from "react";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { Button, View, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, toggleTaskStatus } from "../actions";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

const formatDate = (date) => {
  return moment(date).format("DD MMMM yyyy");
};

function RenderTaskList({ taskList, status }) {
  const [mode, setMode] = useState("Basic");

  return (
    <Center h="full">
      <Box
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        flex="1"
        safeAreaTop
        maxW="400px"
        w="100%"
      >
        <Heading p="4" pb="3" size="lg">
          {status === "all" ? "Tasks List" : status + " Tasks"}
        </Heading>
        <CardList taskList={taskList} status={status} />
      </Box>
    </Center>
  );
}

function CardList({ taskList, status }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddTask = () => {
    navigation.navigate("CreateTask", { name: "Shubham" });
  };

  const handleCheckToggle = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const onRemove = (id) => {
    dispatch(deleteTask(id));
  };

  const renderItem = ({ item, index }) => (
    <Box
      key={index}
      direction="row"
      rounded="2"
      bg="coolGray.100"
      p="5"
      flex="1"
      w="full"
    >
      <Pressable
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
        aria-label="Toggle task status"
        rounded="10"
        p="2"
      >
        <Box pl="2" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            <VStack w="50%">
              <Badge
                colorScheme="blue"
                _text={{
                  color: "white",
                }}
                variant="solid"
                rounded="2"
                aria-label="Task status"
                w="70%"
              >
                {item.completed ? "Completed" : "Uncompleted"}
              </Badge>
              {item.completed ? (
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                  strikeThrough
                  aria-label={`Task title: ${item.title}`}
                >
                  {item.title}
                </Text>
              ) : (
                <Text
                  color="coolGray.800"
                  mt="3"
                  fontWeight="medium"
                  fontSize="xl"
                  aria-label={`Task title: ${item.title}`}
                >
                  {item.title}
                </Text>
              )}

              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                aria-label="Task description"
              >
                {item.description}
              </Text>
              <Text
                fontSize="xs"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                alignSelf="flex-start"
                aria-label="Task date"
              >
                Due By {formatDate(item.date)}
              </Text>
            </VStack>
            <Spacer />
            <Checkbox
              defaultIsChecked={item.completed}
              _checked={item.completed}
              onChange={() => handleCheckToggle(item.id)}
              aria-label={
                item.completed ? "Task is completed" : "Task is uncompleted"
              }
            ></Checkbox>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HStack flex="1" pl="2">
        <Pressable
          w="70"
          ml="auto"
          cursor="pointer"
          bg="coolGray.200"
          my="10"
          justifyContent="center"
          _pressed={{
            opacity: 0.5,
          }}
          onPress={() => {
            navigation.navigate("EditTask", { task: data.item });            
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon
              as={<MaterialIcons name="edit" />}
              size="xs"
              color="coolGray.800"
            />
            <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
              Edit
            </Text>
          </VStack>
        </Pressable>
        <Pressable
          w="70"
          cursor="pointer"
          bg="red.500"
          p="0"
          my="10"
          justifyContent="center"
          onPress={() => onRemove(data.item.id)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <VStack alignItems="center" space={2}>
            <Icon
              as={<MaterialIcons name="delete" />}
              color="white"
              size="xs"
            />
            <Text color="white" fontSize="xs" fontWeight="medium">
              Delete
            </Text>
          </VStack>
        </Pressable>
      </HStack>
    );
  };

  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={taskList}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        // onRowDidOpen={onRowDidOpen}
      />
      <Fab
        renderInPortal={true}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
        onPress={handleAddTask}
        bg="blue.700"
        mb="10"
      />
    </Box>
  );
}

const TasksListNew = ({ taskList, status }) => {
  return <RenderTaskList taskList={taskList} status={status} />;
};

export default TasksListNew;
