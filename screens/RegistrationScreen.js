import React, { useState } from 'react';
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
import { RegisterAPI } from '../services/loginService'; // Asumimos que validateEmail está aquí.

const RegistrationScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profession, setProfession] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [professionError, setProfessionError] = useState('');

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validateInputs = () => {
    console.log('Validating inputs...');
    let errors = [];

    if (!fullName) errors.push("Nombre Completo");
    if (!email) errors.push("Correo");
    if (!password) errors.push("Contraseña");
    if (!profession) errors.push("Profesión");
    if (!phoneNumber) errors.push("Número de teléfono");
    if (!address) errors.push("Dirección");
    if (email && !validateEmail(email)) errors.push("Correo electrónico no válido");

    if (errors.length > 0) {
      let errorMessage = `Los siguientes campos son obligatorios: ${errors.join(", ")}`;
      Alert.alert("Error", errorMessage);
      console.log('Validation failed:', errorMessage);
      return false;
    }

    console.log('Validation passed');
    return true;
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (text && !validateEmail(text)) {
      setEmailError("Favor de ingresar un email válido");
    } else {
      setEmailError("");
    }
  };

  const handleTextInputChange = (text, setter, errorSetter) => {
    const sanitizedText = text.replace(/[^a-zA-Z0-9\s]/g, "");
    if (text !== sanitizedText) {
      errorSetter("No se permiten caracteres especiales");
    } else {
      errorSetter("");
    }
    setter(sanitizedText);
  };

  const handleRegister = async () => {
    console.log('Handle register clicked');
    if (!validateInputs()) {
      return;
    }

    try {
      console.log('Calling RegisterAPI...');
      const response = await RegisterAPI(fullName, email, password, phoneNumber, address, profession);
      console.log('API response:', response);

      if (response.ok) {
        Alert.alert("Registro exitoso", "Te has registrado correctamente.");
        navigation.navigate('Login');
      } else if (response.status === 400) {
        setEmailError("El correo electrónico ya está registrado");
      } else {
        console.error('Error en el registro:', response.status);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Fast Booking</Text>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={fullName}
          onChangeText={(text) => handleTextInputChange(text, setFullName, setFullNameError)}
        />
        {fullNameError ? <Text style={styles.errorText}>{fullNameError}</Text> : null}
        
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          value={email}
          onChangeText={handleEmailChange}
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

        <Text style={styles.label}>Número de teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu número"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu Dirección"
          value={address}
          onChangeText={(text) => handleTextInputChange(text, setAddress, setAddressError)}
        />
        {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}

        <Text style={styles.label}>Profesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu profesión"
          value={profession}
          onChangeText={(text) => handleTextInputChange(text, setProfession, setProfessionError)}
        />
        {professionError ? <Text style={styles.errorText}>{professionError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgotPassword}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>o</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>Registrarse con Facebook</Text>
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
    marginBottom: 10,
  },
  facebookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  }
});

export default RegistrationScreen;