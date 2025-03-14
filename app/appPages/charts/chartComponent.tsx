import React, { useEffect, useState } from "react";
 import { View, Text, ScrollView, Dimensions } from "react-native";
 import {
   LineChart,
   BarChart,
   PieChart
 } from "react-native-gifted-charts"
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
 
  // version 1 
  //  const chartData = {
  //    labels: weightData.map(record => new Date(record.date).getDate().toString()),
  //    datasets: [
  //      {
  //        data: weightData.map(record => record.weight),
  //        strokeWidth: 2,
  //      },
  //    ],
  //  };

  // version 2 
  //  const chartData = weightData.map(record => ({
  //   value: record.weight,
  //   label: new Date(record.date).toLocaleDateString("en-GB", {
  //     day: "numeric",
  //     month: "short"
  //   }), 
  //  }));  

  // version 3
  const seenMonths = new Set<string>(); // Track which months have been shown

  const chartData = weightData.map((record, index) => {
    const date = new Date(record.date);
    const monthKey = date.toISOString().slice(0, 7); // "YYYY-MM"
    const showMonth = !seenMonths.has(monthKey);
    seenMonths.add(monthKey);
  
    // If more than 15 entries, hide every second label
    const showLabel = weightData.length > 15 ? index % 2 === 0 : true;
  
    const entry = {
      value: record.weight,
      label: showLabel
        ? (showMonth ? date.toLocaleDateString("en-GB", { month: "short" }).charAt(0) : date.getDate().toString())
        : "", // Hide alternate labels if >15 entries
      // showXAxisIndex: showLabel,
    };
  
    console.log("Processed Entry:", entry); // Log each processed object
    return entry;
  });

  //  return (
  //    <ScrollView>
  //      <View style={{ padding: 20, alignItems: "center" }}>
  //        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
  //          Baby's Weight for the Last Month
  //        </Text>
  //        {weightData.length > 0 ? (
  //          <LineChart
  //            width={Dimensions.get("window").width - 40}
  //            height={220}
  //                />
  //        ) : (
  //          <Text>No weight data available for the last month.</Text>
  //        )}
  //      </View>
  //    </ScrollView>
  //  );

   return (
    <View> 
      <LineChart
        areaChart
        curved
        data={chartData}
        height={250}
        // showVerticalLines
        spacing={20}
        initialSpacing={0}
        color1="skyblue"
        textColor1="green"
        hideDataPoints
        dataPointsColor1="blue"
        startFillColor1="skyblue"
        startOpacity={0.8}
        endOpacity={0.3}
        stepValue={1000}
        maxValue={6000}
        noOfSections={6}
        yAxisLabelTexts={['0', '1kg', '2kg', '3kg', '4kg', '5kg', '6kg']}
        xAxisLabelTextStyle={{ fontSize: 11, color: 'black' }}
        />
    </View>
  );
};
 
export default BabyWeightChart;