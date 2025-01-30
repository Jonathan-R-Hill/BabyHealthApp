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
  const { id, username, token } = useLocalSearchParams();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDiaryEntry = async (username: string, entry_id: number) => {
    try {
      const data: DiaryEntry = await fetchSingleDiaryEntry(username, entry_id);
      if (data) {
        setEntry(data);
      } else {
        Alert.alert("Error", "Diary entry not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load the diary entry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && username) {
      fetchDiaryEntry(String(username), parseInt(String(id)));
    }
  }, [id, username]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5A4FCF" />
        <Navbar />
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Entry not found.</Text>
        <Navbar />
      </View>
    );
  }

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
