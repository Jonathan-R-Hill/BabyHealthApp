import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Delay navigation to avoid errors
    const timer = setTimeout(() => {
      router.push("./loginSection/loginScreen");
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirecting to Login...</Text>
    </View>
  );
}
