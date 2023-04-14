import { NativeBaseProvider } from "native-base";
// import useDatabase from './useDatabase'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksList from "./src/components/TaskList";
import CreateTask from "./src/components/CreateTask";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './src/store';


const Stack = createNativeStackNavigator();

export default function App() {
  // const isDBLoadingComplete = useDatabase();

  return (
    <Provider store={store}>
      <PersistGate>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={TasksList} />
              <Stack.Screen name="CreateTask" component={CreateTask} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
