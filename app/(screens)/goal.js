import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";


const DailyGoalPage = () => {
  const { user } = useContext(AuthContext);
  const [waterGoal, setWaterGoal] = useState(3000);
  const router = useRouter();

  useEffect(() => {
    const fetchWaterGoal = async () => {
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const goal = docSnap.data().waterGoal;
          setWaterGoal(Number(goal));
        }
      }
    };

    fetchWaterGoal();
  }, [user]);

  const incrementGoal = async () => {
    try {
      const newGoal = waterGoal + 500;
      setWaterGoal(newGoal);
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { waterGoal: newGoal });
      }
    } catch (error) {
      alert("Failed to update goal: " + error.message);
    }
  };

  const decrementGoal = async () => {
    try {
      const newGoal = waterGoal > 500 ? waterGoal - 500 : waterGoal;
      setWaterGoal(newGoal);
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { waterGoal: newGoal });
      }
    } catch (error) {
      alert("Failed to update goal: " + error.message);
    }
  };

  const saveWaterGoal = async () => {
    try {
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        await updateDoc(userDoc, { waterGoal: waterGoal });
        alert("Daily Goal updated successfully!");
      }
    } catch (error) {
      alert("Failed to update goal: " + error.message);
    }
    router.replace("home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
          className="w-10 h-10 bg-teal-400 rounded-full justify-center items-center"
          onPress={() => router.replace("water")}
        >
          <FontAwesome name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Goal</Text>
      </View>
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionTitle}>Your Daily Goal</Text>
        <Text style={styles.descriptionSubtitle}>
          Adjust the amount of water to drink
        </Text>
      </View>

      <View style={styles.imageSection}>
        <Image
          source={require("../../assets/images/Hydratation-rafiki.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.adjustSection}>
        <TouchableOpacity style={styles.adjustButton} onPress={decrementGoal}>
          <Text style={styles.adjustButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.waterAmount}>{waterGoal} ml</Text>
        <TouchableOpacity style={styles.adjustButton} onPress={incrementGoal}>
          <Text style={styles.adjustButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.changeGoalButton} onPress={saveWaterGoal}>
        <Text style={styles.changeGoalButtonText}>Change Daily Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  backButtonText: {
    color: "#38B2AC",
    fontSize: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  descriptionSection: {
    alignItems: "center",
  },
  descriptionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  descriptionSubtitle: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5,
  },
  imageSection: {
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "contain",
  },
  adjustSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  adjustButton: {
    backgroundColor: "#38B2AC",
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  adjustButtonText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  waterAmount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  changeGoalButton: {
    backgroundColor: "#38B2AC",
    width: "100%",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 90,
  },
  changeGoalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyGoalPage;
