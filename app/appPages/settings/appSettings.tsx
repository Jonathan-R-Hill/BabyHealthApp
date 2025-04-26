import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import Header from "@/app/Header";

export default function SettingsPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
    Alert.alert(
      "Settings Updated",
      `Notifications ${!notificationsEnabled ? "enabled" : "disabled"}`
    );
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prevState) => !prevState);
    Alert.alert(
      "Settings Updated",
      `Dark Mode ${!darkModeEnabled ? "enabled" : "disabled"}`
    );
  };

  const navigateTo = (path: string) => {
    try {
      router.push({ pathname: path, params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert(
        "Navigation Error",
        "Could not navigate to the selected page"
      );
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Header title="Settings" />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Preferences Section */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>
          <View style={styles.settingOption}>
            <Text style={styles.settingText}>Enable Dark Mode</Text>
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
            />
          </View>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account & Info</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo("./aboutApp")}
          >
            <Text style={styles.actionButtonText}>About App</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo("./account/accountSettings")}
          >
            <Text style={styles.actionButtonText}>My Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo("@/appPages/contactUs/aboutUs/privacyPage")}
          >
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateTo("@/appPages/contactUs/main")}
          >
            <Text style={styles.actionButtonText}>Send Feedback</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 80 }} /> {/* Space before navbar */}
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2, // shadow on Android
    shadowColor: "#000", // shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingText: {
    fontSize: 18,
  },
  actionButton: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actionButtonText: {
    fontSize: 18,
    color: "#3498db",
  },
});
