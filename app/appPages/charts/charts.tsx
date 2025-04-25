import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { fetchWeightRecord, fetchMilkRecord } from "@/services/chartServices";
import {
  fetchAiWeightAnalysis,
  fetchAiFoodConsumptionAnalysis,
} from "@/services/aiDiaryAnalysisService";
import { useLocalSearchParams } from "expo-router";
import Header from "@/app/Header";
import Navbar from "@/app/Navbar";

// Get screen width
const { width: screenWidth } = Dimensions.get("window");

// Determine button width dynamically
const isSmallScreen = screenWidth <= 900;
const formMargin = isSmallScreen ? "3%" : "20%";
// const alignItems = isSmallScreen ? "center" : "flex-start";

type WeightRecord = {
  date: string;
  weight: number;
};

type MilkRecord = {
  date: string;
  foodAmount: number;
};

const BabyCharts = () => {
  const { username, token } = useLocalSearchParams();
  const [weightData, setWeightData] = useState<WeightRecord[]>([]);
  const [weightAnalysisResponse, setWeightResponse] = useState<string | null>(
    null
  );
  const [milkData, setMilkData] = useState<MilkRecord[]>([]);
  const [foodAnalysisResponse, setFoodResponse] = useState<string | null>(null);

  useEffect(() => {
    fetchWeightData(username as string, token as string)
      .then(() => setAiWeightAnalysis(username as string, token as string))
      .then(() => fetchMilkData(username as string, token as string))
      .then(() => setAiFoodAnalysis(username as string, token as string));
  }, []);

  async function fetchWeightData(username: string, token: string) {
    try {
      console.log("token: " + token);
      //fetch record returns an array of WeightRecord objects, parsed at service level
      const data: WeightRecord[] = await fetchWeightRecord(username, token);

      console.log(data);

      if (data && data.length > 0) {
        setWeightData(data);
      }
    } catch (error) {
      console.error("Error fetching weight data at frontend:", error);
    }
  }

  async function setAiWeightAnalysis(username: string, token: string) {
    try {
      const weightAnalysis = await fetchAiWeightAnalysis(username, token);
      setWeightResponse(weightAnalysis.analysis);
    } catch (error) {
      console.error("Error fetching AI weight analysis:", error);
    }
  }

  async function fetchMilkData(username: string, token: string) {
    try {
      console.log("token: " + token);
      //fetch record returns an array of WeightRecord objects, parsed at service level
      const data: MilkRecord[] = await fetchMilkRecord(username, token);

      console.log("milk request token: " + token);
      console.log(data);

      if (data && data.length > 0) {
        setMilkData(data);
      }
    } catch (error) {
      console.error("Error fetching milk data at frontend:", error);
    }
  }

  async function setAiFoodAnalysis(username: string, token: string) {
    try {
      const foodAnalysisResponse = await fetchAiFoodConsumptionAnalysis(
        username,
        token
      );
      setFoodResponse(foodAnalysisResponse.analysis);
    } catch (error) {
      console.error("Error fetching AI food analysis:", error);
    }
  }

  const seenMonthsWeight = new Set<string>(); // Track which months have been shown
  const seenMonthsMilk = new Set<string>(); // Track which months have been shown

  const weightChartData = weightData.map((record, index) => {
    const date = new Date(record.date);
    const monthKey = date.toISOString().slice(0, 7); // "YYYY-MM"
    const showMonth = !seenMonthsWeight.has(monthKey);
    seenMonthsWeight.add(monthKey);

    // If more than 15 entries, hide every second label
    const showLabel = weightData.length > 15 ? index % 2 === 0 : true;

    const entry = {
      value: record.weight,
      label: showLabel
        ? showMonth
          ? date.toLocaleDateString("en-GB", { month: "short" }).charAt(0)
          : date.getDate().toString()
        : "", // Hide alternate labels if >15 entries
      // showXAxisIndex: showLabel,
    };

    // console.log("Processed Entry:", entry); // Log each processed object
    return entry;
  });

  const milkChartData = milkData.map((record, index) => {
    const date = new Date(record.date);
    const monthKey = date.toISOString().slice(0, 7); // "YYYY-MM"
    const showMonth = !seenMonthsMilk.has(monthKey);
    seenMonthsMilk.add(monthKey);

    // If more than 15 entries, hide every second label
    const showLabel = milkData.length > 15 ? index % 2 === 0 : true;

    const entry = {
      value: record.foodAmount,
      label: showLabel
        ? showMonth
          ? date.toLocaleDateString("en-GB", { month: "short" }).charAt(0)
          : date.getDate().toString()
        : "", // Hide alternate labels if >15 entries
      // showXAxisIndex: showLabel,
    };

    // console.log("Processed Entry:", entry); // Log each processed object
    return entry;
  });

  return (
    <View style={styles.container}>
      <Header title="Health Charts" />
      <ScrollView>
        <View style={styles.chart}>
          <Text style={styles.chartTitle}>Weight Trends (Last Month)</Text>
          <LineChart
            areaChart
            curved
            data={weightChartData}
            height={250}
            // showVerticalLines
            spacing={20}
            initialSpacing={0}
            color="skyblue"
            textColor="green"
            hideDataPoints
            dataPointsColor="blue"
            startFillColor="skyblue"
            startOpacity={0.8}
            endOpacity={0.3}
            stepValue={1000}
            maxValue={6000}
            noOfSections={6}
            yAxisLabelTexts={["0", "1kg", "2kg", "3kg", "4kg", "5kg", "6kg"]}
            xAxisLabelTextStyle={{ fontSize: 11, color: "black" }}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨Weight Analysis</Text>
          <Text style={styles.cardContent}>
            {weightAnalysisResponse || "Fetching AI insights..."}
          </Text>
        </View>
        <View style={styles.chart}>
        <Text style={styles.chartTitle}>Weight Trends (Last Month)</Text>
          <LineChart
            areaChart
            curved
            data={milkChartData}
            height={250}
            // showVerticalLines
            spacing={20}
            initialSpacing={0}
            color="skyblue"
            textColor="green"
            hideDataPoints
            dataPointsColor="blue"
            startFillColor="skyblue"
            startOpacity={0.8}
            endOpacity={0.3}
            stepValue={100}
            maxValue={300}
            noOfSections={10}
            // yAxisLabelTexts={['0', '50', '100', '150', '200', '250', '300']}
            xAxisLabelTextStyle={{ fontSize: 11, color: "black" }}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨Food Consumption Analysis</Text>
          <Text style={styles.cardContent}>
            {foodAnalysisResponse || "Fetching AI insights..."}
          </Text>
        </View>
      </ScrollView>
      <Navbar />
    </View>
  );
};

export default BabyCharts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chart: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: formMargin,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 15,
  },
  analysisHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  analysisText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#F7F2FA",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: formMargin,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
  },
});
