import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import Header from "../../Header";
import {
  deleteSingleDiaryEntry,
  fetchSingleDiaryEntry,
} from "../../../services/diaryService";
import { ReusableButton } from "@/components/ReusableButton";

import { targetURL } from "../../../config";

// Get screen width
const { width: screenWidth } = Dimensions.get("window");

// Determine button width dynamically
const isSmallScreen = screenWidth <= 900;
const formMargin = isSmallScreen ? "0%" : "20%";

interface DiaryEntry {
  details: {
    date: string;
    entry_id: number;
    userId: string;
    diaryTitle: string;
    imageId?: string;
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

        if (data.details.imageId) {
          // console.log(`${targetURL}/get/diaryImage/${data.details.imageId}`);
          setImageUrl(`${targetURL}/get/diaryImage/${data.details.imageId}`);
        }
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

  // Navigate to the new diary entry creation page
  const handleDeleteEntry = async () => {
    if (
      typeof username === "string" &&
      typeof id === "string" &&
      typeof token === "string"
    ) {
      const entryId = parseInt(id, 10);
      if (!isNaN(entryId)) {
        try {
          const response = await deleteSingleDiaryEntry(
            username,
            entryId,
            token
          );
          //console.log("Diary entry deleted.");
          router.push({
            pathname: "./main",
            params: { username, token },
          });
          return response.data;
        } catch (error) {
          Alert.alert("Error", "Failed to delete the entry.");
        }
      } else {
        Alert.alert("Error", "Invalid entry ID.");
      }
    } else {
      Alert.alert("Error", "Missing or invalid parameters.");
    }
  };

  const handleEditEntry = async () => {
    //console.log(`Redirected to edit page (ID: ${id}).`);
    router.push({
      pathname: "./edit",
      params: { username, token, id },
    });
  };

  // Display the diary entry details
  return (
    <View style={styles.container}>
      <Header title="Diary Page" />
      <View style={styles.contentContainer}>
        <ScrollView>
          <Text style={styles.dateText}>
            {new Date(entry.details.date).toLocaleDateString()}
          </Text>
          <Text style={styles.titleContent}>{entry.details.diaryTitle}</Text>
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
          <View style={styles.imageUploader}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={styles.imageDisplay}
                resizeMode="cover"
              />
            ) : (
              <>
                <Image style={styles.imageIcon} />
                <Text style={styles.imageText}>No Image Available</Text>
              </>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <ReusableButton
              title="Edit"
              onPress={handleEditEntry}
              edge="edgy"
              colour="#504475"
              doubleButtons={true}
            />
            <ReusableButton
              title="Delete"
              onPress={handleDeleteEntry}
              edge="edgy"
              colour="#B11226"
              doubleButtons={true}
            />
          </View>
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 20,
  },
  contentContainer: {
    padding: 20,
    marginHorizontal: formMargin,
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
    marginBottom: 15,
  },
  infoLabel: {
    fontWeight: 500,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  imageUploader: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  imageText: {
    marginTop: -30,
    fontSize: 16,
    color: "#999",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: isSmallScreen ? "row" : "column",
    marginTop: 10,
    flex: 1,
    gap: 5,
  },
  imageDisplay: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  titleContent: {
    fontSize: 22,
    marginVertical: 10,
    lineHeight: 30,
  }
});
