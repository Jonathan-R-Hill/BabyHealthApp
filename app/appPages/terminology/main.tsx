import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../../Navbar";
import termData from "./terminologyData";
import Header from "@/app/Header";

export default function TerminologySection() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((sectionId) => sectionId !== id)
        : [...prev, id]
    );
  };

  const filteredData = termData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const renderSection = ({ item }: { item: (typeof termData)[0] }) => {
    const isExpanded = expandedSections.includes(item.id);
    const truncatedContent =
      item.content.length > 100
        ? `${item.content.substring(0, 100)}...`
        : item.content;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleSection(item.id)}
      >
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardContent}>
          {isExpanded ? item.content : truncatedContent}
          {!isExpanded && item.content.length > 100 && (
            <Text style={styles.expandText}> expand on tap</Text>
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      {/* <Text style={styles.title}>Terminology</Text> */}
      <Header title="Terminology"/>

      {/* Search Bar */}
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

      {/* Terminology List */}
      <FlatList
        data={filteredData}
        renderItem={renderSection}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Navbar */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4A4A4A",
    marginVertical: 10,
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
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: "#666",
  },
  expandText: {
    color: "#E74C3C",
    fontWeight: "600",
  },
});
