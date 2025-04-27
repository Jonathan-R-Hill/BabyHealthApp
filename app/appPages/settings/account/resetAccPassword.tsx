import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "@/app/Navbar";
import Header from "@/app/Header";
import { asyncChangePassword } from "@/services/accountService";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allValid, setAllValid] = useState(false);

  // Check if new password matches confirm password and meets strength requirements
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{9,})/;
    const isPasswordStrong = passwordRegex.test(newPassword);
    setAllValid(
      isPasswordStrong &&
      newPassword === confirmPassword &&
      currentPassword.length > 0
    );
  }, [currentPassword, newPassword, confirmPassword]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    try {
      if (!token) {
        throw new Error("Missing token. Please log in again.");
      }

      const response = await asyncChangePassword(
        token as string,
        currentPassword,
        newPassword
      );

      console.log(response);

      Alert.alert("Password Changed", "Your password has been updated successfully.");
      router.replace("/loginSection/loginScreen");

    } catch (error: any) {
      console.error("Error resetting password:", error.message);
      Alert.alert("Error", error.message || "Failed to change password.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Password" />

      <View style={styles.settingOption}>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholderTextColor="#84868a"
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholderTextColor="#84868a"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#84868a"
        />

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: allValid ? "#3498db" : "#7c7d7c" },
          ]}
          onPress={handleResetPassword}
          disabled={!allValid}
        >
          <Text style={styles.actionButtonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2,
  },
});
