import React from "react";
import { View, Text, Pressable } from "react-native";

export default function TestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      <Pressable
        onPress={() => console.log("✅ Button Pressed")}
        style={{ backgroundColor: "blue", padding: 20, borderRadius: 10 }}
      >
        <Text style={{ color: "white" }}>Press me</Text>
      </Pressable>
    </View>
  );
}
