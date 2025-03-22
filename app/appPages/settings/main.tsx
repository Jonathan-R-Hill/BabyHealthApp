import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Switch,
  Alert
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"

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
  };

  const aboutApp = () => {
    try {
      console.log("About App Button Pressed");
      router.push({ pathname: "./aboutApp", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert(
        "Navigation Error",
        "Could not navigate to the About App page"
      );
    }
  };

  const accountSettings = () => {
    try {
      console.log("Account Settings Button Pressed");
      router.push({ pathname: "./account", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert(
        "Navigation Error",
        "Could not navigate to the Account Settings page"
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.textTitle}>
        Settings
      </ThemedText>

      {/* Settings Options */}
      <ThemedView style={styles.settingOption}>
        <ThemedText style={styles.settingText}>Enable Notifications</ThemedText>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </ThemedView>
      <ThemedView style={styles.settingOption}>
        <ThemedText style={styles.settingText}>Enable Dark Mode</ThemedText>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </ThemedView>

      {/* AboutApp nav button */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.actionButton} onPress={aboutApp}>
          <ThemedText style={styles.actionButtonText}>About App</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Account Settings Nav Button */}
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.actionButton} onPress={accountSettings}>
          <ThemedText style={styles.actionButtonText}>My Account</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Navigation Bar */}
      <Navbar />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingText: {
    fontSize: 18,
  },
  header: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2,
  },
  actionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 50,
    width: "80%",
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});
