import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { postNewCarer } from "../../../services/contactUsService";
import Navbar from "../../Navbar";
import { setNativeProps } from "react-native-reanimated";

export default function CreateNewCarer() {
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [title, setTitle] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [errorDisplayMessage, setErrorDisplayMessage] = useState("")

    const router = useRouter();
    const { username, token } = useLocalSearchParams(); // Get the username/token from the URL

    const handleCreation = () => {
        try{
            if(checkIfFilledCorrectly())
            {
                try{
                    postNewCarer(username.toString(), token.toString(), firstName, surname, title, phoneNumber, email)
                    router.push({ pathname: "./contactCarer", params: { username, token } });
                }catch(error){
                    Alert.alert("Error", "Could not make a new carer");
                }
            }
        }catch(error){
            Alert.alert("Error", "Could not make a new carer");
        }
    }

    const checkIfFilledCorrectly = () => {
        const nameTitleRegex = /^([A-Z]*[a-z]+)/;
        const phoneRegex = /^([+\d\d]*\d{9,12})/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let errorCounter = 0;
        let errorMessage = "Please enter something for the field(s): "

        if(nameTitleRegex.test(firstName)) {
            errorCounter++;
            errorMessage = errorMessage + "first name, "
        }
        if(nameTitleRegex.test(surname)){
            errorCounter++;
            errorMessage = errorMessage + "surname, "
        }
        if(nameTitleRegex.test(title)){
            errorCounter++;
            errorMessage = errorMessage + "title, "
        }
        if(phoneRegex.test(phoneNumber)){
            errorCounter++;
            errorMessage = errorMessage + "phone number, "
        }
        if(emailRegex.test(email)){
            errorCounter++;
            errorMessage = errorMessage + "email, "
        }

        if(errorCounter > 0){
            setErrorDisplayMessage(errorMessage);
            return false;
        }
        else{
            return true;
        }
    }

    return (
        
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                <Text style={styles.errorText}>{errorDisplayMessage}</Text>

                {/*First Name Input*/}
                <Text style={styles.label}>First Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter first name"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                {/*Surname Input*/}
                <Text style={styles.label}>Surname</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter surname"
                    value={surname}
                    onChangeText={setSurname}
                />

                {/*Title Input*/}
                <Text style={styles.label}>Professional Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                />

                {/*Phone Number Input*/}
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                {/*Email Input*/}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                />

                {/*Create Button*/}
                <TouchableOpacity onPress={handleCreation} style={styles.createButton}>
                    <Text style={styles.createButtonText}>+ Create New Carer</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    scrollViewContainer: {
      flex: 1,
      paddingHorizontal: 10,
    },
    label: {
      fontSize: 16,
      marginVertical: 8,
      fontWeight: "bold",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
      backgroundColor: "#f9f9f9",
    },
    textArea: {
      height: 100,
      textAlignVertical: "top",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginVertical: 5,
    },
    createButton: {
      backgroundColor: "#3498db",
      paddingVertical: 15,
      marginVertical: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    createButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
