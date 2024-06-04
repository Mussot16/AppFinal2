// MetricsScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { LineChart, BarChart, PieChart, rgba } from 'react-native-chart-kit';

const MetricsScreen = () => {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Number of Appointments"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Metrics</Text>
      <Card style={styles.card}>
        <Text style={styles.chartTitle}>Monthly Appointments</Text>
        <LineChart
          data={data}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
        />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.chartTitle}>Appointments by Status</Text>
        <BarChart
          data={data}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </Card>
      <Card style={styles.card}>
        <Text style={styles.chartTitle}>Appointments Distribution</Text>
        <PieChart
          data={[
            { name: 'Pending', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Completed', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Cancelled', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 }
          ]}
          width={screenWidth - 30}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MetricsScreen;