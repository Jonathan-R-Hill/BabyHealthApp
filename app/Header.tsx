import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <StatusBar backgroundColor="#3498db" barStyle="light-content" />
      <Text style={styles.headerText}>Baby Care</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;