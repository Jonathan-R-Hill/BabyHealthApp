import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../Navbar";
import Header from "@/app/Header";

export default function DevContactMain() {
  const router = useRouter();

  const { username, token } = useLocalSearchParams();

  const reportBug = () => {
    try {
      //console.log("Report Bug Button Pressed");
      router.push({ pathname: "./reportBug", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  const requestFeature = () => {
    try {
      //console.log("Request Feature Button Pressed");
      router.push({
        pathname: "./requestFeature",
        params: { username, token },
      });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  const discordServer = () => {
    try {
      //console.log("Button Pressed");
      router.push("./discordServer"); //note this may be an actual link to a discord server in the future
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  const gitHub = () => {
    try {
      //console.log("Button Pressed");
      router.push("https://github.com/Jonathan-R-Hill/BabyHealthApp"); //note this may be an actual link to the github
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Contact a developer"/>
      <ScrollView style={styles.scrollStyle}>
        {/* <Text style={styles.textTitle}>Developer Contact</Text> */}

        {/*Button Placement*/}
        <View style={styles.header}>
          <TouchableOpacity style={styles.chartButton} onPress={reportBug}>
            <Text style={styles.chartButtonText}>Report A Bug</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.chartButton} onPress={requestFeature}>
            <Text style={styles.chartButtonText}>Request A Feature</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.chartButton} onPress={discordServer}>
            <Text style={styles.chartButtonText}>
              App Support Discord Server
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.chartButton} onPress={gitHub}>
            <Text style={styles.chartButtonText}>GitHub</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 2,
  },
  chartButton: {
    backgroundColor: "#65558F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minHeight: 40,
    height: "30%",
    width: "80%",
    maxHeight: 300,
    maxWidth: 600,
    alignItems: "center",
    justifyContent: "center",
  },
  chartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  textTitle: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  scrollStyle: {
    flexDirection: "column",
    flex: 1,
  },
});
