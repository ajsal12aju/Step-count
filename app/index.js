import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Starter = () => {
  return (
    <View className="flex-1 item-center justify-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

export default Starter;
