import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ImageBackground
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { updateCarer, fetchSingleCarer, deleteCarer } from "../../../services/contactUsService";

import Navbar from "../../Navbar";

interface Carer {
  details: {
    carerId: number; //unique identifier for the carer
    userId: string; //unique identifier for the user
  };
  data: {
    name: string;
    title: string; //title such as Sir, Dr, Mr, Miss, ect
    email: string;
    phone: string;
  };
}

export default function editCarerPage() {
  const router = useRouter();
  const { username, token, carerId } = useLocalSearchParams(); //do not pass large objects
  const [carer, setCarer] = useState<Carer>();
  let [name, setName] = useState("");
  let [title, setTitle] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [email, setEmail] = useState("");
  let [errorDisplayMessage, setErrorDisplayMessage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (username) {
      // do not attempt to fetch without a valid username
      fetchCarer(String(username), String(token), Number(carerId));
    }
  }, [username]);

  const fetchCarer = async (username: string, token: string, carerId: number) => {
    const carer: Carer = await fetchSingleCarer(username, token, carerId);
    setCarer(carer);
    // Prefill the input fields after fetching the carer data
    if (carer && carer.data) {
      setName(carer.data.name);
      setTitle(carer.data.title);
      setPhoneNumber(carer.data.phone);
      setEmail(carer.data.email);
    }
  };

  const editCarer = async () => {
    try {
      if (checkIfFilledCorrectly()) {
        try {
          
          const result = await updateCarer(
            String(username),
            String(token),
            Number(carerId),
            name,
            title,
            email,
            phoneNumber
          );
          if (result) {
            router.push({
              pathname: "./contactCarer",
              params: { username, token },
            });
          } else {
            setErrorDisplayMessage("We could not update the carer's details");
          }
        } catch (error) {
          Alert.alert("Error", "Could not update carer");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Could not update carer");
    }
  };

  const checkIfFilledCorrectly = () => {
    const nameTitleRegex = /^([A-Z]*[a-z]+)/;
    let errorCount = 0;
    let possibleErrorMessage = "Please enter valid data for:"

    if (!nameTitleRegex.test(name)) {
      setName(String(carer?.data.name));
      errorCount++;
      possibleErrorMessage = possibleErrorMessage + " name"
    }
    if (!nameTitleRegex.test(title)) {
      setTitle(String(carer?.data.title));
      errorCount++;
      possibleErrorMessage = possibleErrorMessage + " title"
    }

    if(errorCount > 0){
      setErrorDisplayMessage(possibleErrorMessage);
      return false;
    }

    if (
      name === undefined ||
      title === undefined ||
      name === "" ||
      title === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const deleteCarerMethod = async () => {
    try{
      const result = await deleteCarer(String(username), String(token), Number(carerId));
      if (result) {
        toggleVisibility();
        router.push({
          pathname: "./contactCarer",
          params: { username, token },
        });
      } else {
        setErrorDisplayMessage("We could not delete this carer");
        toggleVisibility();
      }
    }catch (error) {
      Alert.alert("Error", "Could not delete this carer");
    }
  };

  const toggleVisibility = () => {
    if (isModalVisible) {
      setModalVisible(false);
    }
    else {
      setModalVisible(true);
    }
  };

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

        <Modal visible={isModalVisible} transparent={true} style={styles.popupWindow}>
          <View style={styles.popup}>
            <Text style={styles.label}>Are you sure you want to delete this?</Text>
            <View style={styles.buttonBlock}>
              <TouchableOpacity onPress={deleteCarerMethod} style={styles.deleteButton}>
                <Text style={styles.createButtonText}>Delete Carer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleVisibility} style={styles.createButton}>
                <Text style={styles.createButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/*Title Input*/}
        <Text style={styles.label}>Professional Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Professional Title"
          value={title}
          onChangeText={setTitle}
        />

        {/*Phone Number Input*/}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        {/*Email Input*/}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
      
        {/*Create Button*/}
        <TouchableOpacity onPress={editCarer} style={styles.createButton}>
          <Text style={styles.createButtonText}>Edit Details</Text>
        </TouchableOpacity>

        {/*Delete Button*/}
        <TouchableOpacity onPress={toggleVisibility} style={styles.deleteButton}>
          <Text style={styles.createButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
      <Navbar />
    </View>
  );
}

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
    fontSize: 18,
    marginVertical: 5,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 15
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  popup: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    width: "100%",
    height: "40%",
    maxHeight: 400,
    maxWidth: 900,
    alignSelf:"center"
  },
  buttonBlock: {
    flexDirection: "column",
    padding: 30,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 15
  },
  popupWindow: {
    alignSelf: "center",
  }
});