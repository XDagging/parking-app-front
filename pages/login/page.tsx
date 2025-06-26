import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import callApi, { isEmail, isPassword, isString, saveAuth } from "functions";

type User = {
  email: string;
  password: string;
};

type RootStackParamList = {
  Index: undefined;
  Dashboard: undefined;
  Login: undefined;
};

let interval: ReturnType<typeof setInterval>;
export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [currentError, setCurrentError] = useState<string | null>(null);

  useEffect(() => {
    // Clear the error after 3 seconds
    if (currentError) {
      interval = setTimeout(() => {
        setCurrentError(null);
      }, 3000);
    }

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(interval);
    };


  }, [currentError])

  const handleSubmit = () => {
    if (!user.email || !user.password) {
      setCurrentError("Please fill in all fields.");
      return;
    } else if (!isEmail(user.email)) {
      setCurrentError("Please enter a valid email address.");
      return;
    } else if (!isPassword(user.password)) {
      setCurrentError("Password is not valid");
      return;
    }

    console.log("passed all the checks")
    callApi("/login", "POST", user).then(async(res) => {
      console.log("Response from login:", res);
      if (res.code === "err") {
        setCurrentError("Invalid Credentials");
      } else if (res.code === "ok") {
        const token = JSON.parse(res.message).token;
        await saveAuth(token);
        navigation.navigate("Dashboard");
      } else {
        setCurrentError("An unexpected error occurred.");
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f5f9" }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-base-100 rounded-2xl shadow-lg p-6 mt-2">
              <Text className="font-bold text-center text-2xl font-inter mb-6 text-primary">
                Welcome Back
              </Text>

              <View className="gap-6">
                {/* Name */}


                {/* Email */}
                <View>
                  <Text className="mb-2 text-lg font-semibold text-base-content">
                    Email
                  </Text>
                  <TextInput
                    onChangeText={(e) =>
                      setUser((prev) => ({ ...prev, email: e }))
                    }
                    value={user.email}
                    className="border-b-2 border-primary pb-3 px-2 text-base rounded-md bg-base-200"
                    placeholder="john@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>

                {/* Password */}
                <View>
                  <Text className="mb-2 text-lg font-semibold text-base-content">
                    Password
                  </Text>
                  <TextInput
                    onChangeText={(e) =>
                      setUser((prev) => ({ ...prev, password: e }))
                    }
                    value={user.password}
                    secureTextEntry
                    className="border-b-2 border-primary pb-3 px-2 text-base rounded-md bg-base-200"
                    placeholder="••••••••"
                    placeholderTextColor="#A0AEC0"
                  />
                </View>
              </View>
              <Text className="text-base-content text-center mt-4">
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Index")}
                >
                  <Text className="text-primary font-semibold text-center">
                    Create an account
                  </Text>
                </TouchableOpacity>

              <TouchableOpacity
                className="mt-8 bg-accent rounded-full py-4 shadow-md"
                onPress={handleSubmit}
              >
                <Text className="text-center text-xl font-bold text-accent-content font-inter">
                  Login
                </Text>
              </TouchableOpacity>

              {currentError && (
                <Text className="text-center text-error mt-4 font-medium">
                  {currentError}
                </Text>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
