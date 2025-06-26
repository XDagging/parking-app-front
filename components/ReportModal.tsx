import React, {useState, useEffect} from "react";

import {View, Text, Modal, Pressable, TextInput} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Alert from "components/Alert";
import callApi from "functions";
import type {ToastType, IntervalType} from "types"

type ReportModal = {
    isOpen: boolean,
    setter: React.Dispatch<React.SetStateAction<boolean>>
    latitude: number,
    longitude: number,
}

type RootStackParamList = {
  Index: undefined;
  Dashboard: undefined;
  Login: undefined;
};

import {
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
let interval: IntervalType;
export default function ReportModal(props: ReportModal) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [customIssue, setCustomIssue] = React.useState<string>("");
    const [toast, setToast] = useState<ToastType>({
      isWarning: true,
      message: ""
    })



    useEffect(() => {
      interval = setTimeout(() => {
        setToast({
          isWarning: true,
          message: ""
        })


      },3000)
      return () => {
        clearTimeout(interval);
      
      }

      console.log("current toast value", toast)
   


    }, [toast])




    const handleReport = (type: string) => {
      if (type.length>0) {



        // Call the API to report the issue
        callApi("/reportError", "POST", { type: type.toLowerCase(), latitude: props.latitude, longitude: props.longitude }).then((res) => {
          if (res.code === "ok") {
            // All good!
            // Handle successful report
            setToast({
                isWarning: false,
                message: "Issue reported successfully! Thank you for your feedback."
              })
            setTimeout(() => {
                setToast({
          isWarning: true,
          message: ""
        })
               props.setter(false)
            }, 2000)
           
          } else {
             setToast({
                isWarning: true,
                message: "You aren't logged in."
              })
            setTimeout(() => {
  setToast({
          isWarning: true,
          message: ""
        })
             
              navigation.navigate("Login");
props.setter(false)
            }, 2000)
            
            // User is not logged in, redirect to login

          }
             console.log(res)
        });

          
      } else {
        // Handle empty issue
        setToast({
          isWarning: true,
          message: "Please enter a valid issue."
        })
      }


      


    
    }




    return (


        <>

        {props.isOpen && (
  <Modal
          animationType="slide"

          visible={props.isOpen}
          onRequestClose={() => {
            props.setter(false);
          }}>
          <View className="">
            <View className="m-2 p-4 rounded-md bg-base-300">

              {toast.message && toast.message.length > 0 && (
                <View className="mb-4">
                    <Alert isWarning={toast.isWarning} message={toast.message} />
                  </View>
              
              )}
              

              <View className="flex-row justify-start items-center gap-4">
                <FontAwesome name="wrench" size={24} color="black" />
                <Text className="font-inter-bold text-2xl">Report an Issue</Text>

              
              </View>


              <View className="my-4 bg-base-100 rounded-box p-4 flex-col gap-4">
                    <Text className="font-inter text-center text-xl">Common Issues</Text>


                    <Pressable className="bg-secondary flex-row p-4 justify-center  rounded-box items-center gap-4" onPress={() => handleReport("spot-not-available")}>
                        <FontAwesome name="exclamation-circle" size={24} color="black" />
                        <Text className="text-secondary-content text-center font-inter text-xl">Spot wasn't available</Text>

                    </Pressable>


                     <Pressable className="bg-primary flex-row p-4 justify-center  rounded-box items-center gap-4" onPress={() => handleReport("got-ticketed")}>
                        <FontAwesome name="exclamation-circle" size={24} color="black" />
                        <Text className="text-primary-content text-center font-inter text-xl">I got ticketed</Text>

                    </Pressable>
              </View>
             
              <View className="bg-base-100 rounded-box p-4 flex-col gap-2">
                <Text className="text-center font-inter text-xl">
                    Report Custom Issue
                </Text>

                <TextInput
                value={customIssue}
                onChange={(e) => setCustomIssue(e.nativeEvent.text)}
                    multiline={true}
                    className="border rounded-box border-dashed font-inter p-5"
                    placeholder="It took really long to load spots"
                >



                



                </TextInput>


                <Pressable
                    className="px-6 py-3 bg-accent rounded-box"
                    onPress={() => handleReport(customIssue)}>
                    <Text className="font-inter text-center text-lg text-base-content">Submit Issue</Text>
                </Pressable>






              </View>


             
            </View>
          <View className="">
          <Pressable className="bg-success w-5/6 mx-auto flex-row p-4 justify-center mt-6  rounded-box items-center gap-4"
   onPress={() => props.setter(false)}>
                        
                        <Text className="text-base-content text-center font-inter text-xl">Go Back</Text>

                    </Pressable>
          </View>
   

          
          </View>
        </Modal>
        )}

      
        
        
        
        
        
        </>

    )
}