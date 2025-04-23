import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { postDiaryEntry } from "../../../services/diaryService";
import Header from "../../Header";
import Navbar from "../../Navbar";
import { ReusableTextInput } from "@/components/ReusableTextInputBox";
import { ReusableButton } from "@/components/ReusableButton";
import { ReusableTextInputAnimated } from "@/components/ReusableTextInputBoxAnimated";
import * as ImagePicker from "expo-image-picker";

// Get screen width
const { width: screenWidth } = Dimensions.get("window");

// Determine button width dynamically
const isSmallScreen = screenWidth <= 900;
const formMargin = isSmallScreen ? "0%" : "20%";
// const alignItems = isSmallScreen ? "center" : "flex-start";

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
  const [imageUri, setImageUri] = useState<string | null>(null);
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

  // Image picker function
  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Sorry, we need camera roll permissions to upload images."
      );
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Create FormData for upload
  const createFormData = () => {
    const formData = new FormData();
    
    formData.append("userId", String(username));
    formData.append("title", title);
    formData.append("text", text);
    formData.append("weight", weight);
    formData.append("foodType", foodType);
    formData.append("foodAmount", foodAmount);
    formData.append("token", String(token));
    
    if (imageUri) {
      const fileName = imageUri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type,
      } as any);
    }
    
    return formData;
  };

  // Submit diary entry with image
  const submitDiaryEntry = async () => {
    if (validateForm()) {

      try {
        const formData = createFormData();
        await postDiaryEntry(formData);
        
        console.log("Diary entry created successfully!");
        
        // Reset form fields
        setTitle("");
        setText("");
        setWeight("");
        setFoodType("");
        setFoodAmount("");
        setImageUri(null);
        setErrors({});
        
        // Navigate back to main page
        router.push({
          pathname: "./main",
          params: { username, token },
        });
      } catch (error) {
        console.error("Error creating diary entry:", error);
        Alert.alert("Error", "Failed to create diary entry. Please try again.");
      }
    }
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

        <View style={styles.imageSection}>
          <Text style={styles.fieldLabel}>Add Photo</Text>
          
          {imageUri ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageBtn}
                onPress={() => setImageUri(null)}
              >
                <Text style={styles.removeImageText}>✕</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                <Text style={styles.imageButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <ReusableButton
          title="Create"
          edge="edgy"
          onPress={submitDiaryEntry}
        />
        <View style={{marginBottom: 80}}></View>
      </ScrollView>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({

  imageSection: {
    marginBottom: 20,
  },
  imageButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imageButton: {
    backgroundColor: "#5A3E92",
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    position: "relative",
    marginTop: 10,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  removeImageBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  diaryContainer: {
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: formMargin,
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