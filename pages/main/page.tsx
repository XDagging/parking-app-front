import {View, Text, SafeAreaView, Linking, TouchableOpacity } from "react-native"
import Toast from "components/Toast";
import Loading from "components/Loading"
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { formatString, recursiveRequest } from "functions";
import type { ToastType, ParkingStatus } from "types";
import Alert from "components/Alert";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import LocationEncoder from "assets/location_encoder.json"
import ReportModal from "components/ReportModal";
import {Coordinate} from "types"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// Add type for LocationEncoder to avoid type errors
// const LocationEncoderTyped: { [key: string]: number } = LocationEncoder as { [key: string]: number };
let interval: ReturnType<typeof setInterval>;
export default function Dashboard() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);
    const changeModal = () => {
        setModalOpen((prevValue) => !prevValue)
    }
    const [parkingStatus, setParkingStatus] = useState<ParkingStatus>({
      isOpen: true,
      minutesAvailable: 40,
      url: "https://www.google.com/maps/search/?api=1&query=37.7749,-122.4194"
    });
    // const [endTime, setEndTime] = useState<number | null>(null);
    // Represents the amount of miliseconds
    const [timer, setTimer] = useState<number | null>(null)

    const [errorMsg, setErrorMsg] = useState<ToastType>({
        message: "",
        isWarning: false,
    });
    const openMap = async () => {
      console.log("Open maps was called", parkingStatus.url)
      if (parkingStatus.url&&parkingStatus.url!=="") {
        try {
        const supported = await Linking.canOpenURL(parkingStatus.url);

        if (supported) {
          await Linking.openURL(parkingStatus.url)
        } else {
          console.log("Chat this is fried.")
        }


      } catch(e) {
        console.error("Something happened here")
      }
      } else {
        console.log("parking status is undefined u bum")
      }
      



    }

   
   
    useEffect(() => {
     (async () => {
        // setLoading(true)
       let { status } = await Location.requestForegroundPermissionsAsync();
       if (status !== 'granted') {
         setErrorMsg({
            isWarning: true,
            message: "Something went wrong"
         });
         
         return;
       } else {
          setErrorMsg({
            isWarning: false,
            message: "Working as Intended"
          })
          // The api would return a Date.now() timestamp that would represent the time in which the AI "guarantees" the free spot
       }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log("latitude: ", latitude);
      // Calculate milliseconds until the end of the current hour
      const now = new Date();
      const endOfHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
      const valueGivenByApi: number = endOfHour.getTime();

      console.log(valueGivenByApi)
          console.log("Heres the thing here")
          interval = setInterval(() => {
            setTimer(valueGivenByApi - Date.now())
          }, 1000)


          
        const pred = recursiveRequest(latitude, longitude, 20, [])
        console.log("pred was called", pred) 
      //  If array, that means no parking spot was found
       if (Array.isArray(pred)) {
         setParkingStatus({
          isOpen: false,
          minutesAvailable: 0,
          url: ""

        })
       } else if (pred && typeof pred.latitude === "number" && typeof pred.longitude === "number") {
        // This means a parking spot was found
        setParkingStatus({
          isOpen: true,
          minutesAvailable: 30, // hard coded for now, but will implement later
          url: `https://www.google.com/maps/search/?api=1&query=${pred.latitude},${pred.longitude}`
        })
        
        setLocation({
          coords: {
            latitude: pred.latitude,
            longitude: pred.longitude,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
          },
          timestamp: Date.now()
        })
       } else {
        setParkingStatus({
          isOpen: false,
          minutesAvailable: 0,
          url: ""
        })
       }
       setLocation(location);
       setLoading(false)
      //  openMap()
       console.log("Full location object:", location);
     })();

     return () => {
      clearInterval(interval)
     }


   }, []);

   const requestNew = async (latitude: number, longitude: number) => {
    console.log("request new was clicked")
    setLoading(true);
    if (!parkingStatus.isOpen) {
      let location = await Location.getCurrentPositionAsync({});
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

    }
     
    const pred = recursiveRequest(latitude,longitude,20, [{latitude: latitude, longitude: longitude}])

    if (Array.isArray(pred)) {
         setParkingStatus({
          isOpen: false,
          minutesAvailable: 0,
          url: ""
        })
       } else if (pred && typeof pred.latitude === "number" && typeof pred.longitude === "number") {
        // This means a parking spot was found
        setParkingStatus({
          isOpen: true,
          minutesAvailable: 30, // hard coded for now, but will implement later
          url: `https://www.google.com/maps/search/?api=1&query=${pred.latitude},${pred.longitude}`
        })
       } else {
        setParkingStatus({
          isOpen: false,
          minutesAvailable: 0,
          url: ""
        })
       }


    setLoading(false);

   }



    return (
        <>

        <View className="flex-1">
        {/* {(errorMsg.message.length>0) && (
             <Toast isWarning={errorMsg.isWarning} message={errorMsg.message} />
        )} */}




        {loading ? <>
            <Loading />
        </> : <>
 {location !== null && (
    <>
      <ReportModal isOpen={modalOpen} setter={setModalOpen} latitude={location.coords.latitude} longitude={location.coords.longitude} />

      {parkingStatus.isOpen ? (
        <>
          <View className="">
            <View className="m-3 flex-col gap-2">
              <View className="p-2 bg-success rounded-md">
                <Text className="text-center text-success-content font-inter-bold text-lg">Parking Available</Text>
              </View>

              <View className="p-3 rounded-md border-neutral min-h-[20vh] flex-col items-center justify-center">
                {/* Timer Component */}
                {timer !== null && timer !== undefined && parkingStatus.url && (
                  <View className="flex-row items-center mx-auto gap-2 bg-primary rounded-full  px-4 py-3">
                    {/* Hours */}
                    <View>
                      <Text className="font-inter text-5xl text-primary-content">
                        {Number(new Date(timer ?? 0).getHours())}
                      </Text>
                    </View>
                    <View>
                      <Text className="font-inter text-5xl text-primary-content">:</Text>
                    </View>
                    <View>
                      <Text className="font-inter text-5xl text-primary-content">
                        {Number(new Date(timer ?? 0).getMinutes())}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-primary-content text-5xl font-inter">:</Text>
                    </View>
                    <View>
                      <Text className="font-inter text-5xl text-primary-content">
                        {new Date(timer ?? 0).getSeconds()}
                      </Text>
                    </View>
                  </View>
                )}

                <Text className="text-center text-xl font-inter-bold mt-2">Time Left</Text>
              </View>

              <View className="bg-base-300 rounded-box p-4 border-md flex-col gap-2">
                <Text className=" text-xl font-inter-bold text-center">Spot Information</Text>
                <Text className="font-inter text-lg text-center">
                  Address: {formatString(`${location.coords.latitude},${location.coords.longitude}`)}
                </Text>
                <TouchableOpacity
                  onPress={() => openMap()}
                  className="w-5/6 z-50 mx-auto p-3 bg-base-100 rounded-box flex-row gap-3 items-center justify-center"
                  style={{ minHeight: 48 }}
                >
                  <MaterialIcons name="maps-home-work" size={24} color="black" />
                  <Text className="text-center text-base-content font-inter text-xl">
                    Open in Maps
                  </Text>
                </TouchableOpacity>
                <Alert isWarning={true} message="Note: This app isn't a guarantee that this spot will be open, but rather a very calculated and informed guess. This app can be wrong. Park at your own risk." />
                <Text className="font-inter-bold text-center">Pro Tip: Try to keep your car parking for less than 45 minutes to lower your risk.</Text>
              </View>
            </View>
            <SafeAreaView className="flex-0 flex-col gap-2 items-center justify-center ">
              <TouchableOpacity onPress={() => changeModal()} className="w-5/6 z-50 p-3 bg-error hover:opacity-85 rounded-box flex-row gap-4 items-center justify-center">
                <Entypo name="flag" size={24} color="black" />
                <Text className="text-center text-white font-inter text-xl">
                  Report an Issue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                console.log("Requesting new parking spot")
                requestNew(location.coords.latitude, location.coords.longitude)}} className="w-5/6 z-50 p-3 gap-4 bg-accent rounded-box flex-row items-center justify-center">
                <AntDesign name="car" size={24} color="black" />
                <Text className="text-center text-white font-inter text-xl">
                  Request another spot
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      ) : (
        <View className="m-4 h-full">

           <View className="p-2 bg-error rounded-md">
                <Text className="text-center text-error-content font-inter-bold text-lg">Parking Unavailable</Text>
              </View>

              <View className="h-full justify-center items-center">
                <View className="mx-auto w-full my-5 flex-col  gap-4 items-center justify-center bg-base-300 rounded-box p-4">
                  <FontAwesome5 name="car-crash" size={240} color="black" />
                  <Text className="font-inter-bold text-2xl">Oops. That didn't go to plan</Text>
                </View>

                <View className=" flex-1 flex-col w-full gap-2">
          <Alert isWarning={true} message="No parking available at your location. Please try again later or move to a different area." />

          
          
<View className="mx-auto w-full flex-col gap-2">
  <TouchableOpacity
    onPress={() => {
      if (location && location.coords) {
        console.log("Requesting new parking spot");
        requestNew(location.coords.latitude, location.coords.longitude);
      }
    }}
    className=" p-3 w-full mx-auto bg-accent rounded-box flex-row justify-center gap-4 items-center"

  >
    <AntDesign name="car" size={24} color="black" />
    <Text className="text-center text-white font-inter-bold text-xl">
      Try again
    </Text>
  </TouchableOpacity>
   <TouchableOpacity onPress={() => changeModal()} className=" z-50 p-3 bg-error hover:opacity-85 rounded-box flex-row gap-4 items-center justify-center">
                <Entypo name="flag" size={24} color="black" />
                <Text className="text-center text-white font-inter text-xl">
                  Report an Issue
                </Text>
              </TouchableOpacity>
</View>


              </View>
              </View>
        
        </View>
        
     
      )}
    </>
  )}
       
        
       
 
        


        
        
        
        </>


    
}</View>
</>


)



}