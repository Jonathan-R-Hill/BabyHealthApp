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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
            data={orgData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
                <Text>{item.orgName}</Text>
                <Text>{item.orgDesc}</Text>
                <TouchableOpacity onPress={() => handlePress(item.orgLink)}>
                <Text style={{ color: 'blue' }}>{item.orgLink}</Text>
                </TouchableOpacity>
                <Text>{item.orgEmail}</Text>
                <Text>{item.orgPhone}</Text>
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
    
  });
  