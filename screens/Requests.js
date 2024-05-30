import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Requests = () => {
  const navigation = useNavigation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const appointments = [
    { id: 1, name: 'Ismael Duran Lopez', time: '12:00 - 14:00' },
    { id: 2, name: 'Ivan Ortiz Dominguez', time: '15:30 - 16:30' },
    { id: 1, name: 'Ismael Duran Lopez', time: '12:00 - 14:00' },
    { id: 2, name: 'Ivan Ortiz Dominguez', time: '15:30 - 16:30' },
    { id: 1, name: 'Ismael Duran Lopez', time: '12:00 - 14:00' },
    { id: 2, name: 'Ivan Ortiz Dominguez', time: '15:30 - 16:30' },
    { id: 1, name: 'Ismael Duran Lopez', time: '12:00 - 14:00' },
    { id: 2, name: 'Ivan Ortiz Dominguez', time: '15:30 - 16:30' },
    { id: 1, name: 'Ismael Duran Lopez', time: '12:00 - 14:00' },
    { id: 2, name: 'Ivan Ortiz Dominguez', time: '15:30 - 16:30' },

    // Añade más citas según sea necesario
  ];

  const handleAppointment = () => {
    navigation.navigate('AppointmentScreen'); 
  };
  const handleCancel = () => {
    navigation.goBack(); 
  };
  const handleCalendar = () => {
    navigation.navigate('Calendar'); 
  };

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAccept = (id) => {
    setConfirmation({ id, action: 'accept' });
  };

  const handleReject = (id) => {
    setConfirmation({ id, action: 'reject' });
  };

  const handleConfirm = () => {
    // lógica para confirmar la acción
    if (confirmation.action === 'accept') {
      // lógica para aceptar la cita
    } else {
      // lógica para rechazar la cita
    }
    setSelectedAppointment(null);
    setConfirmation(null);
  };

  const handleCloseDetail = () => {
    setSelectedAppointment(null);
  };

  const handleCloseConfirmation = () => {
    setConfirmation(null);
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
      {selectedAppointment && !confirmation && (
        <View style={styles.modalOverlay}>
          <AppointmentDetail
            appointment={selectedAppointment}
            onAccept={() => handleAccept(selectedAppointment.id)}
            onReject={() => handleReject(selectedAppointment.id)}
            onClose={handleCloseDetail}
          />
        </View>
      )}
      {confirmation && (
        <View style={styles.modalOverlay}>
          <ConfirmationDetail
            action={confirmation.action}
            onConfirm={handleConfirm}
            onCancel={handleCloseConfirmation}
          />
        </View>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAppointment}>
          <AntDesign name="calendar" size={32} color="#fff" />
          <Text style={styles.iconText}>Citas Activas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
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

const AppointmentDetail = ({ appointment, onAccept, onReject, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.modalText}>Detalles de la cita:</Text>
      <Text style={styles.modalText}>Nombre: {appointment.name}</Text>
      <Text style={styles.modalText}>Hora: {appointment.time}</Text>
      <TouchableOpacity style={styles.modalButton} onPress={onAccept}>
        <Text style={styles.buttonText}>Aceptar Cita</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButton} onPress={onReject}>
        <Text style={styles.buttonText}>Rechazar Cita</Text>
      </TouchableOpacity>
    </View>
  );
};

const ConfirmationDetail = ({ action, onConfirm, onCancel }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>¿Estás seguro que quieres {action === 'accept' ? 'aceptar' : 'rechazar'} esta cita?</Text>
      <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
        <Text style={styles.buttonText}>Sí</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
        <Text style={styles.buttonText}>No</Text>
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
});

export default Requests;
