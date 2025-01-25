import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { asyncCreateNewUser } from "../../services/loginService";

export default function CreateAccountScreen() {
  let [createEmail, setNewEmail] = useState("");
  let [createPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmedPassword] = useState("");
  let [displayMessage, setDisplayMessage] = useState("");
  let [allValid, setAllValid] = useState(false);
  let [validPassword, setValidPassword] = useState(false);

  const router = useRouter();

  const createNewAccount = async () => {
    try {
      console.log("Email:", createEmail, "Password:", confirmPassword);

      const result = await asyncCreateNewUser(createEmail, confirmPassword);

      if (result) {
        console.log("Account created successfully:", result);
        router.push("./createdAccountSucessfully");
      } else {
        console.error("Failed to create account. User might already exist.");
        alert(
          "An account with this email already exists. Please try logging in."
        );
      }
    } catch (error: any) {
      console.error("Error creating account:", error.message);
      alert("An error occurred while creating your account. Please try again.");
    }
  };

  const areAllValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{9,})/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setAllValid(
      emailRegex.test(createEmail) &&
        displayMessage === "Passwords match!" &&
        passwordRegex.test(confirmPassword)
    );
  };

  const isPasswordValid = () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{9,})/;
    setValidPassword(passwordRegex.test(createPassword));
  };

  useEffect(() => {
    isPasswordValid();
  }, [createPassword]);

  useEffect(() => {
    areAllValid();
  }, [createEmail, displayMessage, confirmPassword]);

  useEffect(() => {
    if (createPassword && confirmPassword) {
      if (createPassword === confirmPassword) {
        setDisplayMessage("Passwords match!");
      } else {
        setDisplayMessage("The passwords do not match");
      }
    }
  }, [createPassword, confirmPassword]);

  const handleGoBackToLogin = () => {
    try {
      console.log("button pressed");
      router.push("./loginScreen");
    } catch (error) {
      console.error("Error Navigating", error);
      Alert.alert("Error navigating back to login screen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        {/*Title Text*/}
        <View style={styles.textHeader}>
          <Text style={styles.textTitle}>Create Account</Text>
        </View>

        {/*Input Boxes*/}
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            {/*Enter Email*/}
            <Text style={styles.label}>Enter Email</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Email Here"
              value={createEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={"#84868a"}
            />
          </View>

          
            {/*Enter Password*/}
            <Text style={styles.warning}>
              {validPassword
                ? "Password is up to safety standards"
                : "Password must contain: 8 characters, a capital, a number and a special character (eg: @,>]"}
            </Text>
            <View style={styles.innerHeader}>
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Password Here"
              value={createPassword}
              onChangeText={(newText) => {
                setNewPassword(newText); // Update state
              }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={"#84868a"}
              secureTextEntry={true}
              contextMenuHidden={true} //apparently does not work on android
            />
          </View>

          
            {/*Enter Confirm Password*/}
            <Text style={styles.warning}>{displayMessage}</Text>
          <View style={styles.innerHeader}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Password Here"
              value={confirmPassword}
              onChangeText={(newText) => {
                setConfirmedPassword(newText); // Update state
              }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={"#84868a"}
              secureTextEntry={true}
              contextMenuHidden={true} //apparently does not work on android
            />
          </View>
        </View>

        {/*Create Account Button*/}
        <View style={styles.textHeader}>
          <TouchableOpacity
            style={[
              styles.chartButton,
              { backgroundColor: allValid ? "#3498db" : "#7c7d7c" },
            ]}
            onPress={createNewAccount}
            disabled={!allValid}
          >
            <Text style={styles.chartButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        {/*Go Back Button*/}
        <View style={styles.textHeader}>
          <TouchableOpacity
            style={styles.chartButton}
            onPress={handleGoBackToLogin}
          >
            <Text style={styles.chartButtonText}>Go Back To Login Page</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  scrollStyle: {
    flexDirection: "column",
  },
  header: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  innerHeader: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    flex: 3,
  },
  textHeader: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
  },
  chartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  chartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textTitle: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputBox: {
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#e8e6e1",
    textAlign: "center",
    width: 300,
    maxWidth: 400,
  },
  inputBoxContainer: {
    height: "80%",
    width: "90%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
    color: "red",
    maxHeight: "10%",
    maxWidth: "100%",
    flex: 1,
  },
});
