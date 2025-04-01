import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import Navbar from "../../Navbar";
import Header from "../../Header";
import { fetchBaby } from "../../../services/babyProfileService";

interface Baby {
    details: {
        userId: string;
        babyId: number;
    }
    data: {
        name: string;
        gender: string;
        dateOfBirth: Date;
        weight: number;
    }
}

