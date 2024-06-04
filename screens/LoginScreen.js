/*import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserIdContext } from '../context/userContext';
import { validateEmail } from "../services/loginService";
import { checkPayment } from "../services/paypalService";
import { LoginAPI } from "../services/loginService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const { setUserId } = useContext(UserIdContext);
  const [emailError, setEmailError] = useState("");

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Favor de ingresar un email válido");
      return;
    } else {
      const decodedToken = await LoginAPI(email, password);

      if (decodedToken === undefined) {
        setModalSession(true);
        return;
      } else {
        if (decodedToken.PaymentStatus === "True") {
          const userId = decodedToken.userId;
          setUserId(userId);
          navigation.navigate("AppointmentScreen");
        } else {
          const paymentStatus = await checkPayment(decodedToken.userId);

          if (paymentStatus) {
            const userId = decodedToken.userId;
            setUserId(userId);
            navigation.navigate("AppointmentScreen");
          } else {
            Alert.alert(
              'Error de pago',
              'No ha realizado el pago para acceder a la aplicación',
              [
                {
                  text: 'Cerrar',
                  onPress: () => console.log('Cerrar presionado'),
                  style: 'cancel'
                },
                {
                  text: 'Pagar',
                  onPress: () => {
                    Linking.openURL(decodedToken.PaypalPaymentUrl);
                  }
                }
              ]
            );
          }
        }
      }
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (emailError) {
      setEmailError("");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'height' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Fast Booking</Text>
        <Text style={styles.label}>Correo</Text>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
          <Text style={styles.forgPassword}>Regístrate</Text>
        </TouchableOpacity>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>o</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>Iniciar sesión con Facebook</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgPassword: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#bc2c46',
    marginBottom: 10,
  }
});

export default LoginScreen;
*/

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const LoginScreen = () => {
  const navigation = useNavigation(); 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para iniciar sesión
    navigation.navigate('AppointmentScreen');
  };

  const handleRegister = () => {
    navigation.navigate('Registration'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fast Booking</Text>
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={handleRegister}>
  <Text style={styles.forgPassword}>Regístrate</Text>
  </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.facebookButton}>
        <Text style={styles.facebookButtonText}>Iniciar sesión con feisbuk</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 20,
  },
  forgPassword: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 20,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal:10,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;





















































































































































/*import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginAPI } from '../services/loginService';
import { checkPayment } from "../services/paypalService";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingrese un email válido.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const decodedToken = await LoginAPI(email, password);

      if (!decodedToken) {
        Alert.alert('Error', 'Error en el inicio de sesión. Por favor, verifique sus credenciales.');
        return;
      }

      if (decodedToken.PaymentStatus === "True") {
        navigation.navigate('AppointmentScreen');
      } else {
        const paymentStatus = await checkPayment(decodedToken.userId);

        if (paymentStatus) {
          navigation.navigate('AppointmentScreen');
        } else {
          Alert.alert(
            'Error de pago',
            'No ha realizado el pago para acceder a la aplicación',
            [
              {
                text: 'Cerrar',
                onPress: () => console.log('Cerrar presionado'),
                style: 'cancel'
              },
              {
                text: 'Pagar',
                onPress: () => {
                  Linking.openURL(decodedToken.PaypalPaymentUrl);
                }
              }
            ]
          );
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el inicio de sesión. Por favor, verifique sus credenciales.');
      console.error('Error en el login:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (text && !validateEmail(text)) {
              setEmailError("Favor de ingresar un email válido");
            } else {
              setEmailError("");
            }
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.forgotPassword}>¿No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  }
});

export default LoginScreen;
*/ 

// screens/LoginScreen.js