import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "@/app/Navbar";
import Header from "@/app/Header";
import { asyncUpdateEmail } from "@/services/accountService";

export default function UpdateEmailPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const [password, setCheckPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");

  const [allValid, setAllValid] = useState(false);

  const isEmailValid = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setAllValid(emailRegex.test(newEmail));
  };

  const handleUpdateEmail = async () => {

    console.log("update email button pressed");
    if (newEmail !== confirmNewEmail) {
      Alert.alert("Error", "Emails do not match.");
      return;
    }
    // logic

    if (username == confirmNewEmail) {
      Alert.alert("Error", "Entered same email as previous email");
      return;
    }

    if (newEmail !== confirmNewEmail) {
      Alert.alert("Error", "New email and confirm email do not match");
    }

    try {
      if (!token) {
        throw new Error("Missing token. Please log in again.");
      }

      const response = await asyncUpdateEmail(
        token as string,
        username as string,
        password as string,
        confirmNewEmail as string
      );

      console.log(response);

      Alert.alert(
        "Password Changed",
        "Your password has been updated successfully."
      );
      router.replace("/loginSection/loginScreen");
    } catch (error: any) {
      console.error("Error changing email:", error.message);

      if (error.message.includes("password")) {
        Alert.alert(
          "Incorrect Password",
          "The password you entered is incorrect. Please try again."
        );
      } else {
        Alert.alert("Error", error.message || "Failed to change email.");
      }
    }

    Alert.alert("Email Updated", "Your email has been updated successfully.");
  };

  return (
    <View style={styles.container}>
      <Header title="Change Email" />

      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Update Email</Text>

        <TextInput
          style={styles.input}
          placeholder="enter current password"
          value={password}
          onChangeText={setCheckPassword}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="new email"
          value={newEmail}
          onChangeText={setNewEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="confirm new email"
          value={confirmNewEmail}
          onChangeText={setConfirmNewEmail}
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleUpdateEmail}
        >
          <Text style={styles.actionButtonText}>Update Email</Text>
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
