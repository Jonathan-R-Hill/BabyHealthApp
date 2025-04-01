import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Navbar from "../../Navbar";
import { prematureCategoryData } from "./adviceData";
import Header from "@/app/Header";
import { ReusableButton } from "@/components/ReusableButton";
import { Ionicons } from "@expo/vector-icons";
//Data for the advice categories
const categoryData = prematureCategoryData;

export default function PrematureAdviceSection() {
  const router = useRouter();

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { username, token } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = categoryData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    );
  };

  const renderSection = ({ item }: { item: (typeof filteredData)[0] }) => {
    const isExpanded = expandedSections.includes(item.id);
    return (
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => toggleSection(item.id)}
          style={styles.sectionHeader}
        >
          <Text style={styles.sectionTitle}>{item.title}</Text>
        </TouchableOpacity>
        {isExpanded && (
          <Text style={styles.sectionContent}>{item.content}</Text>
        )}
      </View>
    );
  };

  const generalAdvice = () => {
    try {
      console.log("Button Pressed");
      router.push({ pathname: "./main", params: { username, token } });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to the correct page");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Header title="Premature Baby Care Advice" />

      {/* Button Placement */}
      {/* <TouchableOpacity style={styles.chartButton} onPress={generalAdvice}>
        <Text style={styles.chartButtonText}>Go to general birth advice</Text>
      </TouchableOpacity> */}

      <ReusableButton
        title="Go to general birth advice"
        // style={{margintop}}
        onPress={generalAdvice}
        style={styles.chartButton}
      />
      {/*Searchbar*/}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder="Search for Terminology"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* Categories for advice */}
      <View style={styles.listContainer}>
        {/* <ScrollView> */}
        <FlatList
          data={filteredData}
          renderItem={renderSection}
          keyExtractor={(item) => item.id}
        />
        {/* </ScrollView> */}
      </View>

      {/* Navbar */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // paddingVertical: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 20,
  },
  chartButton: {
    backgroundColor: "#65558F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    // width: "50%"
  },
  chartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
    marginHorizontal: 10,
    marginBottom: 30,
    paddingBottom: 25,
  },
  section: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3498db",
    borderRadius: 5,
    padding: 5,
  },
  sectionHeader: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionContent: {
    paddingTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
