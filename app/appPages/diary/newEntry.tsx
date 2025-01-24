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

type Errors = {
  title?: string;
  text?: string;
  weight?: string;
  foodType?: string;
  foodAmount?: string;
};

export default function CreateDiaryEntry() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [weight, setWeight] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();
  const { username } = useLocalSearchParams(); // Get the username from the URL

  const validateForm = () => {
    const newErrors: Errors = {};
  
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!text.trim()) newErrors.text = "Text is required.";
    if (!weight.trim() || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0)
      newErrors.weight = "Valid weight is required.";
    if (!foodType.trim()) newErrors.foodType = "Food type is required.";
    if (
      !foodAmount.trim() ||
      isNaN(parseFloat(foodAmount)) ||
      parseFloat(foodAmount) <= 0
    )
      newErrors.foodAmount = "Valid food amount is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  
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
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <Text style={styles.label}>Text</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Write your diary entry..."
          value={text}
          onChangeText={setText}
          multiline
        />
        {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}

        <Text style={styles.label}>Weight (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

        <Text style={styles.label}>Food (type)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food type"
          value={foodType}
          onChangeText={setFoodType}
        />
        {errors.foodType && <Text style={styles.errorText}>{errors.foodType}</Text>}

        <Text style={styles.label}>Food amount (g)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food amount"
          value={foodAmount}
          onChangeText={setFoodAmount}
          keyboardType="numeric"
        />
        {errors.foodAmount && <Text style={styles.errorText}>{errors.foodAmount}</Text>}

        <TouchableOpacity style={styles.imageUploader}>
          <Image
            style={styles.imageIcon}
          />
          <Text style={styles.imageText}>Add pic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (validateForm()) {
              const userId = String(username);
              const weightValue = parseFloat(weight);
              const foodAmountValue = parseFloat(foodAmount);

              postDiaryEntry(userId, text, weightValue, foodType, foodAmountValue)
                .then(() => {
                  console.log("Diary entry created successfully!");
                  setTitle("");
                  setText("");
                  setWeight("");
                  setFoodType("");
                  setFoodAmount("");
                  setErrors({}); // Clear errors after successful submission
                })
                .then(() => {
                  router.push({ pathname: "./main", params: { username } });
                })
                .catch((error) => {
                  console.error("Error creating diary entry:", error);
                });
            }
          }}
          style={styles.createButton}
        >
          <Text style={styles.createButtonText}>+ Create a new entry</Text>
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
