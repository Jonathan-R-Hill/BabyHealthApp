import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";

import Navbar from "../../../Navbar";
import Header from "@/app/Header";
import {policy} from "./privacyPolicy";
import { ReusableButton } from "@/components/ReusableButton";

export default function privacyPage()
{
    const router = useRouter();
    const { username, token, forwardPathName } = useLocalSearchParams();
    const path = String(forwardPathName)
    const navigation = useNavigation()

    const goBack = () => {
        try{
            navigation.goBack()
        }
        catch(error){
            console.log("Could not navigate back")
        }
    };

    const continueToPage = () => {
        try{
            router.push(`.././${path}`)
        }
        catch(error){
            console.log("Could not navigate back")
        }
    };

    return (
        <View style = {styles.container}>
            <Header title="Privacy Policy"/>
            <ScrollView style = {styles.scrollView}>
              <View>
                <Text>{policy}</Text>
              </View>

              <ReusableButton onPress={goBack}>
                <Text style={styles.buttonText}>Back</Text>
              </ReusableButton>

              <ReusableButton onPress={continueToPage}>
                <Text style={styles.buttonText}>Accept and continue to page</Text>
              </ReusableButton>
            </ScrollView>
            <Navbar />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingBottom: 80,
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 14,
        textAlign:"center"
      },
});