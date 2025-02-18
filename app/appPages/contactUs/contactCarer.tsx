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

interface Carers {
    technicalDetails: {
        entry_id: number //unique identifier for the carer
        user_id: string //unique identifier for the user
    };
    carerData: {
        firstName: string 
        surname: string
        title: string //title such as Sir, Dr, Mr, Miss, ect
        phoneNumber: number
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
            //const data: Carers[] = getDataOnCarers()
            //setCarers(data);
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

      return (
        <View style = {styles.container}>
            <ScrollView style = {styles.scrollView}>
                {/*{carers.map((carer) => {
                    const fullname = (carer.carerData.title + " " + carer.carerData.surname + " (" + carer.carerData.firstName + ")");
                })}*/}
            </ScrollView>
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
    }
});