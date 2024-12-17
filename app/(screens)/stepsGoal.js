import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebaseConfig";

const DailyStepsPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [dailySteps, setDailySteps] = useState(5000);

  useEffect(() => {
    const fetchDailySteps = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const { dailySteps } = userDoc.data();
            setDailySteps(dailySteps || 5000);
          }
        } catch (error) {
          console.error("Error fetching daily steps:", error);
        }
      }
    };

    fetchDailySteps();
  }, [user]);

  const updateDailySteps = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { dailySteps });
      Alert.alert("Success", "Daily steps updated successfully!");
    } catch (error) {
      console.error("Error updating daily steps:", error);
    }
  };

  return (
    <View className="flex-1 bg-black items-center px-6 py-4">
      {/* First Row - Back Arrow */}
      <View className="w-full mt-8">
        <TouchableOpacity
          className="w-10 h-10 bg-teal-400 rounded-full justify-center items-center"
          onPress={() => router.replace("stepTracker")}
        >
          <FontAwesome name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Second Row - Title */}
      <View className="w-full mt-4">
        <Text className="text-white text-3xl font-bold text-center">
          Daily Steps
        </Text>
      </View>

      {/* Description Section */}
      <View className="items-center mt-6">
        <Text className="text-gray-400 text-lg mt-2">
          Adjust your daily step target
        </Text>
      </View>

      {/* Image Section */}
      <View className="items-center mt-6">
        <Image
          source={require("../../assets/images/walking.png")}
          className="w-72 h-56"
          resizeMode="contain"
        />
      </View>

      {/* Adjust Section */}
      <View className="flex-row items-center mt-10 space-x-8">
        <TouchableOpacity
          className="bg-teal-400 w-12 h-12 rounded-full justify-center items-center"
          onPress={() => setDailySteps((prev) => Math.max(0, prev - 500))}
        >
          <Text className="text-white text-2xl font-bold">-</Text>
        </TouchableOpacity>

        {/* Displaying Step Count with Input Field */}
        <TextInput
          value={String(dailySteps)}
          onChangeText={(text) => setDailySteps(Number(text))}
          keyboardType="numeric"
          className="text-white text-3xl font-bold text-center border-b-2 border-teal-400 w-32"
        />

        <TouchableOpacity
          className="bg-teal-400 w-12 h-12 rounded-full justify-center items-center"
          onPress={() => setDailySteps((prev) => prev + 500)}
        >
          <Text className="text-white text-2xl font-bold">+</Text>
        </TouchableOpacity>
      </View>

      {/* Change Steps Button */}
      <TouchableOpacity
        className="bg-teal-400 w-full py-2 rounded-full items-center mt-20"
        onPress={updateDailySteps}
      >
        <Text className="text-white text-lg font-bold">Update Daily Steps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DailyStepsPage;
