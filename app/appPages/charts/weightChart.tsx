import React from 'react';
import { View, StyleSheet } from 'react-native';
import SimpleWeightChart from './chartComponent'; // Import your component

const WeightChartScreen = () => {
  // Example data - replace with your actual data
  const weightData = [
    { date: 'Jan 1', weight: 7.2 },
    { date: 'Jan 15', weight: 7.5 },
    { date: 'Feb 1', weight: 7.9 },
    { date: 'Feb 15', weight: 8.3 },
    { date: 'Mar 1', weight: 8.7 },
  ];

  return (
    <View style={styles.container}>
      <SimpleWeightChart data={weightData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default WeightChartScreen;