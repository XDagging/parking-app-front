import {View, Pressable, Text} from "react-native"
export default function Dashboard() {
    console.log("Render at:", Date.now());
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable 
                onPress={() => console.log("PRESS:", Date.now())}
                style={{ backgroundColor: 'red', padding: 20 }}
            >
                <Text>TEST</Text>
            </Pressable>
        </View>
    );
}