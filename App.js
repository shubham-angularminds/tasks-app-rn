import { NativeBaseProvider } from "native-base";
// import useDatabase from './useDatabase'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksList from "./TaskList";
import CreateTask from "./CreateTask";

const Stack = createNativeStackNavigator();

export default function App() {
  // const isDBLoadingComplete = useDatabase();

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TasksList}
          />
          <Stack.Screen name="CreateTask" component={CreateTask} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
