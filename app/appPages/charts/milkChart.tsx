// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, Dimensions } from "react-native";
// import {
// 	LineChart,
// } from "react-native-gifted-charts"
// import { fetchMilkRecord } from "@/services/chartServices";
// import { useLocalSearchParams } from "expo-router";

// type MilkRecord = {
// 	date: string;
// 	amount: number;
// }

// const BabyCharts = () => {
// 	const { username, token } = useLocalSearchParams(); 
// 	const [ milkData, setMilkData ] = useState<MilkRecord[]>([]);

// 	useEffect(() => {
// 		async function fetchMilkData(username: string, token: string) {      
// 			try {
// 				console.log("token: " + token);
// 				//fetch record returns an array of WeightRecord objects, parsed at service level
// 				const data: MilkRecord[] = await fetchMilkRecord(username, token);

// 				console.log("milk request token: " + token);
// 				console.log(data);
				
// 				if (data && data.length > 0) {
// 					setMilkData(data);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching milk data at frontend:", error);
// 			}
// 		}
// 		fetchMilkData(username as string, token as string);
// 	}, []);
	
// 	const seenMonthsMilk = new Set<string>(); // Track which months have been shown

// 	const milkChartData = milkData.map((record, index) => {
// 		const date = new Date(record.date);
// 		const monthKey = date.toISOString().slice(0, 7); // "YYYY-MM"
// 		const showMonth = !seenMonthsMilk.has(monthKey);
// 		seenMonthsMilk.add(monthKey);

// 		// If more than 15 entries, hide every second label
// 		const showLabel = milkData.length > 15 ? index % 2 === 0 : true;

// 		const entry = {
// 			value: record.amount,
// 			label: showLabel
// 				? (showMonth ? date.toLocaleDateString("en-GB", { month: "short" }).charAt(0) : date.getDate().toString())
// 				: "", // Hide alternate labels if >15 entries
// 			// showXAxisIndex: showLabel, 
// 		};

// 		console.log("Processed Entry:", entry); // Log each processed object
// 		return entry;
// 	});

// 	return (
// 		<View> 
// 				<LineChart
// 				areaChart
// 				curved
// 				data={milkChartData}
// 				height={250}
// 				// showVerticalLines
// 				spacing={20}
// 				initialSpacing={0}
// 				color1="skyblue"
// 				textColor1="green"
// 				hideDataPoints
// 				dataPointsColor1="blue"
// 				startFillColor1="skyblue"
// 				startOpacity={0.8}
// 				endOpacity={0.3}
// 				stepValue={100}
// 				maxValue={300}
// 				noOfSections={10}
// 				// yAxisLabelTexts={['0', '50', '100', '150', '200', '250', '300']}
// 				xAxisLabelTextStyle={{ fontSize: 11, color: 'black' }}
// 				/>
// 		</View>
// 	);
// };
 
// export default BabyCharts;