import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Navbar";
import Header from "@/app/Header";
import { asyncLogoutUser } from "@/services/accountService";

export default function AccountPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const changeEmail = () => {
    try {
      router.push({ pathname: "./changeEmail", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to Update Email page");
    }
  };

  const changePassword = () => {
    try {
      router.push({ pathname: "./changePassword", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to Update Password page");
    }
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) doLogout();
    } else {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Logout", style: "destructive", onPress: doLogout },
        ],
        { cancelable: true }
      );
    }
  };

  const doLogout = async () => {
    try {
      if (username) {
        const result = await asyncLogoutUser(username as string);
        if (result !== false) {
          router.replace("/loginSection/loginScreen");
        } else {
          Alert.alert("Failed to Logout", "Unable to properly logout");
        }
      } else {
        console.error("No username found");
        Alert.alert("Failed to Logout", "No username found");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Logout Error", "An unexpected error occurred");
    }
  };

  return (
    <View style={styles.pageContainer}>
      <Header title="My Account" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={require("@/assets/images/CharlesPH.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileUsername}>{username}</Text>
        </View>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={changeEmail}>
            <Text style={styles.actionButtonText}>Update Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={changePassword}>
            <Text style={styles.actionButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        {/* Actions Section */}
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} /> {/* Padding to avoid overlap with Navbar */}
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
    marginBottom: 10,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
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
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
