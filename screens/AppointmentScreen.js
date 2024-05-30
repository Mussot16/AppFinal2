import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const appointments = [
    { id: 1, name: 'Julia Alvarez Parra', time: '14:00 - 15:00' },
    { id: 2, name: 'Pedro Pérez', time: '15:30 - 16:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    { id: 3, name: 'Pedro Pérez', time: '16:30 - 17:30' },
    // Añade más citas según sea necesario
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
  const handleModify = (appointment) => {
    // Lógica para modificar la cita
    setSelectedAppointment(null); // Cerrar el detalle después de la modificación
  };
  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
  };
  const handleCloseDetail = () => {
    setSelectedAppointment(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {appointments.map(appointment => (
          <TouchableOpacity
            key={appointment.id}
            style={styles.appointmentContainer}
            onPress={() => handleAppointmentPress(appointment)}
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
      {selectedAppointment && (
        <View style={styles.modalOverlay}>
          <AppointmentDetail
            appointment={selectedAppointment}
            onCancel={() => handleCancel(selectedAppointment.id)}
            onModify={handleModify}
            onClose={handleCloseDetail}
          />
        </View>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="calendar" size={32} color="#fff" />
          <Text style={styles.iconText}>Citas Activas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleRequest}>
          <AntDesign name="form" size={32} color="#fff" />
          <Text style={styles.iconText}>Solicitud de Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCalendar}>
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

const AppointmentDetail = ({ appointment, onCancel, onModify, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.modalText}>Detalles de la cita:</Text>
      <Text style={styles.modalText}>Nombre: {appointment.name}</Text>
      <Text style={styles.modalText}>Hora: {appointment.time}</Text>
      <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
        <Text style={styles.buttonText}>Eliminar Cita</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButton} onPress={() => onModify(appointment)}>
        <Text style={styles.buttonText}>Modificar Cita</Text>
      </TouchableOpacity>
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#1B4965',
    borderRadius: 15,
    padding: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#1B4965',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#1B4965',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
