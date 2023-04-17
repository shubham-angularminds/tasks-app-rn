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

function Example() {
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
          New Task List
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Basic />
        </ScrollView>
      </Box>
    </Center>
  );
}

function Basic() {
  const tasks = useSelector((state) => state.tasks);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const [listData, setListData] = useState(tasks);

  useEffect(() => {
    console.log("Tasks have been updated", tasks);
    setListData(tasks);
  }, [tasks]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const handleCheckToggle = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const onRemove = (id) => {
    dispatch(deleteTask(id));
  };


  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        onPress={() => console.log("You touched me")}
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "white",
        }}
      >
        <Box pl="4" pr="5" py="2">
          <HStack alignItems="center" space={3}>
            {/* <Avatar
              size="48px"
              source={{
                uri: item.avatarUrl,
              }}
            /> */}
            <VStack w="55%">
              <Text
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
                bold
              >
                {item.title}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
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
              >
                {formatDate(item.date)}
              </Text>
            </VStack>
            <Spacer />
            <Checkbox
              defaultIsChecked={item.completed}
              onChange={() => handleCheckToggle(item.id)}
            >
            </Checkbox>
          </HStack>
        </Box>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => {
    console.log('data : ', data);
    return (
  <HStack flex="1" pl="2">
  <Pressable w="70" ml="auto" cursor="pointer" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
  opacity: 0.5
}}>
    <VStack alignItems="center" space={2}>
      <Icon as={<MaterialIcons name="edit" />} size="xs" color="coolGray.800" />
      <Text fontSize="xs" fontWeight="medium" color="coolGray.800"
       onPress={() => {
        navigation.navigate("EditTask", { task: data.item });
      }}
      >
        Edit
      </Text>
    </VStack>
  </Pressable>
  <Pressable w="70" cursor="pointer" bg="red.500" justifyContent="center" onPress={() => onRemove(data.id)} _pressed={{
  opacity: 0.5
}}>
    <VStack alignItems="center" space={2}>
      <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
      <Text color="white" fontSize="xs" fontWeight="medium"
        onPress={() => {
            onRemove(data.item.id)  
        }}
      >
        Delete
      </Text>
    </VStack>
  </Pressable>
</HStack>
 )};


  return (
    <Box bg="white" safeArea flex="1">
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-130}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </Box>
  );
}

const TasksList = ({ status }) => {
  // const tasks = useSelector((state) => state.tasks);
  // console.log("status : ", status);

  // const filteredTasks =
  //   status != undefined ? tasks.filter((t) => t.completed === status) : tasks;

  // const dispatch = useDispatch();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   console.log("Tasks have been updated", tasks);
  // }, [tasks]);

  // const handleAddTask = () => {
  //   console.log("Add Task Button Clicked");
  //   navigation.navigate("CreateTask", { name: "Shubham" });
  // };

  // const onRemove = (id) => {
  //   dispatch(deleteTask(id));
  // };

  // const handleCheckToggle = (id) => {
  //   dispatch(toggleTaskStatus(id));
  // };

  return (
    <Example />

    //   <ScrollView w="full" showsVerticalScrollIndicator={false}>
    //     <Center mb="8" py="4" bg="blue.700" color="white">
    //       <Heading fontSize="xl" color="white" mb="4" mt="10">
    //         {status == undefined
    //           ? "All Tasks"
    //           : status
    //             ? "Completed"
    //             : "Uncompleted"}
    //       </Heading>
    //     </Center>

    //     <VStack space={4} alignItems="center" px="3">
    //       {filteredTasks?.map((data, index) => (

    //         <Flex
    //           key={index}
    //           alignItems="center"
    //           mb="2"
    //           direction="row"
    //           rounded="8"
    //           overflow="hidden"
    //           borderWidth="1"
    //           borderColor="coolGray.300"
    //           shadow="3"
    //           bg="coolGray.100"
    //           p="5"
    //           flex="1"
    //           w="full"
    //         >

    //           <Box flexBasis="0" flexGrow="1">
    //             <HStack alignItems="center">
    //               <Badge
    //                 colorScheme="blue"
    //                 _text={{
    //                   color: "white",
    //                 }}
    //                 variant="solid"
    //                 rounded="2"
    //               >
    //                 {data.completed ? "Completed" : "Uncompleted"}
    //               </Badge>
    //               <Spacer />
    //               <Text fontSize={10} color="coolGray.800">
    //                 Due by {formatDate(data.date)}
    //               </Text>
    //               <Spacer />
    //               <Menu
    //                 w="190"
    //                 trigger={(triggerProps) => {
    //                   return (
    //                     <Pressable
    //                       accessibilityLabel="More options menu"
    //                       {...triggerProps}
    //                     >
    //                       <HamburgerIcon />
    //                     </Pressable>
    //                   );
    //                 }}
    //               >
    //                 <Menu.Item>
    //                   <Button
    //                     title="Edit"
    //                     onPress={() => {
    //                       navigation.navigate("EditTask", { task: data });
    //                     }}
    //                   />
    //                 </Menu.Item>
    //                 <Menu.Item>
    //                   <Button title="Delete" onPress={() => onRemove(data.id)} />
    //                 </Menu.Item>
    //               </Menu>
    //             </HStack>
    //             {data.completed ? (
    //               <Text
    //                 color="coolGray.800"
    //                 mt="3"
    //                 fontWeight="medium"
    //                 fontSize="xl"
    //                 strikeThrough
    //               >
    //                 {data.title}
    //               </Text>
    //             ) : (
    //               <Text
    //                 color="coolGray.800"
    //                 mt="3"
    //                 fontWeight="medium"
    //                 fontSize="xl"
    //               >
    //                 {data.title}
    //               </Text>
    //             )}

    //             <HStack alignItems="center">
    //               <Text mt="2" fontSize="sm" color="coolGray.700">
    //                 {data.description}
    //               </Text>
    //               <Spacer />

    //               <Checkbox
    //                 defaultIsChecked={data.completed}
    //                 onChange={() => handleCheckToggle(data.id)}
    //               >
    //                 Done
    //               </Checkbox>
    //             </HStack>
    //           </Box>
    //         </Flex>

    //       ))}
    //     </VStack>
    //     <Fab
    //       renderInPortal={true}
    //       shadow={2}
    //       size="sm"
    //       icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
    //       onPress={handleAddTask}
    //       bg="blue.700"
    //     />
    //   </ScrollView >
  );
};

export default TasksList;
