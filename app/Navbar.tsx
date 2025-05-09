import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Define navigation pages and their corresponding paths
const pages = {
  Charts: "/appPages/charts/charts",
  Diary: "/appPages/diary/main",
  "Baby Care": "/appPages/adviceSection/main",
  Settings: "/appPages/settings/appSettings",
  "Baby Log": "/appPages/babyLog/main",
  "Contact Us": "/appPages/contactUs/main",
  Terminology: "/appPages/terminology/main",
  "Additional Organisations": "/appPages/additionalOrganisations/main",
  // Chatbot: "/appPages/bot/main",
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track menu open/close state
  const router = useRouter();
  const { username, token } = useLocalSearchParams(); // Extract parameters from the route

  // Function to return an appropriate icon based on the page name
  const getIcon = (pageName: string, size: number = 24) => {
    switch (pageName) {
      case "Chatbot":
        return <MaterialCommunityIcons name="robot" size={size} color="#fff" />;
      case "Charts":
        return <Ionicons name="bar-chart-outline" size={size} color="#fff" />;
      case "Diary":
        return (
          <MaterialCommunityIcons
            name="book-open-variant"
            size={size}
            color="#fff"
          />
        );
      case "Baby Care":
        return (
          <MaterialCommunityIcons
            name="baby-carriage"
            size={size}
            color="#fff"
          />
        );
      case "Settings":
        return <Ionicons name="settings-outline" size={size} color="#fff" />;
      case "Baby Log":
        return (
          <MaterialCommunityIcons
            name="baby-face-outline"
            size={size}
            color="#fff"
          />
        );
      case "Contact Us":
        return <Ionicons name="mail-outline" size={size} color="#fff" />;
      case "Terminology":
        return <Ionicons name="search" size={size} color="#fff" />;
      case "Additional Organisations":
        return <Ionicons name="business" size={size} color="#fff" />;
      default:
        return <Ionicons name="ellipsis-horizontal" size={size} color="#fff" />;
    }
  };

  // Function to navigate to a selected page
  const navigateTo = (pageKey: keyof typeof pages) => {
    const path = pages[pageKey];
    router.push({ pathname: path as any, params: { username, token } }); // Navigate with parameters
    setIsMenuOpen(false); // Close the menu after navigation
  };

  // Define the main navigation items
  const mainItems = ["Terminology", "Charts", "Diary", "Baby Care"];

  return (
    <View style={styles.navbarContainer}>
      {/* Main navigation buttons */}
      <View style={styles.mainButtonsContainer}>
        {mainItems.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => navigateTo(item as keyof typeof pages)}
            style={styles.navButton}
          >
            {getIcon(item)}
            <Text style={styles.navButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}

        {/* More button to open dropdown menu */}
        <TouchableOpacity
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          style={styles.navButton}
        >
          {getIcon("more")}
          <Text style={styles.navButtonText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown menu for additional pages */}
      {isMenuOpen && (
        <View style={styles.popoutMenu}>
          {Object.keys(pages).map((pageKey) => {
            if (!mainItems.includes(pageKey)) {
              return (
                <TouchableOpacity
                  key={pageKey}
                  onPress={() => navigateTo(pageKey as keyof typeof pages)}
                  style={styles.menuItem}
                >
                  {getIcon(pageKey)}
                  <Text style={styles.menuItemText}>{pageKey}</Text>
                </TouchableOpacity>
              );
            }
            return null;
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#65558F",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 1,
    marginTop: 30,
    zIndex: 20,
  },
  mainButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  popoutMenu: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#65558F",
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuItemText: {
    color: "#fff",
    marginLeft: 15,
    fontSize: 16,
  },
});

export default Navbar;
