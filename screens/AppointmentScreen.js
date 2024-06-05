import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { AppointmentsContext } from '../context/AppointmentsContext';

const AppointmentScreen = () => {
  const navigation = useNavigation();
  const { appointments, deleteAppointment, modifyAppointment } = useContext(AppointmentsContext);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [appointmentToModify, setAppointmentToModify] = useState(null);
  const [newTime, setNewTime] = useState('');

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleCalendar = () => {
    navigation.navigate('CalendarScreen');
  };

  const handleRequest = () => {
    navigation.navigate('Requests');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleMetrics = () => {
    navigation.navigate('MetricsScreen');
  };

  const handleModify = (appointment) => {
    setAppointmentToModify(appointment);
    setNewTime(appointment.time);
    setShowModifyModal(true);
  };

  const handleAppointmentPress = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleAppointment = () => {
    navigation.navigate('AppointmentScreen');
  };

  const handleCloseDetail = () => {
    setSelectedAppointment(null);
  };

  const handleDeleteRequest = (appointment) => {
    setShowConfirmation(true);
    setAppointmentToModify(appointment);
  };

  const confirmDelete = () => {
    deleteAppointment(appointmentToModify.id);
    setShowConfirmation(false);
    setSelectedAppointment(null);
    setAppointmentToModify(null);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setAppointmentToModify(null);
  };

  const confirmModify = () => {
    modifyAppointment(appointmentToModify.id, { time: newTime });
    setShowModifyModal(false);
    setSelectedAppointment(null);
    setAppointmentToModify(null);
  };

  const cancelModify = () => {
    setShowModifyModal(false);
    setAppointmentToModify(null);
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
            onDeleteRequest={handleDeleteRequest}
            onModify={handleModify}
            onClose={handleCloseDetail}
          />
        </View>
      )}
      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationContainer}>
            <Text style={styles.confirmationText}>¿Estás seguro de que deseas eliminar esta cita?</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelDelete}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showModifyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={cancelModify}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modifyContainer}>
            <Text style={styles.modifyText}>Modificar Hora de la Cita</Text>
            <TextInput
              style={styles.input}
              value={newTime}
              onChangeText={setNewTime}
              placeholder="Nueva Hora (ej. 14:00 - 15:00)"
            />
            <TouchableOpacity style={styles.confirmButton} onPress={confirmModify}>
              <Text style={styles.buttonText}>Modificar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={cancelModify}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={handleAppointment}>
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
        <TouchableOpacity style={styles.iconButton} onPress={handleMetrics}>
          <AntDesign name="linechart" size={32} color="#fff" />
          <Text style={styles.iconText}>Métricas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
          <AntDesign name="setting" size={32} color="#fff" />
          <Text style={styles.iconText}>Ajustes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AppointmentDetail = ({ appointment, onDeleteRequest, onModify, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.modalText}>Detalles de la cita:</Text>
      <Text style={styles.modalText}>Nombre: {appointment.name}</Text>
      <Text style={styles.modalText}>Hora: {appointment.time}</Text>
      <TouchableOpacity style={styles.modalButton} onPress={() => onDeleteRequest(appointment)}>
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
  confirmationContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  confirmationText: {
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
  modifyContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modifyText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
});

export default AppointmentScreen;
