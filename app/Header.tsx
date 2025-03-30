import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  title?: string;
  onBackPress?: () => void; // Optional function to run when back button is pressed
  // The `() => void` means a function that takes no arguments and doesn't return anything
};

const router = useRouter();

export default function Header({ title = "Chage this to the page title", onBackPress = router.back }: HeaderProps) {
  
  // Get the height of the status bar only if the platform is Android (iOS handles this differently)
  // If StatusBar.currentHeight is undefined (rare), fall back to 0
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  return (
    // Outer container of the header, with extra top padding for status bar space
    <View style={[styles.headerContainer, { paddingTop: statusBarHeight}]}>
      <StatusBar backgroundColor="#65558F" barStyle="light-content" />
      
      <View style={styles.contentRow}>
        {onBackPress ? (//if onBackPress is passed on...
          <TouchableOpacity onPress={onBackPress} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}

        {/* Show the title text in the centre */}
        {/* numberOfLines={1} makes sure the title stays on one line */}
        {/* ellipsizeMode="tail" adds "..." if the title is too long */}
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">{title}</Text>

        {/* Spacer to balance layout */}
        <View style={styles.backButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#65558F",
    // paddingVertical: 30, 
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  backButton: {
    paddingLeft: 12,
    width: 40,
  },
  titleText: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    // fontWeight: "bold",
    fontWeight: 600,
  },
});