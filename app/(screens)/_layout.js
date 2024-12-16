import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "../../hooks/auth/auth";

const Layout = () => {
  const { logOut } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = async () => {
    const response = await logOut();
    console.log("Logout Response:", response);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Screen content */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Sticky Bottom Menu */}
      <View className="absolute bottom-0 left-0 right-0 bg-gray-800 flex-row justify-around py-4 border-t border-gray-700">
        <TouchableOpacity
          className="items-center"
          onPress={() => router.replace("remider")}
        >
          <FontAwesome name="bell" size={20} color="#76c7c0" />
          <Text className="text-white text-xs">Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => router.replace("water")}
        >
          <FontAwesome name="tint" size={20} color="#76c7c0" />
          <Text className="text-white text-xs">Water</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => router.replace("stepTracker")}
        >
          <FontAwesome name="bullseye" size={20} color="#76c7c0" />
          <Text className="text-white text-xs">Steps</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center" onPress={toggleModal}>
          <FontAwesome name="user" size={20} color="#76c7c0" />
          <Text className="text-white text-xs">Account</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Logout */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-4/5 p-5 bg-white rounded-lg shadow-xl">
            <TouchableOpacity
              className="bg-gray-200 p-4 rounded mb-4"
              onPress={handleLogout}
            >
              <Text className="text-gray-700 text-center">Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-400 p-4 rounded"
              onPress={toggleModal}
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Layout;
