import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { asyncLogin, asyncValidateUser } from "../../services/loginService";

const LoginScreen = () => {
  const [username, setUsername] = useState("test@test.test"); // Pre-fill with test username
  const [password, setPassword] = useState("Testdata1!"); // Pre-fill with test password
  let [invalidLoginError, setInvalidLoginError] = useState(false); //assume the login does not require an error message
  let [allValid, setAllValid] = useState(false) //assume nothing is valid to begin with
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log("Username:", username, "Password:", password);

      // Await the login service
      const token = await asyncValidateUser(username, password);

      console.log("Login successful:", token);

      // After successful login, navigate to the main diary page
      router.push({
        pathname: "../appPages/diary/main",
        params: { username, token },
      });
    } catch (error: any) {
      console.error("Login failed:", error.message);
      setInvalidLoginError(true);
    }
  };

  const handleCreateAccount = () => {
    router.push("./createAccount");
  };

  const handleForgotPassword = () => {
    router.push("./forgotPassword");
  };

  const areAllValid = () => {
    setAllValid(username !== "" && password !== "")
  }

  useEffect(() => {
      areAllValid();
    }, [username, password]);

  return (
    <View style={styles.container}>
      {/*Login Error Message*/}
      <Text style={styles.warning}>{invalidLoginError 
        ? "Error Logging In. Please re-enter and double check your details when entered" : 
        ""}</Text>

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
      <Button title="Login" onPress={handleLogin} color= {allValid ? "#3498db" : "#7c7d7c"} disabled={!allValid}/>

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
  warning: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "red",
  },
});

export default LoginScreen;
