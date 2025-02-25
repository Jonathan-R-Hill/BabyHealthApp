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
import termData from "./terminologyData";
//Data for the terminology
const categoryDataUse = termData

export default function TerminologySection() {
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

  const renderSection = ({ item }: { item: (typeof categoryDataUse)[0] }) => {
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


  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Terminology</Text>

      {/* Categories for terminology */}
      <View style={styles.listContainer}>
        {/*<ScrollView>*/}
          <FlatList
            data={categoryDataUse}
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