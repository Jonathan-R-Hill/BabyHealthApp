import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Navbar from "../../Navbar";

//Data for the advice categories
const categoryData = [
  { id: "1", title: "Test 1", content: "Content Test 1" },
  { id: "2", title: "Test 2", content: "Content Test 2" },
  { id: "3", title: "Test 3", content: "Content Test 3" },
  { id: "4", title: "Test 4", content: "Content Test 4" },
  { id: "5", title: "Test 5", content: "Content Test 5" },
  { id: "6", title: "Test 6", content: "Content Test 6" },
  { id: "7", title: "Test 7", content: "Content Test 7" },
  { id: "8", title: "Test 8", content: "Content Test 8" },
  { id: "9", title: "Test 9", content: "Content Test 9" },
  { id: "10", title: "Test 10", content: "Content Test 10" },
  { id: "11", title: "Test 11", content: "Content Test 11" },
  { id: "12", title: "Test 12", content: "Content Test 12" },
  { id: "13", title: "Test 13", content: "Content Test 13" },
];

export default function AdviceSection() {
  const router = useRouter();

  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const { username, token } = useLocalSearchParams();

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    );
  };

  const renderSection = ({ item }: { item: (typeof categoryData)[0] }) => {
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

  const prematureAdvice = () => {
    try {
      console.log("Button Pressed");
      router.push({
        pathname: "./prematureAdvice",
        params: { username, token },
      });
    } catch (error) {
      console.error("Navigation Error", error);
      Alert.alert("Navigation Error", "Could not navigate to the correct page");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>General Baby Care Advice</Text>

      {/* Button Placement */}
      <TouchableOpacity style={styles.chartButton} onPress={prematureAdvice}>
        <Text style={styles.chartButtonText}>Go to premature birth advice</Text>
      </TouchableOpacity>

      {/* Categories for advice */}
      <View style={styles.listContainer}>
        <ScrollView>
          <FlatList
            data={categoryData}
            renderItem={renderSection}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>

      {/* Navbar */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 20,
  },
  chartButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
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
});
