import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Toast from "components/Toast";

type User = {
    email: string;
    password: string;
    name: string;
};

export default function Index() {
    const [user, setUser] = useState<User>({
        email: "",
        password: "",
        name: "",
    });

    return (
        <View className=" bg-base-200 justify-center">
            <Toast isWarning={false} message="Ts pmo icl" />

            {/* <View className="bg-base-300 p-4 rounded-b-3xl mb-6">
                <Text className="font-bold text-2xl text-center text-primary mb-1">
                    Ephride
                </Text>
                <Text className="text-center text-base-content text-lg">
                    Parking Done Easy
                </Text>
            </View> */}

            <View className="bg-base-100 mx-4 rounded-2xl shadow-lg p-6 mt-2">
                <Text className="font-bold text-center text-2xl font-inter mb-6 text-primary">
                    Start Making Parking Easy
                </Text>

                <View className="gap-6">
                    <View>
                        <Text className="mb-2 text-lg font-semibold text-base-content">
                            Name
                        </Text>
                        <TextInput
                            onChangeText={(e) => {
                                setUser((prevUser) => ({ ...prevUser, name: e }));
                            }}
                            value={user.name}
                            className="border-b-2 border-primary pb-3 px-2 text-base rounded-md bg-base-200"
                            placeholder="John Smith"
                            placeholderTextColor="#A0AEC0"
                        />
                    </View>

                    <View>
                        <Text className="mb-2 text-lg font-semibold text-base-content">
                            Email
                        </Text>
                        <TextInput
                            onChangeText={(e) => {
                                setUser((prevUser) => ({ ...prevUser, email: e }));
                            }}
                            value={user.email}
                            className="border-b-2 border-primary pb-3 px-2 text-base rounded-md bg-base-200"
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            placeholderTextColor="#A0AEC0"
                            autoCapitalize="none"
                        />
                    </View>

                    <View>
                        <Text className="mb-2 text-lg font-semibold text-base-content">
                            Password
                        </Text>
                        <TextInput
                            onChangeText={(e) => {
                                setUser((prevUser) => ({ ...prevUser, password: e }));
                            }}
                            secureTextEntry={true}
                            value={user.password}
                            className="border-b-2 border-primary pb-3 px-2 text-base rounded-md bg-base-200"
                            placeholder="••••••••"
                            placeholderTextColor="#A0AEC0"
                        />
                    </View>
                </View>

                <Pressable
                    className="mt-8 bg-accent rounded-full py-4 shadow-md"
                    onPressIn={() => {
                        setUser((prevUser) => ({ ...prevUser, name: "" }));
                    }}
                >
                    <Text className="text-center text-xl font-bold text-accent-content font-inter">
                        Finish your account
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
