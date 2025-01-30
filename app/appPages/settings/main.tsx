import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../Navbar";

export default function SettingsPage() {
  const router = useRouter();

  const { username, token } = useLocalSearchParams();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const isDarkMode = useColorScheme() === "dark";

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
      `Dark mode ${!darkModeEnabled ? "enabled" : "disabled"}`
    );
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

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Settings</Text>

      {/* Settings Options */}
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Enable Dark Mode</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>

      <View style={styles.header}>
        <TouchableOpacity style={styles.actionButton} onPress={aboutApp}>
          <Text style={styles.actionButtonText}>About App</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textTitle: {
    color: "#000000",
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
    color: "#333",
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
