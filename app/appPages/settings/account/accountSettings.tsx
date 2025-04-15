import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Navbar";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { asyncValidateUser } from "@/services/accountService";

export default function AccountPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Nav Functions
  const changeEmail = () => {
    try {
      console.log("Update Email Nav Button Pressed");
      router.push({ pathname: "./changeEmail", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert(
        "Navigation Error",
        "Could not navigate to the Update Email page"
      );
    }
  };

  

    // Update Password
    const handleUpdatePassword = () => {
      if (newPassword !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match.");
        return;
      }
      // needs logic
      Alert.alert(
        "Password Updated",
        "Your password has been updated successfully."
      );
    };

    // logout
    const handleLogout = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              asyncValidateUser;
              router.replace("/loginSection/loginScreen");
            },
          },
        ],
        { cancelable: true }
      );
    };

    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.textTitle}>
          Account Settings
        </ThemedText>

        {/* Update Email Nav Button */}
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.actionButton} onPress={changeEmail}>
            <ThemedText style={styles.actionButtonText}>
              Update Email
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Update Password [nav button] */}
        <ThemedView style={styles.settingOption}>
          <ThemedText style={styles.settingText}>Update Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Current Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleUpdatePassword}
          >
            <ThemedText style={styles.actionButtonText}>
              Update Password
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Logout Button */}
        <ThemedView style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Navigation Bar */}
        <Navbar />
      </ThemedView>
    );
  };

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
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    settingText: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      width: "80%",
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
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
    logoutButton: {
      backgroundColor: "#e74c3c",
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
    logoutButtonText: {
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
    },
    header: {
      padding: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 2,
    },
  });

