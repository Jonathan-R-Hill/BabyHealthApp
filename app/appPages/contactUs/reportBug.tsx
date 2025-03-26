import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../Navbar";
import { submitBug } from "../../../services/contactUsService";
import { ReusableTextInput } from "@/components/ReusableTextInputBox";

export default function reportBugMain() {
  const router = useRouter();

  const { username, token } = useLocalSearchParams();

  const [bugText, setBugText] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  const handleReportSend = async () => {
    if(errorChecking()){
    submitBug(String(username), bugText, String(token))
      .then(() => {
        console.log("Diary entry created successfully!");
      })
      .then(() => {
        router.push({
          pathname: "./developerContactUs",
          params: { username, token },
        });
      })
      .catch((error) => {
        console.error("Error creating diary entry:", error);
      });
    }
  };

  const errorChecking = () => {
    if(bugText === undefined || bugText === ""){
      setErrorMessage("Please enter text into the box");
      return false;
    };
    return true;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollStyle}>
        {/*Title Placement*/}
        <View style={styles.header}>
          <Text style={styles.textTitle}>Report bugs or issues</Text>
        </View>

        <Text style={styles.errorText}>{errorMessage}</Text>

        {/*Text Box Placement*/}
        <View style={styles.inputBoxContainer}>
          <ReusableTextInput
            placeholder="Report bugs/issues here"
            value={bugText}
            onChangeText={setBugText}
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="default"
            multiline={true}
            placeholderTextColor={"#84868a"}
            style={{height: "70%"}}
          />
          <TouchableOpacity
            style={styles.chartButton}
            onPress={handleReportSend}
          >
            <Text style={styles.chartButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  header: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  chartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: "auto",
    minHeight: 40,
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
  inputBoxContainer: {
    height: "80%",
    width: "90%",
    maxWidth: "90%",
  },
  scrollStyle: {
    flexDirection: "column",
    width: "90%",
    maxWidth: 600,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
