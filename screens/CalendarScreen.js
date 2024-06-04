// CalendarScreen.js
import React, { useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { NativeBaseProvider } from "native-base";
import moment from "moment-timezone";

const CalendarScreen = () => {
  const [items, setItems] = useState({});

  const today = moment().tz("America/Tijuana");
  const currentDate = today.format("YYYY-MM-DD");

  const loadItemsForMonth = (month) => {
    setTimeout(() => {
      const newItems = {};
      for (let i = -15; i < 85; i++) {
        const time = today.clone().add(i, 'days').format('YYYY-MM-DD');
        if (!newItems[time]) {
          newItems[time] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[time].push({
              name: 'Cita ' + (j + 1),
              time: '10:00 AM',
              date: time,
              status: 'Pendiente',
              img: 'https://via.placeholder.com/150',
              id: i.toString() + '-' + j.toString()
            });
          }
        }
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.cardContainer}>
        <Text>{item.name}</Text>
        <Text>{item.time}</Text>
        <Text>{item.date}</Text>
        <Text>{item.status}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDateText}>No hay citas para este día.</Text>
      </View>
    );
  };

  const calendarTheme = {
    calendarBackground: "#001D3D",
    textSectionTitleColor: "#FFD353",
    selectedDayBackgroundColor: "#ffd353",
    selectedDayTextColor: "#001D3D",
    todayTextColor: "#FFD353",
    dayTextColor: "#ffffff",
    textDisabledColor: "#8c8c8c",
    dotColor: "#ffd353",
    selectedDotColor: "#001D3D",
    monthTextColor: "#FFD353",
    textDayFontSize: 14,
    arrowColor: "#ffd353",
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <Agenda
            selected={currentDate}
            items={items}
            loadItemsForMonth={loadItemsForMonth}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            minDate="2024-04-01"
            theme={calendarTheme}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  titleScreen: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  calendarContainer: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyDateText: {
    textAlign: 'center',
    color: '#8c8c8c',
  }
});

export default CalendarScreen;