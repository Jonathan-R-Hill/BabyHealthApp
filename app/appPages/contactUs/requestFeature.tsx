import React, { useEffect, useState }  from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import Navbar from "../../Navbar";

export default function requestFeatureMain() {
    const router = useRouter();

    const [requestText, setRequestText] = useState("");

    const handleReportSend = () => {
        try{
            console.log("bug:",requestText);

            router.push("./developerContactUs");
        } catch (error) {
            console.error("Error Requesting Feature", error);
            Alert.alert("Error Requesting Feature, your report has not been sent");
        }
    }

    return (
        <View style = {styles.container}>
            {/*Title Placement*/}
            <View style = {styles.header}>
                <Text style = {styles.textTitle}>Request A Feature</Text>
            </View>

            {/*Text Box Placement*/}
            <View style = {styles.header}>
                <TextInput
                style={styles.inputBox}
                placeholder="Request a feature here"
                value={requestText}
                onChangeText={setRequestText}
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
    )
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
    },
    chartButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    chartButton: {
      backgroundColor: "#5A4FCF",
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
    },
    inputBox: {
        height: 500,
        width: 400,
        borderColor: "blue",
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: "#e8e6e1",
        textAlign: "center",
    },
});