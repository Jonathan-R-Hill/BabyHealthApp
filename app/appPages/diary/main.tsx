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
import { popup } from "@/components/LogoutPopup";
import Navbar from "../../Navbar";
import Header from "../../Header";

import { fetchAllDiaryEntries } from "../../../services/diaryService";
import { ReusableButton } from "@/components/ReusableButton";

// Define the structure of a diary entry
interface DiaryEntry {
  details: {
    date: string; // ISO date string representing the diary entry date
    entry_id: number; // Unique identifier for the diary entry
    userId: string; // User identifier
    diaryTitle: string; // Title of the diary entry
  };
  data: {
    foodAmount: number; // Amount of food recorded (e.g., milk, etc.)
    foodType: string; // Type of food recorded
    text: string; // Text content of the diary entry
    weight: number; // Weight associated with the diary entry
  };
}

export default function CreateDiaryEntry() {
  const router = useRouter(); // Router for navigation
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]); // State to store diary entries
  const { username, token } = useLocalSearchParams(); // Get username and token from local search params

  // Function to fetch diary entries from the backend
  const fetchDiaryEntries = async (username: string, token: string) => {
    try {
      const data: DiaryEntry[] = await fetchAllDiaryEntries(username, token);
      setDiaryEntries(data); // Store fetched diary entries in state
    } catch (error) {
      Alert.alert("Error", "Could not load diary entries."); // Show an error alert if fetching fails
    }
  };

  // Fetch diary entries when username is available
  useEffect(() => {
    if (username) {
      fetchDiaryEntries(String(username), String(token));
    }
  }, [username]);

  // Navigate to the new diary entry creation page
  const handleNavigateToEntry = () => {
    if (username) {
      router.push({ pathname: "./newEntry", params: { username, token } });
    } else {
      Alert.alert("Error", "Username is not available.");
    }
  };

  // Navigate to the details page of a specific diary entry
  const handleNavigateToDetails = (entry_id: number) => {
    if (username) {
      router.push({
        pathname: "./record",
        params: { id: entry_id.toString(), username, token },
      });
    } else {
      Alert.alert("Error", "Username is not available.");
    }
  };

  let lastYear = ""; // Track the last displayed year for section headers

  return (
    <View style={styles.container}>
      <Header title="Diary" />
      <ScrollView style={styles.diaryContainer}>

        {/* Display diary entries */}
        { !diaryEntries ? popup() :  
        diaryEntries.map((entry) => {
          const entryDate = new Date(entry.details.date);
          const entryYear = entryDate.getFullYear().toString();
          const currentYear = new Date().getFullYear().toString();
          const displayYearHeader =
            entryYear !== lastYear && entryYear !== currentYear; // Show year header if new year appears

          if (displayYearHeader) {
            lastYear = entryYear; // Update the last displayed year
          }

          return (
            <View key={entry.details.entry_id}>
              {displayYearHeader && (
                <View style={styles.yearHeader}>
                  <Text>{entryYear}</Text>
                  <View style={styles.yearHeaderLine} />
                </View>
              )}
              {/* Display diary entry */}
              <TouchableOpacity
                style={styles.diaryEntry}
                onPress={() => handleNavigateToDetails(entry.details.entry_id)}
              >
                <Text style={styles.diaryText}>{entry.details.diaryTitle}</Text>
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
      <TouchableOpacity style={styles.fabButton} onPress={handleNavigateToEntry}>
    <Text style={styles.fabButtonText}>+</Text>
  </TouchableOpacity>
      <Navbar />
    </View>
  );
}

// Define styles for components
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
    position: "relative",
    paddingRight: 20, // Make space for the line
    opacity: 0.7, // Make it subtle
  },
  yearHeaderLine: {
    position: "absolute",
    right: 10,
    top: "50%",
    height: 1,
    width: "90%",
    backgroundColor: "#2c3e50", // Same color as year header text
    opacity: 0.4, // Make it subtle
  },
  diaryEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#65558f",
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
  fabButton: {
    position: "absolute",
    bottom: 80, 
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: "#4a3f6e",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#1f1c29", // iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 10,
  },
  
  fabButtonText: {
    fontSize: 50,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8, // Slight adjust for optical balance
  },
  
});
