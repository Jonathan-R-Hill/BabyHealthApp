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
        {diaryEntries.map((entry) => (
          <TouchableOpacity
            key={entry._id.entry_id}
            style={styles.diaryEntry}
            onPress={() => handleNavigateToDetails(entry._id.entry_id)}
          >
            <Text style={styles.diaryText}>{entry.data.text}</Text>
            <Text style={styles.dateText}>
              {new Date(entry._id.date).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
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
