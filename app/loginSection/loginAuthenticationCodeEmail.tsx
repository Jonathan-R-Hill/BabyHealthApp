import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { asyncValidateAuthCode } from "../../services/loginService";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";
import { ReusableButton } from "@/components/ReusableButton";

const { width: screenWidth } = Dimensions.get("window");
const isSmallScreen = screenWidth <= 850;
const formMargin = isSmallScreen ? "3%" : "20%";

export default function authenticationPage() {
    const router = useRouter();
    let [authCode, setAuthCode] = useState("");
    let [displayMessage, setDisplayMessage] = useState("");
    let [userEmail, setUserEmail] = useState("");

    const handleAuthCode = async () => {
        //pass auth code entered to service, then to backend, result is bool from comparison
        //if true, success, if not give them another try (displaying error message) or send them back to the page they came from
        const response = await asyncValidateAuthCode(userEmail, authCode);
        if(response) //if the response is true
        {
          router.push({pathname: './createdAccountSucessfully', params: {userEmail}});
        }
        else
        {
          setDisplayMessage("Please enter a valid code and email");
        }
    }

    const handleBackToLogin = () => {
        //console.log("Back To Login");
        router.push("./loginScreen");
      }

    return (
        <View style={styles.container}>
            <ScrollView>
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
                    
              <ReusableTextInputAnimated 
                title="Authentication Code"
                placeholder="Authentication Code"
                value={authCode}
                onChangeText={setAuthCode}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                placeholderTextColor={"#84868a"}
              />

              <Text style={styles.warning}>{displayMessage}</Text>

              {/*Submit Code Button*/}
              <ReusableButton 
                title="Authenticate"
                onPress={handleAuthCode}
              />

              <ReusableButton 
                title="Back to login"
                onPress={handleBackToLogin}
              />
            </ScrollView>
        </View>
    )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    paddingHorizontal: formMargin,
    paddingTop: 300
  },
  header: {
    // padding: 10,
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "center",
    // width: "100%",
    // maxWidth: 600,
  },
  // profileIcon: {
  //   width: 80,
  //   height: 80,
  //   backgroundColor: "#ccc",
  //   borderRadius: 20,
  // },
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