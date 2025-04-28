import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "@/app/Navbar";
import Header from "@/app/Header";
import { asyncUpdateEmail } from "@/services/accountService";

export default function UpdateEmailPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [allValid, setAllValid] = useState(false);
  const [emailStrength, setEmailStrength] = useState("");

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(newEmail);

    if (!isEmailValid) {
      setEmailStrength("Invalid Email");
    } else {
      setEmailStrength("Valid Email");
    }

    setAllValid(
      password.length > 0 &&
        isEmailValid &&
        newEmail === confirmNewEmail &&
        newEmail !== username
    );
  }, [password, newEmail, confirmNewEmail]);

  const handleUpdateEmail = async () => {
    if (newEmail !== confirmNewEmail) {
      Alert.alert("Error", "New email and confirm email do not match.");
      return;
    }
    if (username === newEmail) {
      Alert.alert("Error", "Entered same email as current email.");
      return;
    }

    try {
      if (!token) {
        throw new Error("Missing token. Please log in again.");
      }

      setLoading(true);

      const response = await asyncUpdateEmail(
        token as string,
        username as string,
        password as string,
        newEmail as string
      );

      //console.log(response);

      setLoading(false);
      Alert.alert("Email Updated", "Your email has been updated successfully.");
      router.replace("/loginSection/loginScreen");
    } catch (error: any) {
      console.error("Error updating email:", error.message);
      setLoading(false);

      if (error.message.includes("password")) {
        Alert.alert(
          "Incorrect Password",
          "The password you entered is incorrect. Please try again."
        );
      } else {
        Alert.alert("Error", error.message || "Failed to update email.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Change Email" />

      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Update Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          placeholderTextColor="#a1a1a1"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="New Email"
          placeholderTextColor="#a1a1a1"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Email"
          placeholderTextColor="#a1a1a1"
          value={confirmNewEmail}
          onChangeText={setConfirmNewEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {newEmail.length > 0 && (
          <Text
            style={[
              styles.strengthText,
              { color: emailStrength === "Valid Email" ? "green" : "red" },
            ]}
          >
            {emailStrength}
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: allValid ? "#3498db" : "#7c7d7c" },
          ]}
          onPress={handleUpdateEmail}
          disabled={!allValid || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.actionButtonText}>Update Email</Text>
          )}
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
    color: "#000",
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
  strengthText: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
