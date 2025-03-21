import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Navbar from "../../Navbar";
import {orgData} from "./orgData"

export default function additionalOrgs() {
  const router = useRouter();

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Additional Organisations</Text>

        {/* Org List*/}
        <View style={styles.listContainer}>
        <FlatList
            data={orgData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
              <Text style={styles.orgName}>{item.orgName}</Text>
              <Text style={styles.orgDesc} numberOfLines={3}>{item.orgDesc}</Text>
              <View style={styles.row}>
              <Text style={styles.label}>Website: </Text>
              <TouchableOpacity onPress={() => handlePress(item.orgLink)}>
                <Text style={styles.linkText}>{item.orgLink}</Text>
              </TouchableOpacity>
              </View>
              <View style={styles.row}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.contactInfo}>{item.orgEmail}</Text>
              </View>
              <View style={styles.row}>
              <Text style={styles.label}>Phone Number: </Text>
              <Text style={styles.contactInfo}>{item.orgPhone}</Text>
              </View>
            </View>
            )}
        />
        </View>

        {/* Navbar */}
      <Navbar />
    </View>
);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
      textAlign: "center",
      color: "#000000",
      marginBottom: 20,
    },
    listContainer: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      paddingBottom: 25,
    },
    listItem: {
      borderRadius: 8, 
      padding: 15, 
      marginBottom: 10, 
      width: "90%", 
    },
    orgName: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 5,
      alignSelf: "center"
    },
    orgDesc: {
      fontSize: 18,
      marginBottom: 10,
      alignSelf: "center"
    },
    linkText: {
      color: "blue",
      fontSize: 18,
      textDecorationLine: "underline",
      marginBottom: 3,
      alignSelf: "center"
    },
    contactInfo: {
      fontSize: 18,
      marginBottom: 3,
      alignSelf: "center"
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 3,
      alignSelf: "center"
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
  
  });
  