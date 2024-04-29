import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AppointmentScreen = () => {
  const navigation = useNavigation();

  const appointments = [
    { id: 1, name: 'Julia Alvarez Parra', time: '14:00 - 15:00' },
    { id: 2, name: 'Pedro Pérez', time: '15:30 - 16:30' },
  ];

  const handleCancel = () => {
    navigation.goBack(); 
  };
  const handleCalendar = () => {
    navigation.navigate('Calendar'); 
  };
  const handleRequest = () => {
     navigation.navigate('Requests');
  };
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {appointments.map(appointment => (
          <TouchableOpacity
            key={appointment.id}
            style={styles.appointmentContainer}
            onPress={() => {/*Lógica para ver detalles de la cita */}}
          >
            <View style={styles.appointmentContent}>
              <View style={styles.avatar} />
              <View style={styles.appointmentInfo}>
                <Text style={styles.name}>{appointment.name}</Text>
                <Text style={styles.time}>{appointment.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="calendar" size={32} color="#fff" />
          <Text style={styles.iconText}>Citas Activas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleRequest}>
          <AntDesign name="form" size={32} color="#fff" />
          <Text style={styles.iconText}>Solicitud de Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity style= {styles.iconButton} onPress={handleCalendar}>
          <AntDesign name="calendar" size={32} color="#fff" />
          <Text style={styles.iconText}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="linechart" size={32} color="#fff" />
          <Text style={styles.iconText}>Métricas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="setting" size={32} color="#fff" />
          <Text style={styles.iconText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  appointmentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#1B4965',
    borderRadius: 25,
    marginRight: 10,
  },
  appointmentInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B4965',
  },
  time: {
    fontSize: 14,
    color: '#1B4965',
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#1B4965',
    justifyContent: 'space-between',
    paddingVertical: 8, // altura de la barra
    paddingHorizontal: 16, // espacio a los lados de la barra
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    color: '#fff',
    fontSize: 10,
    marginTop: 5,
  },
});

export default AppointmentScreen;
