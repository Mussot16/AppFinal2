import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CalendarScreen = () => {
  const navigation = useNavigation();

  const [selectedDate, setSelectedDate] = useState(null); 

  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // lógica para realizar acciones específicas cuando se selecciona una fecha
  };

 
  const renderDays = () => {
    
    const days = [];

    for (let i = 1; i <= 31; i++) {
      days.push(
        <TouchableOpacity
          key={i}
          style={[styles.day, selectedDate === i ? styles.selectedDay : null]}
          onPress={() => handleDateSelect(i)}
        >
          <Text style={styles.dayText}>{i}</Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        {renderDays()}
      </View>
      {/* Otras partes de tu interfaz de usuario, como la barra de navegación o los botones de acción */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  day: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedDay: {
    backgroundColor: '#1B4965',
  },
  dayText: {
    color: '#1B4965',
    fontSize: 16,
  },
});

export default CalendarScreen;