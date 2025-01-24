import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../Navbar";
import Header from "../../Header";

import { fetchAllDiaryEntries } from "../../../services/diaryService";

interface DiaryEntry {
  _id: {
    date: string; // ISO date string
    entry_id: number; // Unique identifier for the diary entry
    userId: string; // User identifier
  };
  data: {
    foodAmount: number; // Amount of food (e.g., milk, etc.)
    foodType: string; // Type of food
    text: string; // Diary entry text
    weight: number; // Weight associated with the diary entry
  };
}

export default function CreateDiaryEntry() {
  const router = useRouter();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const { username } = useLocalSearchParams();
  
  const fetchDiaryEntries = async (username: string) => {
    try {
      const data: DiaryEntry[] = await fetchAllDiaryEntries(username);
      setDiaryEntries(data);
    } catch (error) {
      Alert.alert("Error", "Could not load diary entries.");
    }
  };

  useEffect(() => {
    if (username) {
      fetchDiaryEntries(String(username));
    }
  }, [username]);

  const handleNavigateToEntry = () => {
    if (username) {
      router.push({ pathname: "./newEntry", params: { username } });
    } else {
      Alert.alert("Error", "Username is not available.");
    }
  };

  const handleNavigateToDetails = (entry_id: number) => {
    if (username) {
      router.push({
        pathname: "./record",
        params: { id: entry_id.toString(), username },
      });
    } else {
      Alert.alert("Error", "Username is not available.");
    }
  };

  let lastYear = ""; // To track the last displayed year
  
  return (
    <View style={styles.container}>
      <Header showLabel={true} />
      <ScrollView style={styles.diaryContainer}>
        <TouchableOpacity
          onPress={handleNavigateToEntry}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Create a new entry</Text>
        </TouchableOpacity>
        {diaryEntries.map((entry) => {
        const entryDate = new Date(entry._id.date);
        const entryYear = entryDate.getFullYear().toString();
        const currentYear = new Date().getFullYear().toString();
        const displayYearHeader = entryYear !== lastYear && entryYear !== currentYear;

        if (displayYearHeader) {
          lastYear = entryYear; // Update the last displayed year
        }

        return (
          <View key={entry._id.entry_id}>
            {displayYearHeader && (
              <View style={styles.yearHeader}>
                <Text>{entryYear}</Text>
                <View style={styles.yearHeaderLine} />
              </View>
            )}
            <TouchableOpacity
              style={styles.diaryEntry}
              onPress={() => handleNavigateToDetails(entry._id.entry_id)}
            >
              <Text style={styles.diaryText}>{entry.data.text}</Text>
              <Text style={styles.dateText}>
                {entryDate.toLocaleDateString(undefined, {
                  day: "2-digit",
                  month: "short",
                })}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  diaryContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  createButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  yearHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 6,
    marginLeft: 10,
    color: "#2c3e50",
    position: 'relative',
    paddingRight: 20, // Make space for the line
    opacity: 0.7, // Make it subtle
  },
  yearHeaderLine: {
    position: 'absolute',
    right: 10,
    top: '50%',
    height: 1,
    width: '90%', // Adjust width as needed
    backgroundColor: '#2c3e50', // Same color as year header text
    opacity: 0.4, // Make it subtle
  },
  diaryEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3498db",
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
  },
  diaryText: {
    color: "#fff",
    fontSize: 16,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
  },
});
