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

export default function reportBugMain() {
  const router = useRouter();

  const { username } = useLocalSearchParams();

  const [bugText, setBugText] = useState("");

  const handleReportSend = async () => {
    submitBug(String(username), bugText)
      .then(() => {
        console.log("Diary entry created successfully!");
      })
      .then(() => {
        router.push({ pathname: "./developerContactUs", params: { username } });
      })
      .catch((error) => {
        console.error("Error creating diary entry:", error);
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/*Title Placement*/}
        <View style={styles.header}>
          <Text style={styles.textTitle}>Report bugs or issues</Text>
        </View>

        {/*Text Box Placement*/}
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Report bugs/issues here"
            value={bugText}
            onChangeText={setBugText}
            autoCapitalize="none"
            autoCorrect={true}
            keyboardType="default"
            multiline={true}
            placeholderTextColor={"#84868a"}
          />
          <TouchableOpacity style={styles.chartButton} onPress={handleReportSend}>
            <Text style={styles.chartButtonText}>Send Report</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Navigation */}
        {/* <View style={styles.bottomNav}>
                  <TouchableOpacity style={styles.navButton}>
                  <Text>Diary</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navButton}>
                  <Text>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navButton}>
                  <Text>Ask our Bot</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.navButton}>
                  <Text>More Options</Text>
                  </TouchableOpacity>
              </View> */}
        <Navbar />
      </View>
    </ScrollView>
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
  },
  chartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: "auto",
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
    height: "80%",
    width: "100%",
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 16,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#e8e6e1",
    textAlign: "center",
  },
  inputBoxContainer: {
    height: "80%",
    width: "90%",
  },
});
