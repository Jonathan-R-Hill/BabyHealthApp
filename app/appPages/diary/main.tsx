import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { popup } from "@/components/LogoutPopup";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import { fetchAllDiaryEntries } from "../../../services/diaryService";

// Define the structure of a diary entry
interface DiaryEntry {
  details: {
    date: string; // ISO date string representing the diary entry date
    entry_id: number; 
    userId: string; 
    diaryTitle: string; 
  };
  data: {
    foodAmount: number; 
    foodType: string; 
    text: string; 
    weight: number; 
  };
}

interface BabyProfile {
  name: string;
  age: {
    months: number;
    days: number;
  };
  daysToFullTerm: number;
  profileImage?: string;
}

export default function CreateDiaryEntry() {
  const router = useRouter(); // Router for navigation
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]); // State to store diary entries
  const [babyProfile, setBabyProfile] = useState<BabyProfile>({
    name: "Julian",
    age: {
      months: 1,
      days: 24
    },
    daysToFullTerm: 38,
    profileImage: require("../../../assets/images/baby-profile-placeholder.jpg")
  }); // Placeholder baby profile
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

  const renderDiaryEntries = (
    diaryEntries: DiaryEntry[],
    handleNavigateToDetails: (entry_id: number) => void
  ) => {
    let lastYear = ""; // Track the last displayed year for section headers
    if (!diaryEntries){
      popup()
      return
    }
    return diaryEntries.map((entry) => {
      const entryDate = new Date(entry.details.date);
      const entryYear = entryDate.getFullYear().toString();
      const currentYear = new Date().getFullYear().toString();
      const displayYearHeader = entryYear !== lastYear && entryYear !== currentYear; // Show year header if new year appears
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
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Diary" />
      <View style={styles.profileSection}>
        <Image
          source={babyProfile.profileImage}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={styles.profileOverlay}
        >
          <View style={styles.profileOverlay}>
            <Text style={styles.babyName}>{babyProfile.name}</Text>
            <Text style={styles.babySubtitle}>My baby</Text>
  
            <View style={styles.infoChips}>
              <View style={styles.infoChip}>
                <Ionicons name="calendar-outline" size={16} color="#65558f" />
                <Text style={styles.chipText}>
                  {babyProfile.age.months} Months and {babyProfile.age.days} days
                </Text>
              </View>
  
              <View style={styles.infoChip}>
                <Ionicons name="timer-outline" size={16} color="#65558f" />
                <Text style={styles.chipText}>
                  {babyProfile.daysToFullTerm} days to full-term
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
  
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingTop: 6, paddingBottom: 75}} style={styles.diaryContainer}>
          {/* Display diary entries */}
          {renderDiaryEntries(diaryEntries, handleNavigateToDetails)}
        </ScrollView>
        <TouchableOpacity style={styles.fabButton} onPress={handleNavigateToEntry}>
          <Text style={styles.fabButtonText}>+</Text>
        </TouchableOpacity>
        <Navbar />
      </View>
    </View>
  );
}

// Define styles for components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  profileOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  babyName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", 
  },
  babySubtitle: {
    fontSize: 16,
    color: "#f0f0f0", 
    marginBottom: 10,
  },
  infoChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  infoChip: {
    backgroundColor: "#F7F2FA",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  chipText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
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
    backgroundColor: "#2c3e50", 
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
    backgroundColor: "#cfa4db",
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
    color: "#F7F2FA",
    fontWeight: "bold",
    marginBottom: 9, // Slight adjust for optical balance
  },
});
