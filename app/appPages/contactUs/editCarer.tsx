import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { updateCarer, fetchSingleCarer } from "../../../services/contactUsService";

import Navbar from "../../Navbar";

interface Carer {
    details: {
        carerId: number //unique identifier for the carer
        userId: string //unique identifier for the user
    };
    data: {
        name: string
        title: string //title such as Sir, Dr, Mr, Miss, ect
        email: string
        phone: string
    }
}

export default function editCarerPage()
{
    const router = useRouter();
    const { username, token, carerId } = useLocalSearchParams(); //do not pass large objects
    const [carer, setCarer] = useState<Carer>();

    useEffect(() => { //if the username has successfully passed, then get the data
        if (username) { // do not attempt to fetch without a valid username
            fetchCarer(String(username), String(token), Number(carerId));
        }
    }, [username]);

    const fetchCarer = async (username: string, token: string, carerId: number) => {
        const carer: Carer = await fetchSingleCarer(username, token, carerId);
        setCarer(carer);
    };

    const editCarer = async () => {
        try{
            /*if(checkIfFilledCorrectly())
            {
                try{
                    //this sends to update carer
                }catch(error){
                    Alert.alert("Error", "Could not make a new carer");
                }
            }*/
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

        /*if(!(nameTitleRegex.test(name))) {
            errorCounter++;
            errorMessage = errorMessage + "first name, "
        }
        if(!(nameTitleRegex.test(title))){
            errorCounter++;
            errorMessage = errorMessage + "title, "
        }
        if(!(phoneRegex.test(phoneNumber))){
            errorCounter++;
            errorMessage = errorMessage + "phone number, "
        }
        if(!(emailRegex.test(email))){
            errorCounter++;
            errorMessage = errorMessage + "email, "
        }

        if(errorCounter > 0){
            setErrorDisplayMessage(errorMessage);
            return false;
        }
        else{
            return true;
        }*/
    }

    return (
        
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                {/*<Text style={styles.errorText}>{errorDisplayMessage}</Text>*/}

                {/*Name Input*/}
                <Text style={styles.label}>Full Name</Text>
                {/*<TextInput
                    style={styles.input}
                    placeholder="Enter Full Name"
                    value={name}
                    onChangeText={setName}
                />*/}

                {/*Title Input*/}
                <Text style={styles.label}>Professional Title</Text>
                {/*<TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    value={title}
                    onChangeText={setTitle}
                />*/}

                {/*Phone Number Input*/}
                <Text style={styles.label}>Phone Number</Text>
                {/*<TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />*/}

                {/*Email Input*/}
                <Text style={styles.label}>Email</Text>
                {/*<TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                />*/}

                {/*Create Button*/}
                {/*<TouchableOpacity onPress={handleCreation} style={styles.createButton}>
                    <Text style={styles.createButtonText}>+ Create New Carer</Text>
                </TouchableOpacity>*/}

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