import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveEmail = async (email: string) => {
  try {
    await AsyncStorage.setItem("userEmail", email);
  } catch (error) {
    console.error("Error saving email", error);
  }
};

export const getEmail = async () => {
  try {
    const email = await AsyncStorage.getItem("userEmail");
    return email;
  } catch (error) {
    console.error("Error retrieving email", error);
  }
};
