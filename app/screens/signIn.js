import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSignUpPress = () => {
    router.replace("screens/signUp");
  };

  const handleSignInPress = () => {
    console.log("Email:", form.email);
    console.log("Password:", form.password);
  };

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center px-6">
      <View className="items-center mb-8">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
          }}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>
      <Text className="text-3xl font-bold text-gray-800 text-center mb-6">
        Welcome Back!
      </Text>
      <Text className="text-sm text-gray-500 text-center mb-8">
        Please sign in to continue
      </Text>
      <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-md bg-white mb-4 shadow-sm">
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
      <View className="flex-row items-center w-full h-12 px-4 border border-gray-300 rounded-md bg-white mb-4 shadow-sm">
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
      <TouchableOpacity className="mb-6">
        <Text className="text-indigo-500 text-sm text-right">
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full h-12 bg-indigo-500 rounded-md justify-center items-center shadow-md mb-6"
        onPress={handleSignInPress}
      >
        <Text className="text-white text-lg font-semibold">Sign In</Text>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mb-6">
        <View className="h-px flex-1 bg-gray-300"></View>
        <Text className="text-gray-500 px-4">or</Text>
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
      <Text className="text-gray-600 text-sm text-center">
        Don't have an account?{" "}
        <Text
          className="text-indigo-500 font-semibold"
          onPress={handleSignUpPress}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default SignIn;
