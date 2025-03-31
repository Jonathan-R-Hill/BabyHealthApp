import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { postBaby } from "../../../services/babyProfileService";
import Navbar from "../../Navbar";
import Header from "../../Header";

type Errors = {
  name?: string;
  gender?: string;
  dateOfBirth?: string;
  weight?: string;
};

export default function AddBaby() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [weight, setWeight] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender.trim()) newErrors.gender = "Gender is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!weight.trim() || isNaN(parseFloat(weight)) || parseFloat(weight) <= 0)
      newErrors.weight = "Valid weight is required.";

    setErrors(newErrors);
    console.log(errors);
    return Object.keys(newErrors).length === 0;
  };

  // const onChange = (_event: any, selectedDate?: Date | undefined) => {
  //   setShowDatePicker(false);
  //   if (selectedDate) {
  //     setDateOfBirth(selectedDate);
  //   }
  // };

  const handleDateConfirm = (selectedDate: Date) => {
    setDateOfBirth(selectedDate);
    setShowDatePicker(false); // Close the modal after selecting the date
  };
  
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.babyContainer}>
        <View style={styles.header}>
          <View style={styles.profileIcon}></View>
          <Text style={styles.headerTitle}>Add Baby</Text>
        </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Baby Name"
        value={name}
        onChangeText={setName}
        multiline
      />

      <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>

        {/* <View style={styles.container}>
          <Button title="Date of Birth" onPress={() => setShowDatePicker(true)} />
          <Text style={styles.text}>Selected Date: {dateOfBirth.toDateString()}</Text>

            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onChange}
                style={styles.picker}
              />
            )}
        </View> */}

        {/* Date Picker Trigger Button */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>
            Date of Birth: {dateOfBirth.toDateString()}
          </Text>
        </TouchableOpacity>

        {/* Date Picker for Mobile (using Modal) */}
        {Platform.OS !== "web" && (
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
        )}

        {/* Date Picker for Web (using HTML input type="date") */}
        {Platform.OS === "web" && (
          <input
            type="date"
            value={dateOfBirth.toISOString().split("T")[0]} // Format the date for web
            onChange={(e) => setDateOfBirth(new Date(e.target.value))}
            style={styles.webDateInput}
          />
        )}

        <Text style={styles.label}>Weight (g)</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        {errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

        <TouchableOpacity 
          onPress={() => {
            if (validateForm()) {
              const userId = String(username);
              const weightValue = parseFloat(weight);

              console.log("Submitting:", { userId, token, name, gender, dateOfBirth, weight });
              postBaby(
                userId,
                String(token),
                name,
                gender,
                dateOfBirth,
                weightValue,
              )
                .then(() => {
                  console.log("Baby added successfully!");
                  setName("");
                  setGender("");
                  setDateOfBirth(new Date());
                  setWeight("");
                  setErrors({});
                })
                .then(() => {
                  router.push({
                    pathname: "./main",
                    params: { username, token },
                  });
                })
                .catch((error) => {
                  console.error("Error adding baby", error);
                });
            }
          }}
          style={styles.createButton}
          
        >
          <Text style={styles.createButtonText}>+ Add new baby</Text>
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
  babyContainer: {
    flex: 1,
    paddingHorizontal:10,
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
    height: 75,
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
  picker: {
    height: 200,
    width: "100%"
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  }, 
  dateButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },  
  webDateInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16, 
    fontWeight: "bold" },
});