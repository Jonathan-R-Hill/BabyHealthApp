import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { asyncCreateNewUser } from "../../services/loginService";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";
import { ReusableButton } from "@/components/ReusableButton";

const { width: screenWidth } = Dimensions.get("window");
const isSmallScreen = screenWidth <= 850;
const formMargin = isSmallScreen ? "3%" : "20%";

export default function CreateAccountScreen() {
  let [createEmail, setNewEmail] = useState("");
  let [createPassword, setNewPassword] = useState("");
  let [confirmPassword, setConfirmedPassword] = useState("");
  let [displayMessage, setDisplayMessage] = useState("");
  let [allValid, setAllValid] = useState(false);
  let [validPassword, setValidPassword] = useState(false);
  let [confirmEmail, setConfirmedEmail] = useState("");
  let [emailDisplayMessage, setEmailDisplayMessage] = useState("");

  const router = useRouter();

  const createNewAccount = async () => {
    try {
      //console.log("Email:", createEmail, "Password:", confirmPassword);

      const result = await asyncCreateNewUser(createEmail, confirmPassword);

      if (result) {
        //console.log("Account created successfully:", result);
        //send to auth code, then to created sucessfully
        router.push({pathname: './loginAuthenticationCodeEmail'}); //must go to auth code page first
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
        passwordRegex.test(confirmPassword) &&
        emailDisplayMessage === "Emails match!" &&
        emailRegex.test(confirmEmail)
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
  }, [createEmail, displayMessage, confirmPassword, confirmEmail, emailDisplayMessage]);

  useEffect(() => {
    if (createPassword && confirmPassword) {
      if (createPassword === confirmPassword) {
        setDisplayMessage("Passwords match!");
      } else {
        setDisplayMessage("The passwords do not match");
      }
    }
  }, [createPassword, confirmPassword]);

  useEffect(() => {
    if (createEmail && confirmEmail) {
      if (createEmail === confirmEmail) {
        setEmailDisplayMessage("Emails match!");
      } else {
        setEmailDisplayMessage("The emails do not match");
      }
    }
  }, [createEmail, confirmEmail]);

  const handleGoBackToLogin = () => {
    try {
      //console.log("button pressed");
      router.push("./loginScreen");
    } catch (error) {
      console.error("Error Navigating", error);
      Alert.alert("Error navigating back to login screen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>

        {/*Input Boxes*/}
        <View style={styles.header}>
          <View style={styles.innerHeader}>
            {/*Enter Email*/}
            <ReusableTextInputAnimated 
              title="Email"
              placeholder="Enter Email"
              value={createEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={"#84868a"}
            />
          </View>
          
          {/*Enter Confirm Email*/}
          <Text style={styles.warning}>{emailDisplayMessage}</Text>
          <View style={styles.innerHeader}>
            <ReusableTextInputAnimated 
              title="Confirm Email"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChangeText={setConfirmedEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor={"#84868a"}
            />
          </View>

          {/*Enter Password*/}
          <View style={styles.innerHeader}>
            <ReusableTextInputAnimated 
              title="Password"
              placeholder="Password"
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
            <ReusableTextInputAnimated 
              title="Confirm Password"
              placeholder="Confirm Password"
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
          <Text style={styles.warning}>
            {validPassword
              ? "Password is up to safety standards"
              : "Password must contain: 8 characters, a capital, a number and a special character (eg: @,>]"}
          </Text>
        </View>
        

        {/*Create Account Button*/}
        <View style={styles.textHeader}>
          <ReusableButton 
            title="Create Account"
            colour={allValid ? "#65558F" : "#7c7d7c"}
            onPress={createNewAccount}
            disabled={!allValid}
          />
        </View>

        {/*Go Back Button*/}
        <View style={styles.textHeader}>
          <ReusableButton 
            title="Go back to login"
            onPress={handleGoBackToLogin}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: formMargin,
    backgroundColor: "#fff",
  },
  scrollStyle: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  innerHeader: {
    width: "100%",
    marginBottom: 15,
  },
  textHeader: {
    width: "100%",
    marginTop: 10,
    // alignItems: "center",
  },
  warning: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
