import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { LoginAPI, validateEmail } from '../services/loginService'; // función de login y validación de email

const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setEmailError("Favor de ingresar un email válido");
      return;
    } else {
      setEmailError(""); // Limpia el error de email si la validación pasa
    }
    try {
      const decodedToken = await LoginAPI(email, password);
      if (decodedToken) {
        // Maneja el token decodificado, guarda en el estado global o almacenamiento seguro
        navigation.navigate('AppointmentScreen');
      } else {
        Alert.alert('Error', 'Error en el inicio de sesión. Verifique sus credenciales.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el inicio de sesión. Verifique sus credenciales.');
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Registration'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fast Booking</Text>
      <Text style={styles.label}>Correo</Text>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo"
        value={email}
        onChangeText={(text) => setEmail(text)}
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
        <Text style={styles.facebookButtonText}>Iniciar sesión con Facebook</Text>
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
