import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
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

  const handleDateConfirm = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dateOfBirth: "Date of birth cannot be in the future.",
        }));
        return;
      } else {
        setErrors((prevErrors) => {
          const {dateOfBirth, ...rest } = prevErrors;
          return rest;
        });
        setDateOfBirth(selectedDate);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Add Baby"/>
      <ScrollView style={styles.babyContainer}>

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

        <Text style={styles.label}>Date of Birth</Text>

        {/* Date Picker for Mobile (using DateTimePicker) */}
        {Platform.OS !== "web" && (
          <View>
            {/* Show button only when the date picker is not displayed */}
            {!showDatePicker && (
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                {/* Display the selected date */}
                <Text style={styles.dateText}>
                  {dateOfBirth ? dateOfBirth.toDateString() : "Select Date"}
                </Text>
              </TouchableOpacity>
            )}

            {/* Show the DateTimePicker if the button is pressed */}
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={handleDateConfirm} // Ensure date is set properly
              />
            )}
          </View>
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
    marginBottom: 100,
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
    width: "75%",
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    width: "75%",
    marginBottom: 10,
  },
  textArea: {
    height: 75,
    textAlignVertical: "top",
    width: "75%",
    marginBottom: 10,
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
    backgroundColor: "#65558F",
    paddingVertical: 15,
    width: "75%",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    height: "20%",
    width: "75%",
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  }, 
  dateButton: {
    padding: 10,
    backgroundColor: "#65558F",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
  },  
  webDateInput: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    width: "75%",
  },
  submitButton: {
    backgroundColor: "#65558F",
    padding: 15,
    width: "75%",
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16, 
    fontWeight: "bold" },
});