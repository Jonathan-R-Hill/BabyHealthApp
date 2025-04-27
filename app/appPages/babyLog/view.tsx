import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Baby } from "../babyLog/main";
import Navbar from "../../Navbar";
import Header from "../../Header";
import { fetchBaby, deleteBaby } from "../../../services/babyProfileService";
import { ActivityIndicator } from "react-native-paper";
import { format } from "date-fns";

export default function BabyDetails() {
    const router = useRouter();
    const { username, id, token } =  useLocalSearchParams();
    const [baby, setBaby] = useState<Baby | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchBabyDetails = async (
        userId: string,
        babyId: string, 
        token: string
    ) => {
        console.log("Fetch: ", { userId, babyId, token})
        try {
            const data = await fetchBaby(
                userId,
                babyId,
                String(token)
            );
            console.log("Baby data:", data);
            if (data) {
                setBaby(data);
            } else {
                Alert.alert("Error", "Baby not found.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to load baby/babies.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && username) {
            fetchBabyDetails(String(username), (String(id)), String(token));
        }
    }, [id, username]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#5A4FCF" />
                <Navbar />
            </View>
        );
    }

    if (!baby) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Baby not found.</Text>
                <Navbar />
            </View>
        );
    }

    const handleDeleteBaby = async () => {
        if (typeof username === "string" && typeof id === "string" && typeof token === "string") {
                try {
                    const response = await deleteBaby(username, id, token);
                    console.log("Baby deleted.");
                    router.push({
                        pathname: "./main",
                        params: { username, token, },
                    });
                    return response.data;
                } catch (error) {
                    Alert.alert("Error", "Failed to delete baby");
                }
            } else {
            Alert.alert("Error", "Missing or invalid parameters.")
            }
    };   

    const confirmDeleteBaby = () => {
        if (Platform.OS === 'web') {
            const confirm = globalThis.confirm?.("Are you sure you want to delete?");
            if (confirm) {
                handleDeleteBaby();
            }
        } else {
            Alert.alert(
                "Delete Baby?",
                "Are you sure you want to delete baby? This cannot be reversed.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: handleDeleteBaby },
                ]
            );
        }
    };
    
    const handleNavigateToUpdate = (babyId: number) => {
        if (username) {
          router.push({
            pathname: "./update",
            params: {id: babyId.toString(), username, token },
          });
        } else {
          Alert.alert("Error,", "Username not available")
        }
      };

    const calculateAge = (dateOfBirth: Date) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
      
        const years = today.getFullYear() - birthDate.getFullYear();
        const months = today.getMonth() - birthDate.getMonth() + (years * 12);
        const days = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24));
      
        const monthsPart = months % 12;
        const weeksPart = Math.floor(days / 7);
        const daysPart = days % 7;
      
        return `${monthsPart} months, ${weeksPart} weeks, ${daysPart} days`;
      };
      

    // Display baby details
    return (
        <View style={styles.container}>
            <Header title="Baby Details"/>
            <ScrollView style={styles.babyContainer}>
            
            <View style={styles.attributeBox}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.content}>{baby.data.name}</Text>
            </View>

            <View style={styles.attributeBox}>
                <Text style={styles.label}>Gender</Text>
                <Text style={styles.content}>{baby.data.gender}</Text>
            </View>
            
            <View style={styles.attributeBox}>
                <Text style={styles.label}>Date of Birth</Text>
                <Text style={styles.content}>{format(new Date(baby.data.dateOfBirth), 'dd/MM/yyyy')}</Text>
            </View>

            <View style={styles.attributeBox}>
                <Text style={styles.label}>Weight</Text>
                <Text style={styles.content}>{baby.data.weight}g</Text>
            </View>

            <View style={styles.attributeBox}>
                <Text style={styles.label}>Current Age</Text>
                <Text style={styles.content}>{calculateAge(baby.data.dateOfBirth)}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => { handleNavigateToUpdate(baby.details.babyId)}}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.deleteContainer}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={confirmDeleteBaby}>
                        <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
            </View>
            </ScrollView>
            <Navbar />
        </View>
    )
}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    babyContainer: {
        padding: 20,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
    attributeBox: {
        backgroundColor: "#f9f9f9",
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: "#65558F",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: "#65558F",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    deleteContainer: {
        backgroundColor: "red",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 20,
    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
    },
    deleteText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});