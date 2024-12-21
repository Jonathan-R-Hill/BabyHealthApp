import React, { useState } from "react";
import { StyleSheet, Platform, TextInput, Button, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const LoginScreen = () => {
  const [username, setUsername] = useState(""); // State to hold the username input

  const handleLogin = () => {
    console.log("Username:", username); // Handle login logic
  };

  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">User Name</ThemedText>
      <TextInput
        style={styles.inputBox}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="default"
      />
      <Button title="Login" onPress={handleLogin} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    padding: 20,
    justifyContent: "center",
  },
  inputBox: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
});

export default LoginScreen;
