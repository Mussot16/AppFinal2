/*import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import CalendarScreen from './screens/CalendarScreen';
import Requests from './screens/Requests';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} /> 
        <Stack.Screen name= "Requests" component={Requests}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/
// App.js
// App.js
// App.jsimport React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";

import * as Font from "expo-font";

import LoginScreen from "./screens/LoginScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import RegisterScreen from "./screens/RegistrationScreen";
import CalendarScreen from "./screens/CalendarScreen";
import Requests from "./screens/Requests";
import Settings from "./screens/Settings";
import MetricsScreen from "./screens/MetricsScreen";

import AppointmentsProvider from "./context/AppointmentsContext";
const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Plus Jakarta Sans-Bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
      "Plus Jakarta Sans": require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
      "Plus Jakarta Sans-Light": require("./assets/fonts/PlusJakartaSans-Light.ttf"),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppointmentsProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
          <Stack.Screen name="Requests" component={Requests} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="MetricsScreen" component={MetricsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </AppointmentsProvider>
  );
};

export default App;