// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import React, {useEffect} from "react";
// import Index from "pages/page"
import Dashboard from "pages/main/page";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import './global.css';
// import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
// import { Sora_400Regular, Sora_600SemiBold } from '@expo-google-fonts/sora';
// import * as SplashScreen from 'expo-splash-screen';

export default function App() {

  // const [fontsLoaded] = useFonts({
  //         Inter_400Regular,
  //         Inter_700Bold,
  //         Sora_400Regular,
  //         Sora_600SemiBold,
  //     });
  
  //     useEffect(() => {
  //         if (fontsLoaded) {
  //             SplashScreen.hideAsync();
  //         }
  //     }, [fontsLoaded]);
  
  //     if (!fontsLoaded) {
  //         return null; // Or a loading component
  //     }
  return (
    <>

  
         <Dashboard />

   

    </>
  );
}
