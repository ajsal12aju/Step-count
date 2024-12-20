import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import * as Progress from "react-native-progress";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../hooks/auth/auth";
import { useRouter } from "expo-router";

const StepTrackerPage = () => {
  const { user } = useAuth();
  const [stepCount, setStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [targetSteps, setTargetSteps] = useState(100);
  const progress = stepCount / targetSteps;
  const [stepRecords, setStepRecords] = useState([]);
  const router = useRouter();

  const [weeklyData, setWeeklyData] = useState([]);
  const [averageWeeklyProgress, setAverageWeeklyProgress] = useState(0);

  const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const dailyGoalsCollection = collection(db, "dailyGoals");

  useEffect(() => {
    const fetchTargetSteps = async () => {
      if (user) {
        const userCollectionRef = collection(db, "users");
        const userQuery = query(
          userCollectionRef,
          where("userId", "==", user?.uid)
        );

        try {
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const { dailySteps } = doc.data();
            setTargetSteps(dailySteps || 100);
          } else {
            console.log("No document found for user.");
            setTargetSteps(100);
          }
        } catch (error) {
          console.error("Error fetching target steps:", error);
        }
      }
    };

    fetchTargetSteps();
  }, [user]);

  // Fetch today's step count from Firebase
  useEffect(() => {
    const fetchSteps = async () => {
      if (!user || !user.uid) return;
      try {
        const stepQuery = query(
          dailyGoalsCollection,
          where("uid", "==", user?.uid),
          where("date", "==", todayDate)
        );
        const querySnapshot = await getDocs(stepQuery);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setStepCount(doc.data().totalSteps || 0); // Initialize step count
        }
      } catch (error) {
        console.error("Error fetching steps:", error);
        Alert.alert("Error", "Failed to load steps. Please try again later.");
      }
    };

    fetchSteps();
  }, [user.uid, todayDate]);

  // Fetch weekly step progress data from Firebase or use mock data
  const fetchWeeklyData = async () => {
    try {
      const weeklyQuery = query(
        dailyGoalsCollection,
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(weeklyQuery);
      let weeklySteps = [];

      querySnapshot.forEach((doc) => {
        const { totalSteps } = doc.data();
        weeklySteps.push(totalSteps);
      });

      const dailyProgress = weeklySteps.map((steps) =>
        Math.min((steps / targetSteps) * 100, 100)
      );

      setWeeklyData(weeklySteps);
      setAverageWeeklyProgress(
        dailyProgress.reduce((a, b) => a + b, 0) / dailyProgress.length
      );
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    }
  };
  useEffect(() => {
    fetchWeeklyData();
  }, [user?.uid, targetSteps]);

  const saveStepsToDB = async () => {
    try {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Format: HH:MM AM/PM

      const stepQuery = query(
        dailyGoalsCollection,
        where("uid", "==", user?.uid),
        where("date", "==", todayDate)
      );

      const querySnapshot = await getDocs(stepQuery);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();

        const updatedRecords = [
          ...(existingData.stepRecords || []),
          { time: currentTime, steps: stepCount - existingData.totalSteps },
        ];

        await updateDoc(docRef, {
          totalSteps: stepCount,
          stepRecords: updatedRecords,
          lastUpdated: new Date(),
        });
      } else {
        await addDoc(dailyGoalsCollection, {
          uid: user.uid,
          date: todayDate,
          totalSteps: stepCount,
          stepRecords: [{ time: currentTime, steps: stepCount }],
          lastUpdated: new Date(),
        });
      }

      await fetchStepRecords();

      Alert.alert("Success", "Your steps is updated");
    } catch (error) {
      console.error("Error saving steps:", error);
      Alert.alert("Error", "Failed to save steps. Please try again later.");
    }
  };

  const fetchStepRecords = async () => {
    try {
      const stepQuery = query(
        dailyGoalsCollection,
        where("uid", "==", user?.uid),
        where("date", "==", todayDate)
      );

      const querySnapshot = await getDocs(stepQuery);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setStepRecords(doc.data().stepRecords || []);
      } else {
        setStepRecords([]);
      }
    } catch (error) {
      console.error("Error fetching step records:", error);
      Alert.alert("Error", "Failed to load records. Please try again later.");
    }
  };

  // Fetch today's step records
  useEffect(() => {
    fetchStepRecords();
  }, [user?.uid, todayDate, isTracking]);

  // Toggle tracking on/off
  const toggleTracking = () => {
    if (isTracking) {
      saveStepsToDB(); // Save steps when stopping tracking
    }
    setIsTracking((prev) => !prev);
  };

  // Accelerometer tracking logic
  useEffect(() => {
    let subscription = null;
    let stepDetected = false;
    const threshold = 1.2; // Adjust this value based on experiments to match 15 cm movement

    const startTracking = () => {
      subscription = Accelerometer.addListener((accelData) => {
        const magnitude = Math.sqrt(
          accelData.x * accelData.x +
            accelData.y * accelData.y +
            accelData.z * accelData.z
        );

        if (magnitude > threshold && !stepDetected) {
          // Increment step count for each detected step
          setStepCount((prev) => {
            const updatedCount = prev + 1;

            return updatedCount;
          });
          stepDetected = true;
        } else if (magnitude < threshold) {
          // Reset step detection when magnitude is below threshold
          stepDetected = false;
        }
      });

      Accelerometer.setUpdateInterval(100);
    };

    if (isTracking) {
      startTracking();
    } else {
      if (subscription) subscription.remove();
    }

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isTracking]);

  return (
    <ScrollView className="bg-black">
      <View className="flex-1 bg-black p-5 pt-12">
        {/* User Header */}
        <Text
          className="text-white"
          style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}
        >
          Step Tracker
        </Text>

        {/* Step Tracker Card */}
        <View className="bg-gray-800 rounded-lg mb-5 p-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text
                className="text-white"
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                Today's Step Count
              </Text>
              <Text
                className="text-gray-400"
                style={{ fontSize: 14, marginTop: 5 }}
              >
                {stepCount} / {targetSteps} steps
              </Text>
              <TouchableOpacity
                className="bg-teal-400 mt-3 py-3 px-6 rounded-full self-start"
                style={{ alignSelf: "center" }}
                onPress={toggleTracking}
              >
                <Text
                  className="text-white"
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {isTracking ? "Stop Tracking" : "Start Tracking"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Progress.Circle
                size={120}
                progress={progress}
                showsText={true}
                formatText={() =>
                  `${Math.min((progress * 100).toFixed(0), 100)}%`
                }
                color="#38B2AC"
                unfilledColor="#444"
                thickness={12}
                textStyle={{ color: "#fff" }}
              />
            </View>
          </View>
        </View>

        <View
          className="bg-gray-900 rounded-lg py-4 px-6 flex-row justify-between items-center mb-5"
          style={{ alignItems: "center" }}
        >
          <Text
            className="text-white"
            style={{ fontSize: 16, fontWeight: "500" }}
          >
            Daily Target: {targetSteps} Steps
          </Text>
          <TouchableOpacity onPress={() => router?.replace("stepsGoal")}>
            <FontAwesome name="edit" size={20} color="#00D9A5" />
          </TouchableOpacity>
        </View>

        {/* Today's Record Card */}
        <View className="bg-gray-800 rounded-lg mb-5 p-4">
          <Text
            className="text-white"
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
          >
            Today's Record
          </Text>
          {stepRecords.length > 0 ? (
            <View>
              {stepRecords.map((item, index) => (
                <View key={index} className="flex-row items-center mb-3">
                  <FontAwesome name="male" size={25} color="#38B2AC" />
                  <Text
                    className="text-white text-sm flex-1 ml-3"
                    style={{ fontSize: 14 }}
                  >
                    {item.time}
                  </Text>
                  <Text className="text-white text-sm" style={{ fontSize: 14 }}>
                    {item.steps} steps
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text
              className="text-gray-400"
              style={{ fontSize: 14, textAlign: "center" }}
            >
              No records available for today. Start tracking to add records!
            </Text>
          )}
        </View>

        {/* Weekly Stats Card */}
        <View className="bg-gray-800 rounded-lg p-4 mb-20">
          <Text
            className="text-white"
            style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
          >
            Weekly Stats
          </Text>
          <View className="flex-row justify-between mb-5">
            {["S", "M", "T", "W", "T", "F", "S"].map((dayInitial, index) => {
              // Get percentage or default to 0 if no data for the day
              const percentage = weeklyData[index] || 0;

              return (
                <View key={index} className="items-center">
                  <Progress.Circle
                    size={35}
                    progress={percentage / targetSteps}
                    showsText={true}
                    formatText={() => dayInitial}
                    color="#38B2AC"
                    unfilledColor="#444"
                    thickness={8}
                    textStyle={{ color: "#fff", fontSize: 8 }}
                  />
                  <Text
                    className="text-white"
                    style={{ fontSize: 12, marginTop: 5 }}
                  >
                    {((percentage / targetSteps) * 100)?.toFixed(0)}%
                  </Text>
                </View>
              );
            })}
          </View>

          <Text
            className="text-white"
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Average Weekly Progress: {averageWeeklyProgress.toFixed(0)}%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default StepTrackerPage;
