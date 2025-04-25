import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { getDataOnCarers } from "../../../services/contactUsService";

import Navbar from "../../Navbar";
import Header from "@/app/Header";
import { popup } from "@/components/LogoutPopup";

interface Carer {
    details: {
        carerId: number; // unique identifier for the carer
        userId: string;  // unique identifier for the user
    };
    data: {
        name: string;
        title: string; // title such as Sir, Dr, Mr, Miss, etc.
        email: string;
        phone: string;
    };
}

const { height: screenHeight } = Dimensions.get("window");

export default function CarerPage() {
    const router = useRouter();
    const [carers, setCarers] = useState<Carer[]>([]);
    const { username, token } = useLocalSearchParams();

    // Fetch carers' data from the backend
    const fetchAllCarers = async (username: string, token: string) => {
        try {
            const data = await getDataOnCarers(username, token);
            if (data == false) {
                popup()
            } else {
                setCarers(data);
            }
        } catch (error) {
            Alert.alert("Error", "Could not load carers");
        }
    };

    useEffect(() => {
        // If the token is valid, fetch the data
        if (token) {
            fetchAllCarers(String(username), String(token));
        }
    }, [token]);

    // Handle page routing
    const routeToAddCarer = () => {
        try {
            const forwardPathName = "newCarer";
            router.push({ pathname: "./aboutUs/privacyPage", params: { username, token, forwardPathName } });
        } catch (error) {
            Alert.alert("Error", "Unable to route");
        }
    };

    const routeToEditCarer = (carerId: number) => {
        try {
            router.push({ pathname: "./editCarer", params: { username, token, carerId } });
        } catch (error) {
            Alert.alert("Error", "Unable to route");
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Contact a carer" />
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    onPress={routeToAddCarer}
                    style={styles.createButton}>
                    <Text style={styles.createButtonText}>+ Create a new entry</Text>
                </TouchableOpacity>

                <View>
                    {carers.map((carer) => {
                        const fullname = (carer.data.title + " " + carer.data.name);

                        return (
                            <View key={carer.details.carerId}>
                                <View style={styles.carerEntry}>
                                    <Text style={styles.carerText}>Name: {fullname}</Text>
                                    <Text style={styles.carerText}>Phone Number: {carer.data.phone}</Text>
                                    <Text style={styles.carerText}>Email: {carer.data.email}</Text>
                                    <TouchableOpacity onPress={() => routeToEditCarer(carer.details.carerId)} style={styles.createButtonSmall}>
                                        <Text style={styles.linkText}>Edit Or Delete Carer</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <View style={styles.carerContainer}></View>
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
    },
    createButton: {
        backgroundColor: "#504475",
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 27,
        alignItems: "center",
    },
    createButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    carerEntry: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#65558F",
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },
    carerText: {
        color: "#fff",
        fontSize: 16,
    },
    linkText: {
        fontSize: 12,
        color: "#b9cc10", // A yellow colour
        textDecorationLine: "underline",
    },
    carerContainer: {
        paddingBottom: 80,
    },
    createButtonSmall: {
        backgroundColor: "#504475",
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 27,
        alignItems: "center",
        height: (screenHeight * 0.05),
    },
    warning: {
        fontSize: 14,
        color: "red",
        fontWeight: "bold",
    },
    warningBox: {
        paddingVertical: 7,
        alignContent: "center",
        alignSelf: "center",
    },
});
