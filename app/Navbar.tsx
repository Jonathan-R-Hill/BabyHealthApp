import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const pages = {
  diary: "/appPages/diary/main",
  mainMenu: "/appPages/mainMenu",
  profile: "/appPages/profile",
  askBot: "/appPages/bot/main",
  settings: "/appPages/settings/main",
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For handling the dropdown visibility
  const router = useRouter();

  const navigateTo = (pageKey: keyof typeof pages) => {
    const path = pages[pageKey];
    router.push(path as any);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the dropdown
  };

  return (
    <View style={styles.navbarContainer}>
      {/* MainMenu, Diary, AskBot buttons */}
      <TouchableOpacity
        onPress={() => navigateTo("mainMenu")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>MainMenu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateTo("diary")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>Diary</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateTo("askBot")}
        style={styles.navButton}
      >
        <Text style={styles.navButtonText}>AskBot</Text>
      </TouchableOpacity>

      {/* Dropdown Button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.navButton}>
        <Text style={styles.navButtonText}>More Options</Text>
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <View style={styles.popoutMenu}>
          {Object.keys(pages).map((pageKey) => {
            if (
              pageKey !== "mainMenu" &&
              pageKey !== "diary" &&
              pageKey !== "askBot"
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
    top: -80, // Adjust this value to control how far the dropdown goes
    left: 0,
    right: 0,
    backgroundColor: "#2980b9",
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default Navbar;
