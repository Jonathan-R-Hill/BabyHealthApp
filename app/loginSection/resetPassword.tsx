import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { setParams } from "expo-router/build/global-state/routing";
import { asyncResetPassword } from "../../services/loginService";

export default function resetPassword(){
    const router = useRouter();
    let [newPassword, setNewPassword] = useState("");
    let [confirmPassword, setConfirmedPassword] = useState("");
    let [displayMessage, setDisplayMessage] = useState("");
    let [allValid, setAllValid] = useState(false);
    let [validPassword, setValidPassword] = useState(false);
    const { username } = useLocalSearchParams();
    const user = String(username);
    

    const handleResetPassword = async () => {
        try {
            console.log("Email: ", user);
            console.log("New password: ", newPassword);
            const response = await asyncResetPassword( user, newPassword);
            console.log(response);
            if(allValid && response) //all valid AND result of backend true
            {
              router.setParams({userEmail: undefined});
              router.push("./loginScreen");
            }
            else{

            }
        }catch(error: any)
        {
            console.error("Error resetting password:", error.message);
            alert("An error occurred while resetting your password. Please try again.");
        }
    }

    const areAllValid = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{9,})/;
        setAllValid(
            displayMessage === "Passwords match!" &&
            passwordRegex.test(confirmPassword)
        );
      };

    const isPasswordValid = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{9,})/;
        setValidPassword(passwordRegex.test(newPassword));
      };
    
      useEffect(() => {
        isPasswordValid();
      }, [newPassword]);
    
      useEffect(() => {
        areAllValid();
      }, [displayMessage, confirmPassword]);
    
      useEffect(() => {
        if (newPassword && confirmPassword) {
          if (newPassword === confirmPassword) {
            setDisplayMessage("Passwords match!");
          } else {
            setDisplayMessage("The passwords do not match");
          }
        }
      }, [newPassword, confirmPassword]);
    
    return (
        <View style={styles.container}>
        <ScrollView style={styles.scrollStyle}>
            {/*Title Text*/}
            <View style={styles.textHeader}>
            <Text style={styles.textTitle}>Reset Password</Text>
            </View>
    
            {/*Input Boxes*/}
            <View style={styles.header}>
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
                value={newPassword}
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
                onPress={handleResetPassword}
                disabled={!allValid}
            >
                <Text style={styles.chartButtonText}>Reset Password</Text>
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