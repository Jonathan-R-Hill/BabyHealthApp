import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { ReusableButton } from "@/components/ReusableButton";
import { ReusableTextInput } from "@/components/ReusableTextInputBox";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";
import { asyncLogin, asyncValidateUser } from "../../services/loginService";
import { Divider } from "@/components/Divider";

const { width: screenWidth } = Dimensions.get("window");
const isLargeScreen = screenWidth > 1200;

const LoginScreen = () => {
  const [username, setUsername] = useState("test@test.test"); // Pre-fill with test username
  const [password, setPassword] = useState("Testdata1!"); // Pre-fill with test password
  let [invalidLoginError, setInvalidLoginError] = useState(false); //assume the login does not require an error message
  let [allValid, setAllValid] = useState(false); //assume nothing is valid to begin with

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

  const handleVerifyAccount = () => {
    router.push("./loginAuthenticationCodeEmail");
  };

  const areAllValid = () => {
    setAllValid(username !== "" && password !== "");
  };

  useEffect(() => {
    areAllValid();
  }, [username, password]);

  return (
    <View style={styles.container}>
      {/* App Title */}
      <Text style={styles.titleContainer}>
        <Text style={styles.titleLine}>
          <Text style={styles.titleMini}>M</Text>
          <Text style={styles.titleMiniAccent1}>i</Text>
          <Text style={styles.titleMini}>n</Text>
          <Text style={styles.titleMiniAccent2}>i</Text>
        </Text>
        {"\n"}
        <Text style={styles.titleMoments}>Moments</Text>
      </Text>

      {/*Login Error Message*/}
      <Text style={styles.warning}>
        {invalidLoginError
          ? "Error Logging In. Please re-enter and double check your details when entered"
          : ""}
      </Text>

      {/* Username Input */}
      <ReusableTextInputAnimated
        title="Username"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Password Input */}
      <ReusableTextInputAnimated
        title="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry // Hides the text
        style={styles.moreMargin}
      />

      {/* Login Button */}
      <ReusableButton title="Login" onPress={handleLogin} />

      {/* Links for "Create Account" and "Forgot Password" */}
      <View style={styles.linksContainer}>
        <Text style={styles.nonLinkText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleCreateAccount}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgotten your password?</Text>
        </TouchableOpacity>
        <Text style={styles.linkText}>|</Text>
        <TouchableOpacity onPress={handleVerifyAccount}>
          <Text style={styles.linkText}>Verify your account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    marginTop: -90,
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  titleContainer: {
    textAlign: isLargeScreen ? "center" : "left",
    alignSelf: isLargeScreen ? "center" : "flex-start",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    lineHeight: 80, // Controlling line height
  },
  titleLine: {
    fontSize: 65,
    display: "flex",
  },
  titleMini: {
    color: "#6B46C1",
    fontWeight: "bold",
    fontSize: 65,
  },
  titleMiniAccent1: {
    color: "#CC47A6",
    fontWeight: "bold",
    fontSize: 65,
  },
  titleMiniAccent2: {
    color: "#4E47CC",
    fontWeight: "bold",
    fontSize: 65,
  },
  titleMoments: {
    color: "#6B46C1",
    fontWeight: "bold",
    fontSize: 65,
    lineHeight: 70, // Control vertical spacing
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 14,
    marginHorizontal: 10,
    alignItems: "center",
  },
  linkText: {
    fontSize: 14,
    color: "#6B46C1", // A blue color for links
    marginVertical: 5,
    marginHorizontal: 5,
    // textDecorationLine: "underline", //fuck that shit
  },
  nonLinkText: {
    fontSize: 14,
    marginVertical: 4,
    marginHorizontal: 5,
  },
  warning: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  moreMargin: {
    marginBottom: 10,
  },
});

export default LoginScreen;
