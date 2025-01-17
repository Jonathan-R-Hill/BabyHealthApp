import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";

interface DiaryEntry {
  id: number;
  date: string;
  title: string;
  text: string;
  weight: number;
  foodType: string;
  foodAmount: number;
}

export default function DiaryEntryDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Replaced useSearchParams with useLocalSearchParams
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const BACKEND = process.env.EXPO_PUBLIC_JSON_SERVER || "http://localhost:3000";

  const fetchDiaryEntries = async () => {
    try {
      const response = await fetch(`${BACKEND}/entry`);
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      const data: DiaryEntry[] = await response.json();
      const foundEntry = data.find((e: DiaryEntry) => e.id === parseInt(id as string, 10)); // Typecast id to string
      if (!foundEntry) {
        throw new Error("Entry not found");
      }
      setEntry(foundEntry);
    } catch (error) {
      console.error("Error fetching diary entry:", error);
      Alert.alert("Error", "Could not load diary entry.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDiaryEntries();
    }
  }, [id]);

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
        <Text style={styles.dateText}>{entry.date}</Text>
        <Text style={styles.title}>{entry.title}</Text>
        <Text style={styles.content}>{entry.text}</Text>
        <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Weight: </Text>
            {entry.weight}g
        </Text>
        <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Food Type: </Text>
            {entry.foodType}
        </Text>
        <Text style={styles.infoText}>
            <Text style={styles.infoLabel}>Food Amount: </Text>
            {entry.foodAmount}ml
        </Text>
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
  title: {
    fontSize: 20,
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
