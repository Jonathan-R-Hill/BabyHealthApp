import { Stack } from "expo-router";
import { Popup } from "../components/LogoutPopup"; // adjust path as needed

export default function RootLayout() {
  return (<><Stack screenOptions={{ headerShown: false }} /><Popup /></>);
}
