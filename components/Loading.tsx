import { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
    return () => {
      spinAnim.stopAnimation()
    } 
  }, []);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex flex-1 flex-col justify-center gap-2"  pointerEvents="none">
      <Animated.View className="w-fit h-fit" style={{ transform: [{ rotate: spin }] }}>
        <FontAwesome5 name="car-side" className="w-fit h-fit" size={24} color="black" />
      </Animated.View>
      <Text className="mt-2 text-center text-xl font-inter">Give us a moment to process</Text>

        <View className="m-4">
              <Alert message="Note: This may take up to 20 seconds to complete" isWarning={true} />

        </View>
    </View>
  );
}
