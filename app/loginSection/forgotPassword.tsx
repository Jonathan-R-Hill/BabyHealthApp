import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { asyncSendCodePassword } from "../../services/loginService";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";
import { ReusableButton } from "@/components/ReusableButton";

const { width: screenWidth } = Dimensions.get("window");
const isSmallScreen = screenWidth <= 850;
const formMargin = isSmallScreen ? "3%" : "20%";

export default function forgotPasswordPage() {
    const router = useRouter();
    let [userEmail, setUserEmail] = useState("");
    let [allValid, setAllValid] = useState(false);
    let [displayMessage, setDisplayMessage] = useState("");

    const submitPasswordReset = async () => {
        if(allValid)
        {
          //console.log("user resetting password", userEmail);
          const username = String(userEmail);
          //console.log(username);
          const response = await asyncSendCodePassword(username);
          if(response)
          {
            router.push({pathname: './loginAuthenticationCodePassword', params: {username}}); //must go to auth code page first
          }
          else {
            alert("An error occurred while resetting your password. Please try again.");
          }
        }
        else{
          setDisplayMessage("Please enter a valid email");
        }
    };

    const handleBackToLogin = () => {
      //console.log("Back To Login");
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
          {/* <View style={styles.header}>
            <View style={styles.profileIcon}></View>
          </View> */}

          <Text style={styles.warning}>{displayMessage}</Text>
          <ReusableTextInputAnimated 
            title="Email"
            placeholder="Enter Email Here"
            value={userEmail}
            onChangeText={setUserEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            placeholderTextColor={"#84868a"}
          />
        
          {/*Submit Password Request Button*/}
          <ReusableButton 
            title="Submit password update"
            onPress={submitPasswordReset}
          />

          <ReusableButton 
            title="Back To Login"
            onPress={handleBackToLogin}
          />
          
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      // alignItems: "center",
      paddingHorizontal: formMargin,
      paddingTop: 350,
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
    backgroundColor: "#65558F",
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

