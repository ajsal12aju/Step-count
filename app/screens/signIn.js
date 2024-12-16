import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BgImage = require("../../assets/images/backgroundImages/bg2.jpg");
import Colors from "../utils/colors";
import { useAuth } from "../../hooks/auth/auth";

const SignIn = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUpPress = () => {
    router.replace("signUp");
  };

  const handleSignInPress = async () => {
    try {
      const response = await login(form?.email, form?.password);
      if (response?.success) {
        setErrorMessage("");
      } else {
        setErrorMessage("invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  return (
    <ImageBackground
      source={BgImage}
      style={{ flex: 1, resizeMode: "cover" }}
      imageStyle={{ opacity: 1 }}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="items-center mb-6 pt-12">
              <Image
                source={require("../../assets/images/user.png")}
                style={{ width: 70, height: 70 }}
                resizeMode="contain"
              />
            </View>
            <Text
              className="text-3xl font-bold text-center mb-6"
              style={{ color: Colors.primary }}
            >
              Welcome Back!
            </Text>
            <Text className="text-sm text-gray-300 text-center mb-8">
              Please sign in to continue
            </Text>

            {/* Display Error Message */}

            <View className="mx-6">
              <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-full bg-white mb-4 shadow-sm">
                <Ionicons name="mail-outline" size={20} color="#76c7c0" />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  placeholderTextColor="#9CA3AF"
                  value={form.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                />
              </View>
              <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-full bg-white mb-4 shadow-sm">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#76c7c0"
                />
                <TextInput
                  className="flex-1 ml-3 text-gray-800"
                  placeholder="Enter your password"
                  secureTextEntry={true}
                  placeholderTextColor="#9CA3AF"
                  value={form.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                />
              </View>
              {errorMessage ? (
                <Text className="text-red-500 text-center mb-4">
                  {errorMessage}
                </Text>
              ) : null}
              <TouchableOpacity className="mb-6">
                <Text className="text-gray-300 text-sm text-right">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="w-full h-12 rounded-full justify-center items-center shadow-md mb-6"
                onPress={handleSignInPress}
                style={{ backgroundColor: Colors.btn }}
              >
                <Text className="text-white text-lg font-semibold">
                  Sign In
                </Text>
              </TouchableOpacity>
              <View className="flex-row items-center justify-center mb-6">
                <View className="h-px flex-1 bg-gray-300"></View>
                <Text className="text-gray-300 px-4">or</Text>
                <View className="h-px flex-1 bg-gray-300"></View>
              </View>
              <View className="flex-row justify-center space-x-6 mb-6">
                <TouchableOpacity className="p-4 rounded-md bg-white border border-gray-200 shadow-md mr-2">
                  <Ionicons name="logo-google" size={28} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity className="p-4 rounded-md bg-white border border-gray-200 shadow-md mr-2">
                  <Ionicons name="logo-facebook" size={28} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity className="p-4 rounded-md bg-white border border-gray-200 shadow-md">
                  <Ionicons name="logo-apple" size={28} color="#000000" />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-300 text-sm text-center">
                Don't have an account?{" "}
                <Text
                  className="text-white font-semibold"
                  onPress={handleSignUpPress}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
