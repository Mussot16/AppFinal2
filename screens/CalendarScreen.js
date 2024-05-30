import React from 'react';
import { StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
  // Definir calendarTheme como un objeto
  const calendarTheme = {
    // Definir las propiedades de estilo del tema del calendario
    // Puedes ajustar estos estilos según tus preferencias
    'stylesheet.calendar.header': {
      week: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
    },
    // Más propiedades de estilo aquí...
  };
  return (
    <Agenda
      // Otras props del componente Agenda...
      theme={{
        // Pasar el objeto calendarTheme al tema del componente Agenda
        calendarTheme,
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue'
      }}
      // Otras props del componente Agenda...
    />
  );
};

const styles = StyleSheet.create({
  // Estilos de tu componente
});

export default CalendarScreen;