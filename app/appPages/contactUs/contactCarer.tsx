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

import { getDataOnCarers } from "../../../services/contactUsService";

import Navbar from "../../Navbar";

interface Carers {
    technicalDetails: {
        entry_id: number //unique identifier for the carer
        user_id: string //unique identifier for the user
    };
    carerData: {
        firstName: string 
        surname: string
        title: string //title such as Sir, Dr, Mr, Miss, ect
        phoneNumber: string
        email: string
    }
}

export default function CarerPage()
{
    const router = useRouter();
    const [carers, setCarers] = useState<Carers[]>([]);
    const { username, token } = useLocalSearchParams();
    
    //looks at backend to get all carers' data
    const fetchAllCarers = async (username: string, token: string) => {
        try {
            const data: Carers[] = await getDataOnCarers(username, token);
            setCarers(data);
        } catch (error) {
            Alert.alert("Error", "Could not load carers")
        }
    }

    useEffect(() => { //if the username has successfully passed, then get the data
        if (username) { // do not attempt to fetch without a valid username
          fetchAllCarers(String(username), String(token));
        }
      }, [username]);

      //handles page routing
      const routeToAddCarer = () => {
        try {
            router.push({ pathname: "./newCarer", params: { username, token } });
        } catch (error) {
            Alert.alert("Error", "Unable to route")
        }
      }

      const routeToDetails = (entry_id: number) => {
        try {
          router.push({ pathname: "./carerDetails", params: { username, token, entry_id } });
        } catch (error) {
            Alert.alert("Error", "Unable to route")
        }
      }

      return (
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollView}>
              <TouchableOpacity
                  onPress={routeToAddCarer}
                  style={styles.createButton}>
                  <Text style={styles.createButtonText}>+ Create a new entry</Text>
              </TouchableOpacity>

              {carers.map((carer) => {
                  const fullname = (carer.carerData.title + " " + carer.carerData.surname + " (" + carer.carerData.firstName + ")");

                  return (
                    <View key={carer.technicalDetails.entry_id}>
                      <TouchableOpacity style={styles.carerEntry}
                          onPress={() => routeToDetails(carer.technicalDetails.entry_id)}>
                        <Text style={styles.carerText}>{fullname}</Text>
                      </TouchableOpacity>
                    </View>
                  );
              })}
                
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
    scrollView: {
      flex: 1,
      paddingHorizontal: 10,
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
    carerEntry: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#3498db",
      padding: 15,
      marginVertical: 5,
      borderRadius: 5,
    },
    carerText: {
      color: "#fff",
      fontSize: 16,
    },
});