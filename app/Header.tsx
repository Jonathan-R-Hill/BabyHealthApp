import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

export default function Header({ showLabel = false }) {
  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      {showLabel && <Text style={styles.label}>Baby Care</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    paddingVertical: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});