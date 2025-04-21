import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Navbar";
import { asyncValidateUser } from "@/services/accountService";

export default function AccountPage() {

  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


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