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
import { ReusableButton } from "@/components/ReusableButton";

import Navbar from "../../Navbar";
import Header from "@/app/Header";

export default function HandleContactUs() {
  const router = useRouter();

  const { username, token } = useLocalSearchParams();

  const ContactDevs = () => {
    try {
      router.push({
        pathname: "./developerContactUs",
        params: { username, token },
      });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  const ContactCarer = () => {
    try {
      router.push({ pathname: "./contactCarer", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to correct page");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/*Title Placement*/}
        {/* <View style={styles.header}>
          <Text style={styles.textTitle}>NHS Contacts</Text>
        </View> */}
        <Header title="NHS Contacts"/>

        {/*Logo placement*/}
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}></View>
        </View>
        

        {/*Text Placement*/}
        <View style={styles.profileHeader}>
          <Text style={styles.textGeneral}>
            Phone Number: <Text style={styles.numberText}>0300 311 2233</Text>
          </Text>
          <Text style={styles.textGeneral}>
            Number for hearing or speech impaired users:{" "}
            <Text style={styles.numberText}>18001</Text>
          </Text>
        </View>

        {/*Button Placement*/}
        <View style={styles.header}>
          <ReusableButton onPress={ContactCarer}>
            <Text style={styles.chartButtonText}>Contact A Carer</Text>
          </ReusableButton>
        </View>
        <View style={styles.header}>
          <ReusableButton onPress={ContactDevs}>
            <Text style={styles.chartButtonText}>Contact A Developer</Text>
          </ReusableButton>
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
    padding: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
  },
  profileHeader: {
    padding: 15,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf:"center",
    alignItems:"center",
    flex: 1,
  }, 
  profileIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 20,
    margin: 10,
  },
  chartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minHeight: 40,
    height: "30%",
    width: "80%",
    maxHeight: 300,
    maxWidth: 600,
  },
  chartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    verticalAlign: "middle",
  },
  numberText: {
    color: "#5A4FCF",
    fontSize: 16,
  },
  textGeneral: {
    color: "#000000",
    fontSize: 16,
    flex: 1,
  },
  textTitle: {
    color: "#000000",
    fontSize: 40,
    fontWeight: "bold",
  },
});
