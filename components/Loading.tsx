import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Alert from "./Alert";
// import { styled } from "nativewind";

// NativeWind compatible wrappers

export default function Loading() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex gap-2 items-center">
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="loading1" size={48} color="black" />
      </Animated.View>
      <Text className="mt-2 text-center text-xl font-inter">Give us a moment to process</Text>

        <View className="m-4">
              <Alert message="Note: This may take up to 20 seconds to complete" isWarning={true} />

        </View>
    </View>
  );
}
