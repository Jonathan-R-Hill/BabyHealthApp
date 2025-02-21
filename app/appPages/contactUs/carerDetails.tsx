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
import { getSingleCarer } from "../../../services/contactUsService";

interface Carers {
    technicalDetails: {
        entry_id: number //unique identifier for the carer
        user_id: string //unique identifier for the user
    };
    carerData: {
        firstName: string 
        surname: string
        title: string //title such as Sir, Dr, Mr, Miss, ect
        phoneNumber: string
        email: string
    }
}

export default function DiaryEntryDetails() {
  const router = useRouter();
  const { entry_id, username, token } = useLocalSearchParams();
  const [carer, setCarer] = useState<Carers | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDiaryEntry = async (
    username: string,
    entry_id: number,
    token: string
  ) => {
    try {
      const data: Carers = await getSingleCarer(
        username,
        String(token),
        entry_id
      );
      if (data) {
        setCarer(data);
      } else {
        Alert.alert("Error", "Carer not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load the Carer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entry_id && username) {
      fetchDiaryEntry(String(username), parseInt(String(entry_id)), String(token));
    }
  }, [entry_id, username]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5A4FCF" />
        <Navbar />
      </View>
    );
  }

  if (!carer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Carer not found.</Text>
        <Navbar />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Current Carer</Text>
        <Text style={styles.content}>{carer.carerData.title + carer.carerData.surname + "("+carer.carerData.firstName+")"}</Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Phone Number </Text>
          {carer.carerData.phoneNumber}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.infoLabel}>Email </Text>
          {carer.carerData.email}
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
  title: {
    fontSize: 32,
    marginBottom: 5,
    fontWeight: "bold",
  }
});
