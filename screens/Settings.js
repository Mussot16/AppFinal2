// Settings.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardConfig } from "../themes";
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingsView() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");

  const [user, setUser] = useState({
    id: 1,
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    address: "Cortez 123, Ensenada, Baja California",
    profession: "Dentista",
  });

  const saveChanges = () => {
    // Actualizar el estado del usuario con los nuevos valores
    setUser({
      ...user,
      name: name,
      email: email,
      address: address,
      profession: profession,
    });

    // Generar el JSON para el usuario actualizado
    const updatedUserJson = JSON.stringify({
      id: user.id,
      name: name,
      email: email,
      address: address,
      profession: profession,
    });

    // Aquí puedes hacer la petición a la API con el JSON del usuario actualizado
    // ...

    setModalVisible(!modalVisible);
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={CardConfig.container}>
      <View style={CardConfig.userContainer}>
        <Text style={CardConfig.title}>Datos del usuario</Text>
        <Text style={CardConfig.userInformation}>Nombre: {user.name}</Text>
        <Text style={CardConfig.userInformation}>Correo: {user.email}</Text>
        <Text style={CardConfig.userInformation}>
          Domicilio: {user.address}
        </Text>
        <Text style={CardConfig.userInformation}>
          Profesión: {user.profession}
        </Text>
        <View style={{ justifyContent: "flex-end" }}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Modificar información</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Icon name="close" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Modificar información</Text>
            <Text style={styles.modalLabel}>Nombre:</Text>
            <TextInput
              style={styles.input}
              editable={true}
              placeholder="Nombre"
              onChangeText={setName}
              value={name}
            />
            <Text style={styles.modalLabel}>Correo electrónico:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
            <Text style={styles.modalLabel}>Domicilio:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
            />
            <Text style={styles.modalLabel}>Profesión:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setProfession}
              value={profession}
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalLabel: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
});

export default SettingsView;