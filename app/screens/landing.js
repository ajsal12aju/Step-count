import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

const LandingPage = () => {
    const router = useRouter();

    const handleSignUpPress = () => {
        router.replace("screens/signUp");
      };

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundImages/bg3.jpg")} 
      style={styles.background}
    >
      <View style={styles.gradientOverlay} />

      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Unleash Your Potential</Text>
        <Text style={styles.subheading}>
          Every journey begins with a single step. Let’s make yours extraordinary.
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleSignUpPress}>
          <Text style={styles.startButtonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 35,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 400,
  },
  subheading: {
    fontSize: 18,
    color: "#d1d5db",
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: "#38B2AC",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingPage;
