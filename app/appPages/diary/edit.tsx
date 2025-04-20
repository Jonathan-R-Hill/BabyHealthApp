import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { fetchSingleDiaryEntry, postDiaryEntry } from "../../../services/diaryService";
import Header from "../../Header";
import Navbar from "../../Navbar";
import { ReusableTextInput } from "@/components/ReusableTextInputBox";
import { ReusableButton } from "@/components/ReusableButton";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";

interface DiaryEntry {
  details: {
    date: string;
    entry_id: number;
    userId: string;
    diaryTitle: string;
  };
  data: {
    foodAmount: number;
    foodType: string;
    text: string;
    weight: number;
  };
}

// Define the type for form errors
type Errors = {
  title?: string;
  text?: string;
  weight?: string;
  foodType?: string;
  foodAmount?: string;
};

export default function CreateDiaryEntry() {
  const router = useRouter();
  const { username, token, id } = useLocalSearchParams(); // Retrieve username and token from the URL
  const [entry, setEntry] = useState<DiaryEntry | null>(null); // State to store diary entry data
  const [loading, setLoading] = useState(true); // State to track loading status

  const fetchDiaryEntry = async (
    username: string,
    entry_id: number,
    token: string
  ) => {
    try {
      console.log(`Refetching diary entry for edition. (ID: ${id})`);
      const data: DiaryEntry = await fetchSingleDiaryEntry(
        username,
        entry_id,
        String(token)
      );
      console.log(data.details.diaryTitle);
      if (data) {
        setEntry(data); // Store the retrieved entry
      } else {
        Alert.alert("Error", "Diary entry not found."); // Show an alert if entry is not found
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load the diary entry."); // Handle fetch errors
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (id && username) {
      fetchDiaryEntry(String(username), parseInt(String(id)), String(token));
    }
  }, [id, username]); // Fetch the diary entry when `id` or `username` changes

  // State variables for form fields and validation errors
  const [title, setTitle] = useState(entry?.details.diaryTitle ?? "");
  const [text, setText] = useState(entry?.data.text ?? "");
  const [weight, setWeight] = useState(entry?.data.weight?.toString() ?? "");
  const [foodType, setFoodType] = useState(entry?.data.foodType ?? "");
  const [foodAmount, setFoodAmount] = useState(entry?.data.foodAmount?.toString() ?? "");
  const [errors, setErrors] = useState<Errors>({});

  

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
          title="Title"
          placeholder="Enter title"
          onChangeText={setTitle}
        />

        {errors.text && <Text style={styles.errorText}>{errors.text}</Text>}
        <ReusableTextInputAnimated
          title="Diary Entry"
          size="medium"
          placeholder="Write your diary..."
          onChangeText={setText}
          multiline
        />

        {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}
        <ReusableTextInputAnimated
          title="Weight"
          placeholder="Weight (g)"
          onChangeText={setWeight}
          keyboardType="numeric"
        />

        <View style={styles.radioContainer}>
          <Text style={styles.fieldLabel}>Food Type</Text>
          <View style={styles.radioGroup}>
            {["Breast Milk", "Instant Formula", "Other"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioItem}
                onPress={() => setFoodType(option)}
              >
                <RadioButton
                  value={option}
                  status={foodType === option ? "checked" : "unchecked"}
                  onPress={() => setFoodType(option)}
                  color="#5A3E92" // Purple-like colour matching the image
                />
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {errors.foodAmount && (
          <Text style={styles.errorText}>{errors.foodAmount}</Text>
        )}
        <ReusableTextInputAnimated
          title="Food amount"
          placeholder="Food amount (g)"
          onChangeText={setFoodAmount}
          keyboardType="numeric"
        />

        {/* Image Upload Section */
        /* TODO: Remove this placeholder and implement the photo upload feature */}
        <TouchableOpacity style={styles.imageUploader}>
          <Image style={styles.imageIcon} />
          <Text style={styles.imageText}>Add pic</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <ReusableButton
          title="Create"
          edge="edgy"
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
        <View style={{marginBottom: 80}}></View>
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
  radioContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 10,
    // alignContent: "center",
    // justifyContent: "center"
    // display: "flex",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  radioLabel: {
    fontSize: 14,
    color: "#666",
  },
});