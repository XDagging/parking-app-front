import {useEffect, useState} from "react";
import {View, Text} from "react-native"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ToastType } from "types";





export default function Toast(props: ToastType) {
    const [isWarning, setIsWarning] = useState<boolean>(props.isWarning);

    
    useEffect(() => {
        if (typeof props.message === "string" && props.message.length>0) {
            console.log("Toast opened")
        
        }   
        setIsWarning(props.isWarning);
    }, [props.message])


    
    return (
        



        <View  pointerEvents="none">
        {(props.message&&props.message.length>0) && (


            isWarning ? 
                <View className="bg-error p-3 text-error-content flex-row items-center gap-2 ">
                    <MaterialIcons name="error" size={24} color="black" />
                    <Text className="font-inter text-error-content">
                        {props.message}
                    </Text>
                </View>

                 : 

                 <View className="bg-success text-success-content shadow-md flex-row items-center gap-2 border-b p-3">
                   <MaterialCommunityIcons name="hand-okay" size={24} color="black" />
                   <Text className="font-inter text-success-content">
                       {props.message}
                   </Text>
               </View>
        )}
        </View>

        
    )


}