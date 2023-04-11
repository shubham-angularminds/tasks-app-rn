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
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import Tasks from "./TaskData";

const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-IN", options).format(date);
};

const TasksList = () => {
  const handleClick = () => {
    console.log("I am Pressed");
  };

  const handleAddTask = () => {
    console.log("Add Task Button Clicked");
  };

  return (
    <ScrollView w="full" showsVerticalScrollIndicator={false}>
      <Center mt="10" mb="8" py="4" bg="blue.700" color="white">
        <Heading fontSize="xl" color="white">
          Tasks List
        </Heading>
      </Center>
      <VStack space={4} alignItems="center" px="3">
        {Tasks.map((data, index) => (
          <Flex
            key={data.id}
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
                  {data.status}
                </Badge>
                <Spacer />
                <Text fontSize={10} color="coolGray.800">
                  {formatDate(data.dueDate)}
                </Text>
                <Spacer />
                <Pressable onPress={handleClick}>
                  <ThreeDotsIcon />
                </Pressable>
              </HStack>
              <Text
                color="coolGray.800"
                mt="3"
                fontWeight="medium"
                fontSize="xl"
              >
                {data.title}
              </Text>
              <Text mt="2" fontSize="sm" color="coolGray.700">
                {data.description}
              </Text>
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
    </ScrollView>
  );
};

export default TasksList;
