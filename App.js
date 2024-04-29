import { NavigationContainer } from '@react-navigation/native';
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

export default App;