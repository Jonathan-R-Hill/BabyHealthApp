import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function forgotPasswordPage() {
    const router = useRouter();
    let [userEmail, setUserEmail] = useState("");
    let [allValid, setAllValid] = useState(false);
    let [displayMessage, setDisplayMessage] = useState("");

    const submitPasswordReset = () => {
        if(allValid)
        {
          console.log("user resetting password", userEmail);
          const username = String(userEmail);
          console.log(username);
          router.push({pathname: './resetPassword', params: {username}}); //must go to auth code page first
        }
        else{
          setDisplayMessage("Please enter a valid email");
        }
    };

    const handleBackToLogin = () => {
      console.log("Back To Login");
      router.push("./loginScreen");
    }

    const isEmailValid = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setAllValid(emailRegex.test(userEmail));
    }

    useEffect(() => {
        isEmailValid();
      }, [userEmail]);

    return (
      <View style={styles.container}>
        <ScrollView>
          {/*Logo placement*/}
          <View style={styles.header}>
            <View style={styles.profileIcon}></View>
          </View>

          {/*Enter Email*/}
          <View style={styles.header}>
              <Text style={styles.warning}>{displayMessage}</Text>
              <Text style={styles.label}>Enter Email</Text>
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

            {/*Submit Password Request Button*/}
            <View style={styles.header}>
              <TouchableOpacity style={styles.chartButton} onPress={submitPasswordReset}>
                <Text style={styles.chartButtonText}>Submit Password Change Request</Text>
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
    );
}

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

