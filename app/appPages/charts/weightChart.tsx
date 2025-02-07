import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit"
import { fetchWeightRecord } from "@/services/chartServices";
// import Svg from "react-native-svg";
import { useLocalSearchParams } from "expo-router";

type WeightRecord = {
  date: string;
  weight: number;
};

const BabyWeightChart = () => {
  const { username, token } = useLocalSearchParams(); 
  const [weightData, setWeightData] = useState<WeightRecord[]>([]);

  useEffect(() => {
    async function fetchData(username: string, token: string) {
      try {
        console.log("token: " + token);
        //fetch record returns an array of WeightRecord objects, parsed at service level
        const data: WeightRecord[] = await fetchWeightRecord(username, token);
        //
        console.log(data);
        if (data && data.length > 0) {
          setWeightData(data);
        }
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    }
    fetchData(username as string, token as string);
  }, []);

  const chartData = {
    labels: weightData.map(record => new Date(record.date).getDate().toString()),
    datasets: [
      {
        data: weightData.map(record => record.weight),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView>
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Baby's Weight for the Last Month
        </Text>
        {weightData.length > 0 ? (
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            yAxisSuffix=" kg"
            chartConfig={{
              backgroundColor: "#f0f0f0",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#007AFF",
              },
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        ) : (
          <Text>No weight data available for the last month.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default BabyWeightChart;
