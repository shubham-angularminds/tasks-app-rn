import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksList from "./src/components/TaskList";
import CreateTask from "./src/components/CreateTask";
import EditTask from "./src/components/EditTask";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import * as React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Completed from "./src/Completed";
import UnCompleted from "./src/UnCompleted";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="All Tasks" component={TasksList} />
      <Tab.Screen name="Completed" component={Completed} />
      <Tab.Screen name="UnCompleted" component={UnCompleted} />
    </Tab.Navigator>
  );
}

export default function App() {
  // const isDBLoadingComplete = useDatabase();
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={MainTabNavigator} />
              <Stack.Screen name="Home" component={TasksList} />
              <Stack.Screen
                name="CreateTask"
                component={CreateTask}
                options={{ headerShown: true }}
              />
                <Stack.Screen
                name="EditTask"
                component={EditTask}
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
