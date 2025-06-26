
import React, {useEffect} from "react";
import Index from "./pages/page";
import Dashboard from "./pages/main/page";
import Login from "./pages/login/page"
import { SafeAreaView } from 'react-native-safe-area-context';
import './global.css';
import TestScreen from "components/TestScreen";
// import { GestureHandlerRootView } from 'react-native-gesture-handler'; // <-- Add this import
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded] = useFonts({
          Inter_400Regular,
          Inter_700Bold,
          Sora_400Regular,
          Sora_600SemiBold,
      });
  
      useEffect(() => {
          if (fontsLoaded) {
              SplashScreen.hideAsync();
          }
      }, [fontsLoaded]);
  
      if (!fontsLoaded) {
          return null; // Or a loading component
      }
  return (
    <>

        {/* <SafeAreaView style={{ flex: 1 }}> */}
          {/* <Index /> */}
        {/* </SafeAreaView> */}

          {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
     {/* r screenOptions={{ headerShown: false }} */}
     <SafeAreaView style={{ flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </Stack.Navigator>
          </NavigationContainer>
      </SafeAreaView>

  
    {/* </GestureHandlerRootView> */}


   

    </>
  );
}


// App.tsx
// import React from "react";
// import { SafeAreaView, View, Text, Pressable, TouchableOpacity } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//           <TouchableOpacity
//             onPress={() => console.log("✅ Button Pressed")}
//             style={{
//               backgroundColor: "blue",
//               padding: 20,
//               borderRadius: 12,
//             }}
//           >
//             <Text style={{ color: "white" }}>Press Me</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

