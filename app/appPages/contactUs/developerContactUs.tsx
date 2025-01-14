import React, { useEffect, useState }  from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

import Navbar from "../../Navbar";

export default function DevContactMain() {
    const router = useRouter();

    const reportBug = () => {
        try{
            console.log("Button Pressed");
            router.push("./reportBug");
        } catch(error) {
            console.error("Navigation Error", error);
            Alert.alert("Navigation Error", "Could not navigate to correct page");
        }
    }

    const requestFeature = () => {
        try{
            console.log("Button Pressed");
            router.push("./requestFeature");
        } catch(error) {
            console.error("Navigation Error", error);
            Alert.alert("Navigation Error", "Could not navigate to correct page");
        }
    }

    const discordServer = () => {
        try{
            console.log("Button Pressed");
            router.push("./discordServer"); //note this may be an actual link to a discord server in the future
        } catch(error) {
            console.error("Navigation Error", error);
            Alert.alert("Navigation Error", "Could not navigate to correct page");
        }
    }

    const gitHub = () => {
        try{
            console.log("Button Pressed");
            router.push("./gitHub"); //note this may be an actual link to the github
        } catch(error) {
            console.error("Navigation Error", error);
            Alert.alert("Navigation Error", "Could not navigate to correct page");
        }
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.textTitle}>Developer Contact</Text>
            </View>

            {/*Button Placement*/}
            <View style = {styles.header}>
                <TouchableOpacity style={styles.chartButton} onPress={reportBug}>
                    <Text style={styles.chartButtonText}>Report A Bug</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.header}>
                <TouchableOpacity style={styles.chartButton} onPress={requestFeature}>
                    <Text style={styles.chartButtonText}>Request A Feature</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.header}>
                <TouchableOpacity style={styles.chartButton} onPress={discordServer}>
                    <Text style={styles.chartButtonText}>Visit The App Support Discord Server</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.header}>
                <TouchableOpacity style={styles.chartButton} onPress={gitHub}>
                    <Text style={styles.chartButtonText}>GitHub</Text>
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
    },
    chartButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    textTitle: {
        color: "#000000",
        fontSize: 40,
        fontWeight: "bold",
    }
});