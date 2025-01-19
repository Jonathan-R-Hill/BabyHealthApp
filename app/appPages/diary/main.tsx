interface DiaryEntry {
  id: number;
  title: string;
  date: string;
}

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import Navbar from "../../Navbar";
import Header from "../../Header";
import { getEmail } from "../../storeUser";

export default function CreateDiaryEntry() {
  const router = useRouter();
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  // retrieve user email from AsyncStorage
  const [email, setEmail] = useState<string | null>(null);
  async function fetchEmail() {
    const storedEmail = await getEmail(); // Retrieve email from AsyncStorage
    setEmail(storedEmail ?? null);
    console.log(storedEmail); // Debug log
  }
  fetchEmail();

  useEffect(() => {
    fetchEmail();
  }, []);

  // Works on mobile app view or PC browser by falling back to localhost input if the environmental variable is null
  const BACKEND =
    process.env.EXPO_PUBLIC_JSON_SERVER || "http://localhost:3000";
  // console.log("Backend URL:", BACKEND); // Debugging

  const fetchDiaryEntries = async () => {
    try {
      const response = await fetch(`${BACKEND}/entry`);
      const data: DiaryEntry[] = await response.json();
      setDiaryEntries(data);
    } catch (error) {
      console.error("Error fetching diary entries:", error);
      Alert.alert("Error", "Could not load diary entries.");
    }
  };

  useEffect(() => {
    fetchDiaryEntries();
  }, []);

  // Remove useNavigation since we're using expo-router
  const handleNavigateToEntry = () => {
    console.log("Button pressed"); // Debug log
    try {
      router.push("./newEntry"); // Changed from relative path to absolute
      console.log("Navigation successful"); // Debug log
    } catch (error) {
      console.error("Navigation error:", error); // Debug log
      Alert.alert("Navigation Error", "Could not navigate to entry page");
    }
  };

  const handleNavigateToDetails = (id: number) => {
    router.push({
      pathname: "./record",
      params: { id: id.toString() }, // Pass the id as a string
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      {/* view for debug purpose remove later */}
      <View>
        <Text>Email: {`${email} test` || "No email found"}</Text>
      </View>

      {/* Chart Buttons */}
      {/* <View style={styles.chartButtonsContainer}>
        <TouchableOpacity style={styles.chartButton}>
          <Text style={styles.chartButtonText}>Weight Chart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chartButton}>
          <Text style={styles.chartButtonText}>Milk Chart</Text>
        </TouchableOpacity>
      </View> */}

      {/* Diary Entries */}
      <ScrollView style={styles.diaryContainer}>
        <TouchableOpacity
          onPress={handleNavigateToEntry}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Create a new entry</Text>
        </TouchableOpacity>

        {diaryEntries.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            style={styles.diaryEntry}
            onPress={() => handleNavigateToDetails(entry.id)}
          >
            <Text style={styles.diaryText}>{entry.title}</Text>
            <Text style={styles.dateText}>{entry.date}</Text>
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
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 20,
  },
  chartButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  chartButton: {
    backgroundColor: "#5A4FCF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chartButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  divider: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  yearText: {
    fontSize: 18,
    color: "#000",
    marginTop: -12,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "#007AFF", // iOS blue color, you can change this
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
