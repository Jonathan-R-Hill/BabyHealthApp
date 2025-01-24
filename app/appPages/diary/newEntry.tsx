import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { postDiaryEntry } from "../../../services/diaryService";
import Header from "../../Header";
import Navbar from "../../Navbar";

export default function CreateDiaryEntry() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [weight, setWeight] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState("");

  const router = useRouter();
  const { username } = useLocalSearchParams(); // Get the username from the URL

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.diaryContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileIcon}></View>
        <Text style={styles.headerTitle}>Create Diary Entry</Text>
      </View>

      {/* Form Fields */}
      {/* <ScrollView style={styles.form}> */}
        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />

        {/* Text */}
        <Text style={styles.label}>Text</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your diary entry..."
          value={text}
          onChangeText={setText}
          multiline
        />

        {/* Weight */}
        <Text style={styles.label}>Weight (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />

        {/* Food Type */}
        <Text style={styles.label}>Food (type)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food type"
          value={foodType}
          onChangeText={setFoodType}
        />

        {/* Food Amount */}
        <Text style={styles.label}>Food amount (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food amount"
          value={foodAmount}
          onChangeText={setFoodAmount}
          keyboardType="numeric"
        />

        {/* Add Picture */}
        <TouchableOpacity style={styles.imageUploader}>
          <Image
            // source={require('./assets/add-image-icon.png')} // Replace with your image asset
            style={styles.imageIcon}
          />
          <Text style={styles.imageText}>Add pic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const userId = String(username); // Replace with actual user ID if needed
            const weightValue = parseFloat(weight);
            const foodAmountValue = parseFloat(foodAmount);

            postDiaryEntry(userId, text, weightValue, foodType, foodAmountValue)
              .then(() => {
                console.log("Diary entry created successfully!");
                // Optionally, clear the form after submission
                setTitle("");
                setText("");
                setWeight("");
                setFoodType("");
                setFoodAmount("");
              })
              .then(() => {
                router.push({ pathname: "./main", params: { username } });
              })
              .catch((error) => {
                console.error("Error creating diary entry:", error);
              });
          }}
          style={styles.createButton}
        >
          <Text>+ Create a new entry</Text>
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
    // paddingHorizontal: 15,
  },
  diaryContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    flex: 1,
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
  imageUploader: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  imageText: {
    fontSize: 16,
    color: "#999",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    alignItems: "center",
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
