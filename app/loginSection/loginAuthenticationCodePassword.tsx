import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { asyncValidateAuthCode } from "../../services/loginService";

export default function authenticationPage() {
    const router = useRouter();
    let [authCode, setAuthCode] = useState("");
    let [displayMessage, setDisplayMessage] = useState("");
    let [userEmail, setUserEmail] = useState("");

    const handleAuthCode = async () => {
        //pass auth code entered to service, then to backend, result is bool from comparison
        //if true, success, if not give them another try (displaying error message) or send them back to the page they came from
        //const response = await asyncValidateAuthCode(user, authCode); currently there is no email auth for this page
        const response = true;
        if(response) //if the response is true
        {
          router.push({pathname: './resetPassword', params: {userEmail}});
        }
        else
        {
          setDisplayMessage("Please enter a valid code");
        }
    }

    const handleBackToLogin = () => {
        console.log("Back To Login");
        router.push("./loginScreen");
      }

    return (
        <View style={styles.container}>
            <ScrollView>
                {/*Logo placement*/}
                <View style={styles.header}>
                <View style={styles.profileIcon}></View>
                </View>

                {/*Enter Email Again*/}
                <View style={styles.header}>
                    <Text style={styles.warning}>{displayMessage}</Text>
                    <Text style={styles.label}>Enter Your Email Again</Text>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Email Here"
                    value={userEmail}
                    onChangeText={setUserEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    placeholderTextColor={"#84868a"}
                    />
                </View>

                {/*Enter Auth Code*/}
                <View style={styles.header}>
                    <Text style={styles.warning}>{displayMessage}</Text>
                    <Text style={styles.label}>Enter Authentication Code</Text>
                    <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Code Here"
                    value={authCode}
                    onChangeText={setAuthCode}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    placeholderTextColor={"#84868a"}
                    />
                </View>

                {/*Submit Code Button*/}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.chartButton} onPress={handleAuthCode}>
                    <Text style={styles.chartButtonText}>Submit Code</Text>
                    </TouchableOpacity>
                </View>

                {/*Go Back To Login Button*/}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.chartButton} onPress={handleBackToLogin}>
                    <Text style={styles.chartButtonText}>Back To Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    header: {
      padding: 10,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      maxWidth: 600,
    },
  profileIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 20,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
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
  warning: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "bold",
    color: "red",
  },
});