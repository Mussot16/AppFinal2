import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AppointmentsContext = createContext();

const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([
    { id: 1, name: 'Rodrigo Arechiga Gamboa', time: '12:00 - 14:00', date: '2024-04-21' },
    { id: 2, name: 'Ivan Archivaldo Guzman Salazar', time: '15:30 - 16:30', date: '2024-04-22' },
    { id: 3, name: 'Rafael Lazcano Rosales', time: '10:00 - 11:00', date: '2024-06-04' },
    { id: 4, name: 'Samantha Rodriguez Bojorquez', time: '09:00 - 10:00', date: '2024-06-04' },
    { id: 5, name: 'Nestor Isidro Perez Salas', time: '09:00 - 10:00', date: '2024-06-05' },
    { id: 6, name: 'Francisco Mussot Rosales', time: '09:00 - 10:00', date: '2024-06-06'},
    { id: 7, name: 'Manuel Torres Felix', time: '09:00 - 10:00', date: '2024-06-07'},
    { id: 8, name: 'Gonzalo Inzunza Inzunza', time: '09:00 - 10:00', date: '2024-06-08'},
    { id: 9, name: 'Edgar Valdez Villareal', time: '09:00 - 10:00', date: '2024-06-09'},
  ]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const storedAppointments = await AsyncStorage.getItem('appointments');
        if (storedAppointments) {
          setAppointments(JSON.parse(storedAppointments));
        }
      } catch (error) {
        console.error('Failed to load appointments.', error);
      }
    };

    loadAppointments();
  }, []);

  const saveAppointments = async (newAppointments) => {
    try {
      await AsyncStorage.setItem('appointments', JSON.stringify(newAppointments));
    } catch (error) {
      console.error('Failed to save appointments.', error);
    }
  };

  const addAppointment = (appointment) => {
    const newAppointments = [...appointments, appointment];
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(appointment => appointment.id !== id);
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const modifyAppointment = (id, newDetails) => {
    const newAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, ...newDetails } : appointment
    );
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const deleteRequest = (id) => {
    const newRequests = requests.filter(request => request.id !== id);
    setRequests(newRequests);
  };

  const acceptRequest = (request) => {
    addAppointment(request);
    deleteRequest(request.id);
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, deleteAppointment, modifyAppointment, requests, deleteRequest, acceptRequest }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};

export default AppointmentsProvider;