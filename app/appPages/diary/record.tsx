import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { fetchSingleDiaryEntry } from "../../../services/diaryService";

// Define the structure of a diary entry
interface DiaryEntry {
  details: {
    date: string;
    entry_id: number;
    userId: string;
  };
  data: {
    foodAmount: number;
    foodType: string;
    text: string;
    weight: number;
  };
}

export default function DiaryEntryDetails() {
  const router = useRouter();
  const { id, username, token } = useLocalSearchParams(); // Get parameters from the route
  const [entry, setEntry] = useState<DiaryEntry | null>(null); // State to store diary entry data
  const [loading, setLoading] = useState(true); // State to track loading status

  // Function to fetch a single diary entry
  const fetchDiaryEntry = async (
    username: string,
    entry_id: number,
    token: string
  ) => {
    try {
      const data: DiaryEntry = await fetchSingleDiaryEntry(
        username,
        entry_id,
        String(token)
      );
      if (data) {
        setEntry(data); // Store the retrieved entry
      } else {
        Alert.alert("Error", "Diary entry not found."); // Show an alert if entry is not found
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load the diary entry."); // Handle fetch errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (id && username) {
      fetchDiaryEntry(String(username), parseInt(String(id)), String(token));
    }
  }, [id, username]); // Fetch the diary entry when `id` or `username` changes

  // Display loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5A4FCF" />
        <Navbar />
      </View>
    );
  }

  // Display error message if the entry is not found
  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Entry not found.</Text>
        <Navbar />
      </View>
    );
  }

  // Display the diary entry details
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.dateText}>
          {new Date(entry.details.date).toLocaleDateString()}
        </Text>
        <Text style={styles.content}>{entry.data.text}</Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Weight: </Text>
          {entry.data.weight}g
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Food Type: </Text>
          {entry.data.foodType}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Food Amount: </Text>
          {entry.data.foodAmount}ml
        </Text>
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: "bold",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
