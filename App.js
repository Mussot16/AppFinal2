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
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserIdProvider } from './context/userContext';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import CalendarScreen from './screens/CalendarScreen';
import Requests from './screens/Requests';
import MetricsScreen from './screens/MetricsScreen';
import SettingsView from './screens/Settings';
const Stack = createStackNavigator();

const App = () => {
  return (
    <UserIdProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} /> 
          <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} /> 
          <Stack.Screen name="Requests" component={Requests}/>
          <Stack.Screen name="linechart" component={MetricsScreen} />
          <Stack.Screen name="setting" component={SettingsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserIdProvider>
  );
};

export default App;
