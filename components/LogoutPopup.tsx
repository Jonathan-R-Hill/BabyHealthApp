import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { EventEmitter } from "events";

// Singleton event emitter
const popupEmitter = new EventEmitter();

// Popup component (should be rendered once globally)
export function Popup() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const showListener = () => setIsModalVisible(true);
    const hideListener = () => setIsModalVisible(false);

    popupEmitter.on("showPopup", showListener);
    popupEmitter.on("hidePopup", hideListener);

    return () => {
      popupEmitter.removeListener("showPopup", showListener);
      popupEmitter.removeListener("hidePopup", hideListener);
    };
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)} // Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.label}>
            Your token has been invalidated, please log in again
          </Text>
          <View style={styles.buttonBlock}>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false); // Hide modal
                router.replace("/loginSection/loginScreen");
              }}
              style={styles.deleteButton}
            >
              <Text style={styles.createButtonText}>Return To Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Public functions you can call from anywhere
export function popup() {
  popupEmitter.emit("showPopup");
}

export function hide() {
  popupEmitter.emit("hidePopup");
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#dde2eb",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width: "80%",
    maxWidth: 400,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonBlock: {
    flexDirection: "column",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});