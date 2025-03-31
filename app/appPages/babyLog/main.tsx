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

import { fetchBabies } from "../../../services/babyProfileService"; 

export interface Baby {
  _id: string;
  details: { userId: string; babyId: number; }
  data: {
  name: string;
  gender: string;
  dateOfBirth: Date;
  weight: number;
  }
}

export default function CreateBaby() {
  const router = useRouter();
  const [babies, setBabies] = useState<Baby[]>([]);
  const { username, token } = useLocalSearchParams();

  const getBabies = async (username: string, token: string) => {
    try {
      const data: Baby[] = await fetchBabies(username, token);
      console.log("Fetched data", data);
      console.log("Fetched data:", JSON.stringify(data, null, 2));
      setBabies(data.map(baby => ({
        ...baby,
        ...baby.data
      })));
    } catch (error) {
      Alert.alert("Error.", "Could not load Babies")
    }
  };

  // Fetch Baby/Babies when username is available
  useEffect(() => {
    if (username) {
      getBabies(String(username), String(token))
    }
  }, [username, token]);

  // Navigate to create baby page
  const handleNavigateToCreate = () => {
    if (username) {
      router.push({
        pathname: "./create",
        params: { username, token },
      });
    } else {
      Alert.alert("Error,", "Username not available")
    }
  };

  // Navigate to update baby page
  const handleNavigateToUpdate = (babyId: number) => {
    if (username) {
      router.push({
        pathname: "./update",
        params: {id: babyId.toString(), username, token },
      });
    } else {
      Alert.alert("Error,", "Username not available")
    }
  };

  // Navigate to view baby page
  const handleNavigateToView = (babyId: number) => {
    if (username) {
      router.push({
        pathname: "./view",
        params: {id: babyId.toString(), username, token},
      });
    } else {
      Alert.alert("Error,", "Username not available")
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Baby Profile"/>
      <ScrollView style={styles.babyContainer}>
        {/* Button to create a new baby */}
        <TouchableOpacity
          onPress={handleNavigateToCreate}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Create a new baby</Text>
        </TouchableOpacity>
  
        {/* Display babies */}
      {babies && babies.length > 0 ? (
        babies.map((baby) => (
          <View key={baby.details.babyId} style={styles.babyCard}>
            <Text style={styles.babyName}>{baby.data.name}</Text>
            <Text style={styles.babyDetails}>
              {baby.data.gender} - {new Date(baby.data.dateOfBirth).toLocaleDateString()}
            </Text>

            {/* Buttons for actions */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleNavigateToView(baby.details.babyId)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleNavigateToUpdate(baby.details.babyId)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noBabiesText}>No babies available.</Text>
      )}
      </ScrollView>
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

  babyContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  
  babyCard: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  
  babyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  
  babyDetails: {
    fontSize: 14,
    color: "#555",
  },
  
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  
  actionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noBabiesText: {
    color: "#fff",
    fontSize: 16,
  },
});