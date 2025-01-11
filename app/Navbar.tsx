import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const pages = {
  Diary: "/appPages/diary/main",
  "Main Menu": "/appPages/mainMenu",
  "Ask our Bot": "/appPages/bot/main",
  Settings: "/appPages/settings/main",
  "Baby Log": "/appPages/babyLog/main",
  "Contact Us": "/appPages/contactUs/main",
  "Baby Care Advice": "/appPages/adviceSection/main",
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For handling the dropdown visibility
  const router = useRouter();

  const navigateTo = (pageKey: keyof typeof pages) => {
    const path = pages[pageKey];
    router.push(path as any);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.navbarContainer}>
      {/* MainMenu, Diary, AskBot buttons */}
      <TouchableOpacity
        onPress={() => navigateTo("Main Menu")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Main Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateTo("Diary")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Diary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateTo("Ask our Bot")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Ask our Bot</Text>
      </TouchableOpacity>

      {/* Dropdown Button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.navButton}>
        <Text style={styles.navButtonText}>More</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <View style={styles.popoutMenu}>
          {Object.keys(pages).map((pageKey) => {
            if (
              pageKey !== "Main Menu" &&
              pageKey !== "Diary" &&
              pageKey !== "Ask our Bot"
            ) {
              return (
                <TouchableOpacity
                  key={pageKey}
                  onPress={() => navigateTo(pageKey as keyof typeof pages)}
                  style={styles.navButton}
                >
                  <Text style={styles.navButtonText}>
                    {pageKey.charAt(0).toUpperCase() + pageKey.slice(1)}
                  </Text>
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
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#3498db",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  popoutMenu: {
    position: "absolute",
    bottom: "100%", // move the menu above the navbar
    left: 0,
    right: 0,
    backgroundColor: "#2980b9",
    paddingVertical: 10,
    alignItems: "center",
    zIndex: 100,
  },
});

export default Navbar;
