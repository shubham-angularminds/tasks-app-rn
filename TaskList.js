import {
  ScrollView,
  VStack,
  Center,
  useTheme,
  Heading,
  NativeBaseProvider,
  Container,
  Box,
  HStack,
  Badge,
  Spacer,
  Text,
  Pressable,
  Flex,
} from "native-base";

const tasks = [
  {
    id: 1,
    title: "Task Name 1",
    description: "This is Description 1 ",
    status: "Started",
  },
  {
    id: 2,
    title: "Task Name 2",
    description: "This is Description 2",
    status: "Completed",
  },
  {
    id: 3,
    title: "Task Name 3",
    description: "This is Description 3",
    status: "Started",
  },
  {
    id: 4,
    title: "Task Name 4",
    description: "This is Description 4",
    status: "pending",
  },
  {
    id: 5,
    title: "Task Name 5",
    description: "This is Description 5",
    status: "started",
  },
  {
    id: 6,
    title: "Task Name 6",
    description: "This is Description 6",
    status: "completed",
  },
];

const TasksList = () => {
  return (
    <ScrollView w={["400", "300"]} h="80">
      <Center mt="20" mb="8" py="4" bg="blue.600" color="white">
        <Heading fontSize="xl">Tasks List</Heading>
      </Center>
      <VStack space={1} alignItems="center">
        {tasks.map((data, index) => (
          <Box alignItems="center" mb="5" width="100%">
            <Pressable
              onPress={() => console.log("I'm Pressed")}
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              shadow="3"
              bg="coolGray.100"
              p="5"
            >
              <Box width="100%" maxW="600">
                <HStack alignItems="center">
                  <Badge
                    colorScheme="darkBlue"
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
                    1 month ago
                  </Text>
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
                <Flex>
                  <Text
                    mt="2"
                    fontSize={12}
                    fontWeight="medium"
                    color="darkBlue.600"
                  >
                    Read More
                  </Text>
                </Flex>
              </Box>
            </Pressable>
          </Box>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default TasksList;

{
  /* <Center mt="20" mb="4" py="4" bg="cyan.600" color="amber.400">
          <Heading fontSize="xl">Task List</Heading>
        </Center>
        <VStack flex="1">
          {tasks.map((data, index) => (
            <Center py="4" mt="2" key={data.id} bg="cyan.200">
              {data.title}
              {data.description}
              {data.status}
            </Center>
          ))}
        </VStack> */
}
