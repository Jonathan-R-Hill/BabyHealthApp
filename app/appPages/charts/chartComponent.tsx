import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';

// Define the data point interface
interface WeightDataPoint {
  date: string;
  weight: number;
}

// Define the component props interface
interface SimpleWeightChartProps {
  data?: WeightDataPoint[];
  minWeight?: number;
  maxWeight?: number;
}

// Define chart height as a constant outside the component
const CHART_HEIGHT = 200;

const SimpleWeightChart: React.FC<SimpleWeightChartProps> = ({ 
  data = [], 
  minWeight = 0, 
  maxWeight = 10 
}) => {
  // Default data if none provided
  const sampleData: WeightDataPoint[] = [
    { date: '01/01', weight: 3.2 },
    { date: '01/08', weight: 3.5 },
    { date: '01/15', weight: 3.8 },
    { date: '01/22', weight: 4.1 },
    { date: '01/29', weight: 4.3 },
    { date: '02/05', weight: 4.6 },
    { date: '02/12', weight: 4.9 },
  ];

  // Use provided data or fallback to sample data
  const chartData = data.length > 0 ? data : sampleData;
  
  // Calculate min and max from data if not provided
  const calculatedMin = Math.min(...chartData.map(item => item.weight));
  const calculatedMax = Math.max(...chartData.map(item => item.weight));
  
  // Use provided min/max or calculated ones
  const weightMin = minWeight || Math.floor(calculatedMin - 0.5);
  const weightMax = maxWeight || Math.ceil(calculatedMax + 0.5);
  
  const weightRange = weightMax - weightMin;
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = Math.max(chartData.length * 80, screenWidth - 40);
  
  // Generate horizontal grid lines
  const horizontalLines = [];
  const numLines = 5;
  for (let i = 0; i <= numLines; i++) {
    const y = CHART_HEIGHT - (i / numLines) * CHART_HEIGHT;
    const weight = weightMin + (i / numLines) * weightRange;
    horizontalLines.push(
      <View key={`line-${i}`} style={[styles.horizontalLine, { top: y }]}>
        <Text style={styles.weightLabel}>{weight.toFixed(1)}</Text>
      </View>
    );
  }

  // Calculate position of dots
  const points = chartData.map((item, index) => {
    const x = (index / (chartData.length - 1)) * (chartWidth - 60) + 30;
    const normalizedWeight = (item.weight - weightMin) / weightRange;
    const y = CHART_HEIGHT - normalizedWeight * CHART_HEIGHT;
    
    return (
      <View key={index} style={styles.pointContainer}>
        <View style={[styles.dataPoint, { left: x, top: y }]} />
        <Text style={[styles.dateLabel, { left: x - 20 }]}>{item.date}</Text>
      </View>
    );
  });

  // Draw lines between points
  const lines = [];
  for (let i = 0; i < chartData.length - 1; i++) {
    const x1 = (i / (chartData.length - 1)) * (chartWidth - 60) + 30;
    const x2 = ((i + 1) / (chartData.length - 1)) * (chartWidth - 60) + 30;
    
    const normalizedWeight1 = (chartData[i].weight - weightMin) / weightRange;
    const normalizedWeight2 = (chartData[i + 1].weight - weightMin) / weightRange;
    
    const y1 = CHART_HEIGHT - normalizedWeight1 * CHART_HEIGHT;
    const y2 = CHART_HEIGHT - normalizedWeight2 * CHART_HEIGHT;
    
    lines.push(
      <View
        key={`line-${i}`}
        style={[
          styles.line,
          {
            left: x1,
            top: y1,
            width: x2 - x1,
            height: 1,
            transform: [
              { rotate: `${Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI)}deg` },
              { translateY: 0 },
            ],
            transformOrigin: 'left top',
          },
        ]}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Chart</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
        <View style={[styles.chartContainer, { width: chartWidth, height: CHART_HEIGHT + 40 }]}>
          {horizontalLines}
          {lines}
          {points}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chartContainer: {
    marginTop: 10,
    position: 'relative',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#eee',
  },
  weightLabel: {
    position: 'absolute',
    left: -30,
    top: -10,
    width: 28,
    fontSize: 10,
    textAlign: 'right',
  },
  line: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#3498db',
  },
  pointContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dataPoint: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
    marginLeft: -5,
    marginTop: -5,
  },
  dateLabel: {
    position: 'absolute',
    top: CHART_HEIGHT + 5,
    fontSize: 10,
    textAlign: 'center',
  },
});

export default SimpleWeightChart;