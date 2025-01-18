import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { asyncLogin } from "../../services/loginService";

const LoginScreen = () => {
  const [username, setUsername] = useState(""); // State to hold the username input
  const [password, setPassword] = useState(""); // State to hold the password input
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log("Username:", username, "Password:", password); // Log credentials for debugging
      const response = await asyncLogin(username, password); // Await the login service
      console.log("Login successful:", response); // You can check what is returned by the API
      router.push("../appPages/diary/main"); // Navigate to the main diary page after successful login
    } catch (error: any) {
      console.error("Login failed:", error.message); // Handle login errors here
    }
  };

  const handleCreateAccount = () => {
    router.push("./createAccount");
  };

  const handleForgotPassword = () => {
    router.push("./forgotPassword");
  };

  return (
    <View style={styles.container}>
      {/* Username Input */}
      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry // Hides the text
      />

      {/* Login Button */}
      <Button title="Login" onPress={handleLogin} />

      {/* Links for "Create Account" and "Forgot Password" */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#007BFF", // A blue color for links
    marginVertical: 4,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
