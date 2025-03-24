import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import { orgData } from "./orgData";

export default function AdditionalOrgs() {
  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Organisations</Text>

      {/* Organisation List */}
      <FlatList
        data={orgData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.orgName}>{item.orgName}</Text>
            <Text style={styles.orgDesc}>{item.orgDesc}</Text>

            {item.orgPhone && (
              <Text style={styles.orgDetails}>Helpline: {item.orgPhone}</Text>
            )}

            <TouchableOpacity onPress={() => handlePress(item.orgLink)}>
              <Text style={styles.linkText}>{item.orgLink}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Navbar */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingVertical: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A4A4A",
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  orgName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  orgDesc: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  orgDetails: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  linkText: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

