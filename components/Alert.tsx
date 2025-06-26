import {View, Text} from "react-native";
import { AlertType } from "types";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Alert(props: AlertType) {







    return (
        <View  pointerEvents="none">

      
        {(props.message&&props.message.length>0) && (
            (props.isWarning) ? 

            <View className="flex-col bg-error p-3 rounded-box mt-3 text-error-content gap-4 items-center">


                <View>
                    <AntDesign name="warning" size={24} color="black" />
                </View>

                <View className="">
                    <Text className="font-inter text-center text-error-content">{props.message}</Text>
                </View>
                
                



            
            
            </View>

            : <View className="flex-row bg-success p-3 rounded-box mt-3 text-success-content gap-3 items-center">


                <View>
                    <AntDesign name="checkcircleo" size={24} color="black" />
                </View>

                
                <View className="flex-row">
                    <Text className="font-inter text-lg flex-1 flex-wrap text-success-content">{props.message}</Text>
                </View>
                
                



            
            
            </View>
        


        )}


        




  </View>



    )


}