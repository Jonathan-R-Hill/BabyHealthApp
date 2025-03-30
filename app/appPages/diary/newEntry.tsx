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
import { ReusableTextInput } from "@/components/ReusableTextInputBox";
import { ReusableButton } from "@/components/ReusableButton";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";

// Define the type for form errors
type Errors = {
  title?: string;
  text?: string;
  weight?: string;
  foodType?: string;
  foodAmount?: string;
};

export default function CreateDiaryEntry() {
  // State variables for form fields and validation errors
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [weight, setWeight] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodAmount, setFoodAmount] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();
  const { username, token } = useLocalSearchParams(); // Retrieve username and token from the URL

  // Form validation function
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
    return Object.keys(newErrors).length === 0; // Return true if no errors exist
  };

  return (
    <View style={styles.container}>
      <Header title="New Diary Entry" onBackPress={router.back} />
      <ScrollView style={styles.diaryContainer}>

        {/* Form Fields */}
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        <ReusableTextInputAnimated
          title = "Title"
          placeholder="Enter title"
          onChangeText={setTitle}
        />
        
        {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}
        <ReusableTextInputAnimated
          title = "Diary Entry"
          size="medium"
          placeholder="Write your diary..."
          onChangeText={setText}
          multiline
        />

        {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
        <ReusableTextInputAnimated
          title = "Weight"
          placeholder="Weight (g)"
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        
        {errors.foodType && (
          <Text style={styles.errorText}>{errors.foodType}</Text>
        )}
        <ReusableTextInputAnimated
          title = "Food Type"
          placeholder="Food type"
          onChangeText={setFoodType}
        />
        
        {errors.foodAmount && (
          <Text style={styles.errorText}>{errors.foodAmount}</Text>
        )}
        <ReusableTextInputAnimated
          title = "Food amount (g)"
          placeholder="Food amount (g)"
          onChangeText={setFoodAmount}
          keyboardType="numeric"
        />
        
        {
        /* Image Upload Section */
        /* TODO: Remove this placeholder and implement the photo upload feature */
        }
        <TouchableOpacity style={styles.imageUploader}>
          <Image style={styles.imageIcon} />
          <Text style={styles.imageText}>Add pic</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <ReusableButton
          title = "Create"
          edge = "edgy"

          onPress={() => {
            if (validateForm()) {
              const userId = String(username);
              const weightValue = parseFloat(weight);
              const foodAmountValue = parseFloat(foodAmount);

              postDiaryEntry(
                userId,
                title,
                text,
                weightValue,
                foodType,
                foodAmountValue,
                String(token)
              )
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
                  router.push({
                    pathname: "./main",
                    params: { username, token },
                  });
                })
                .catch((error) => {
                  console.error("Error creating diary entry:", error);
                });
            }
          }}
        />
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
    paddingTop: 15,
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
    marginBottom: 5,
  },
  imageUploader: {
    marginBottom: 15,
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
    marginTop: -30,
    fontSize: 16,
    color: "#999",
  },
  // createButton: {
  //   backgroundColor: "#3498db",
  //   paddingVertical: 15,
  //   marginVertical: 10,
  //   borderRadius: 5,
  //   alignItems: "center",
  // },
  // createButtonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
});
