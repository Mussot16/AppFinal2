import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { NativeBaseProvider } from "native-base";
import moment from "moment-timezone";
import { AppointmentsContext } from '../context/AppointmentsContext';

const CalendarScreen = () => {
  const { appointments } = useContext(AppointmentsContext);
  const [items, setItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadItems();
  }, [appointments]);

  const today = moment().tz("America/Tijuana");
  const currentDate = today.format("YYYY-MM-DD");

  const loadItems = () => {
    const newItems = {};
    appointments.forEach(appointment => {
      const date = appointment.date;
      if (!newItems[date]) {
        newItems[date] = [];
      }
      newItems[date].push(appointment);
    });
    setItems(newItems);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
      >
        <Text>{item.name}</Text>
        <Text>{item.time}</Text>
        <Text>{item.date}</Text>
        <Text>{item.status}</Text>
      </TouchableOpacity>
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
            loadItemsForMonth={loadItems}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            minDate="2024-04-01"
            theme={calendarTheme}
          />
        </View>
        {selectedItem && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Nombre: {selectedItem.name}</Text>
              <Text style={styles.modalText}>Hora: {selectedItem.time}</Text>
              <Text style={styles.modalText}>Fecha: {selectedItem.date}</Text>
              <Text style={styles.modalText}>Estado: {selectedItem.status}</Text>
              <Image style={styles.image} source={{ uri: selectedItem.img }} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
    borderRadius: 10
  }
});

export default CalendarScreen;
