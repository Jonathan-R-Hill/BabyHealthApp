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

export default function CreateNewCarer() {
    let [name, setName] = useState("");
    let [title, setTitle] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [email, setEmail] = useState("");
    const [errorDisplayMessage, setErrorDisplayMessage] = useState("")

    const router = useRouter();
    const { username, token } = useLocalSearchParams(); // Get the username/token from the URL

    const handleCreation = async() => {
        try{
            if(checkIfFilledCorrectly())
            {
                try{
                    let response = false
                    if(phoneNumber === undefined || phoneNumber === "" && !(email === undefined || email === ""))
                    {
                        response = await postNewCarer(username.toString(), token.toString(), name, title, email, "N/A")
                    }
                    else if(email === undefined || email === "" && !(phoneNumber === undefined || phoneNumber === ""))
                    {
                        response = await postNewCarer(username.toString(), token.toString(), name, title, "N/A", phoneNumber)
                    }
                    else if(phoneNumber === undefined || phoneNumber === "" && email === undefined || email === ""){
                        response = await postNewCarer(username.toString(), token.toString(), name, title, "N/A", "N/A")
                    }
                    else{
                        response = await postNewCarer(username.toString(), token.toString(), name, title, email, phoneNumber)
                    }
                    
                    if(response)
                    {
                        router.push({ pathname: "./contactCarer", params: { username, token } });
                    }
                    else {
                        Alert.alert("Error", "Could not make a new carer");
                    }
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
        let errorCounter = 0;
        let errorMessage = "Please enter something for the field(s): "

        if(!(nameTitleRegex.test(name))) {
            errorCounter++;
            errorMessage = errorMessage + "name, "
        }
        if(!(nameTitleRegex.test(title))){
            errorCounter++;
            errorMessage = errorMessage + "title, "
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

                {/*Name Input*/}
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Full Name"
                    value={name}
                    onChangeText={setName}
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
            <Navbar />
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
