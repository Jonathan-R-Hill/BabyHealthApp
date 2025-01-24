import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function forgotPasswordPage() {
    const router = useRouter();
    let [userEmail, setUserEmail] = useState("");

    const submitPasswordReset = () => {
        //if email exists?
        console.log("user resetting password", userEmail);
        router.push("./emailAuthentication");
    };

    return (
        <ScrollView>

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
      width: "100%",
      maxWidth: 600,
    },
});

