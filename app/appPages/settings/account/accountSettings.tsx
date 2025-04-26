import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../../Navbar";
import Header from "@/app/Header";
import { asyncValidateUser } from "@/services/accountService";
import { asyncLogoutUser } from "@/services/accountService";

export default function AccountPage() {
  const router = useRouter();
  const { username, token } = useLocalSearchParams();

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

  const changePassword = () => {
    try {
      console.log("Update Password Nav Button Pressed");
      router.push({
        pathname: "./changePassword",
        params: { username, token },
      });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert(
        "Navigation Error",
        "Could not navigate to the Update Password page"
      );
    }
  };

  // logout
  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        doLogout();
      }
    } else {
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
            onPress: doLogout,
          },
        ],
        { cancelable: true }
      );
    }
  };
  
  const doLogout = async () => {
    try {
      console.log("Logout Button Pressed");
      if (username) {
        const result = await asyncLogoutUser(username as string);
  
        if (result !== false) {
          console.log("Logout Successful");
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Header title="My Account" />

        <View style={styles.profileContainer}>
          <Image
            source={require("@/assets/images/CharlesPH.png")} // Placeholder, needs accountbound pfp
            style={styles.profileImage}
          />
          <Text style={styles.profileUsername}>{username}</Text>
        </View>

        {/* Update Email Nav Button */}
        <View style={styles.settingOption}>
          <TouchableOpacity style={styles.actionButton} onPress={changeEmail}>
            <Text style={styles.actionButtonText}>Update Email</Text>
          </TouchableOpacity>
        </View>

        {/* Update Password Nav Button */}
        <View style={styles.settingOption}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={changePassword}
          >
            <Text style={styles.actionButtonText}>Update Password</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.settingOption}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Bar */}
        <Navbar />
      </View>
    </ScrollView>
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
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
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
  },
});
