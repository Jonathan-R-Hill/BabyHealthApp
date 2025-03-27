import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import Navbar from "../../Navbar";
import Header from "../../Header";

type Errors = {
  name?: string;
  gender?: string;
  dateOfBirth?: string;
}

export default function AddBaby() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const router = useRouter();
  const { username, token } = useLocalSearchParams();

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!gender.trim()) newErrors.gender = "Gender is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required"

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
}
//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView style={styles.}
//     </View>
//   );
// }