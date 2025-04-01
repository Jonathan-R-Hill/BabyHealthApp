import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function CreateAccountApprovalScreen() {
  const router = useRouter();

  const redirectToLogin = () => {
    try{
        console.log("button pressed, routing to login screen");
        router.push("./loginScreen");
    }catch(error) {
        console.log("routing failure", error);
        alert("unable to send you to the login page");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        {/*Logo placement*/}
        <View style={styles.header}>
          <View style={styles.profileIcon}></View>
        </View>

        {/*Text*/}
        <View style={styles.header}>
          <Text style={styles.textTitle}>Account Created Sucessfully</Text>
        </View>

        {/*Button*/}
        <View style={styles.header}>
          <TouchableOpacity style={styles.chartButton} onPress={redirectToLogin}>
            <Text style={styles.chartButtonText}>Return To Login</Text>
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
    },
    profileIcon: {
      width: 80,
      height: 80,
      backgroundColor: "#ccc",
      borderRadius: 20,
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
    textTitle: {
      color: "#000000",
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
    },
    scrollStyle: {
      flexDirection: "column",
      width: "90%",
      maxWidth: "90%",
    },
  });