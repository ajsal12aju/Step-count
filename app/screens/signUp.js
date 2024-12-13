import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BgImage = require("../../assets/images/backgroundImages/bg5.jpg");
import Colors from "../utils/colors";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignUpPress = () => {
    console.log("Name:", form.name);
    console.log("Email:", form.email);
    console.log("Password:", form.password);
    // Add your sign-up logic here (e.g., API call)
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
      imageStyle={{ opacity: 1.5 }}
    >
      <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-8 pt-12">
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
              }}
              className="w-36 h-36"
              resizeMode="contain"
            />
          </View>
          <Text className="text-3xl font-bold text-center mb-6" style={{ color: Colors.primary }}>
            Create an Account
          </Text>
          <Text className="text-sm text-gray-300 text-center mb-8">
            Please sign up to continue
          </Text>
          <View className="mx-6">
            <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-full bg-white mb-4 shadow-sm">
              <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={form.name}
                onChangeText={(value) => handleInputChange("name", value)}
              />
            </View>
            <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-full bg-white mb-4 shadow-sm">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
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
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-gray-800"
                placeholder="Enter your password"
                secureTextEntry={true}
                placeholderTextColor="#9CA3AF"
                value={form.password}
                onChangeText={(value) => handleInputChange("password", value)}
              />
            </View>
            <TouchableOpacity
              className="w-full h-12 rounded-full justify-center items-center shadow-md mb-6"
              onPress={handleSignUpPress}
              style={{ backgroundColor: Colors.btn }}
            >
              <Text className="text-white text-lg font-semibold">Sign Up</Text>
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
              Already have an account?{" "}
              <Text
                className="text-white-100 font-bold"
                onPress={() => router.replace("screens/signIn")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default SignUp;
