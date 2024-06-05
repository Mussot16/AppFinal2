import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { AppointmentsContext } from '../context/AppointmentsContext';
const Requests = () => {
  const navigation = useNavigation();
  const { acceptRequest, deleteRequest, requests } = useContext(AppointmentsContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
    setConfirmation('accept');
  };

  const handleDeleteRequest = (appointment) => {
    setSelectedAppointment(appointment);
    setConfirmation('delete');
  };

  const confirmAction = () => {
    if (confirmation === 'accept') {
      acceptRequest(selectedAppointment);
    } else if (confirmation === 'delete') {
      deleteRequest(selectedAppointment.id);
    }
    setConfirmation(null);
    setSelectedAppointment(null);
  };

  const cancelAction = () => {
    setConfirmation(null);
    setSelectedAppointment(null);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCalendar = () => {
    navigation.navigate('CalendarScreen');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleMetrics = () => {
    navigation.navigate('MetricsScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {requests.map(appointment => (
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
                <Text style={styles.date}>{appointment.date}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteRequest(appointment)}>
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {confirmation && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={cancelAction}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                {confirmation === 'accept' ? '¿Aceptar esta cita?' : '¿Eliminar esta solicitud?'}
              </Text>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmAction}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={cancelAction}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleCancel}>
          <AntDesign name="closecircle" size={32} color="#fff" />
          <Text style={styles.iconText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCalendar}>
          <AntDesign name="calendar" size={32} color="#fff" />
          <Text style={styles.iconText}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
          <AntDesign name="setting" size={32} color="#fff" />
          <Text style={styles.iconText}>Ajustes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleMetrics}>
          <AntDesign name="linechart" size={32} color="#fff" />
          <Text style={styles.iconText}>Métricas</Text>
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
    padding: 10,
  },
  appointmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
  date: {
    fontSize: 12,
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
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#1B4965',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
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

export default Requests;
