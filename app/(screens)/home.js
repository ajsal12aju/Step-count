import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAuth } from "../../hooks/auth/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  requestNotificationPermissions,
  scheduleNotification,
} from "../../components/notificationService";

const HomeDashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [stepCount, setStepCount] = useState(0);
  const [targetSteps, setTargetSteps] = useState(100);
  const [userName, setName] = useState(null);
  const [reminder, setReminder] = useState([]);
  const [waterGoal, setWaterGoal] = useState(3500);
  const [dailyWaterIntake, setDailyWaterIntake] = useState(0);

  const todayDate = new Date().toISOString().split("T")[0];
  const dailyGoalsCollection = collection(db, "dailyGoals");

  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const handleEditGoal = () => {
    alert("Set your step goal");
  };

  const progress = {
    steps: 0.85,
    calories: 0.7,
    water: 0.75,
  };

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        if (!user || !user.uid) return;
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
  }, [user?.uid, todayDate]);

  const fetchUserData = async () => {
    try {
      if (user?.uid) {
        const userDoc = doc(db, "users", user?.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const goal = docSnap.data().waterGoal || 3500;
          setWaterGoal(goal);

          const waterIntakesCollection = collection(
            db,
            "users",
            user?.uid,
            "waterIntakes"
          );
          const querySnapshot = await getDocs(waterIntakesCollection);
          const records = querySnapshot.docs.map((doc) => doc.data());

          const todayDate = new Date().toLocaleDateString();
          const todayIntake = records
            .filter((record) => record.date === todayDate)
            .reduce((total, record) => total + parseInt(record.amount, 10), 0);

          setDailyWaterIntake(todayIntake);
        }
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const fetchTargetSteps = async () => {
      if (user) {
        const userCollectionRef = collection(db, "users");
        const userQuery = query(
          userCollectionRef,
          where("userId", "==", user.uid)
        );

        try {
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const { dailySteps, name, reminders } = doc.data();
            setTargetSteps(dailySteps || 100);
            setName(name);
            setReminder(reminders);
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

  useEffect(() => {
    const setupNotifications = async () => {
      await requestNotificationPermissions();

      reminder.forEach((reminder) => {
        if (reminder.enabled) {
          scheduleNotification(reminder.time, "Don't forget your task!");
        }
      });
    };

    setupNotifications();
  }, []);

  return (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "center", marginBottom: 50 }}
          imageStyle={{ opacity: 0.9 }}
        >
          <View className="flex-1 justify-center p-5 h-[80vh] bg-black">
            <Text className="text-white text-3xl font-bold text-center">
              Welcome Back, {userName}!
            </Text>
            <View className="mt-4 mb-4">
              <Text className="text-center text-lg text-teal-400">
                You're Doing Great!
              </Text>
            </View>
            <View className="bg-gray-800 rounded-lg mb-5 p-4">
              <View className="flex-row justify-between w-full mb-5">
                <Text className="text-lg text-white">
                  You have covered {stepCount} steps today
                </Text>
                {/* <TouchableOpacity onPress={handleEditGoal}>
                  <FontAwesome name="edit" size={20} color="#fff" />
                </TouchableOpacity> */}
              </View>

              <View className="flex-row justify-between items-center w-full">
                <Progress.Circle
                  size={120}
                  showsText={true}
                  progress={targetSteps > 0 ? stepCount / targetSteps : 0}
                  formatText={() =>
                    targetSteps > 0 && stepCount > 0
                      ? `${Math.min(
                          100,
                          ((stepCount / targetSteps) * 100)?.toFixed(2)
                        )}%`
                      : "0%"
                  }
                  color="#38B2AC"
                  unfilledColor="#d3d3d3"
                  borderWidth={0}
                  thickness={14}
                  textStyle={{ fontSize: 16, fontWeight: "bold" }}
                />
                <View className="items-center ml-5">
                  <Text className="text-xl font-bold text-white mb-4">
                    {targetSteps - stepCount} more steps
                  </Text>

                  <TouchableOpacity
                    className="bg-teal-400 mt-1 py-3 px-6 rounded-full self-start"
                    style={{ alignSelf: "center" }}
                    onPress={() => router.replace("stepTracker")}
                  >
                    <Text
                      className="text-white"
                      style={{
                        fontWeight: "600",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      Lets start!
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View className="flex-row justify-around mb-8">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <View
                  key={index}
                  className={`rounded-full w-12 h-12 justify-center items-center ${
                    currentDay === index ? "bg-white" : "bg-teal-400"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      currentDay === index ? "text-gray-500" : "text-white"
                    }`}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-row justify-between gap-x-4 mb-5">
              <View className="bg-gray-800 p-4 rounded-lg items-center flex-1">
                <FontAwesome name="bell" size={30} color="#38B2AC" />
                <Text className="font-bold text-lg mt-3 text-white">
                  Reminder
                </Text>
                <Text className="font-bold text-xl mt-2 text-white">
                  {reminder?.length || 0}
                </Text>
                <ProgressBar
                  progress={Math.min(
                    1,
                    Math.max(0, reminder?.length ? reminder.length / 100 : 0)
                  )}
                  color="#38B2AC"
                  className="w-full h-2 mt-2"
                />
              </View>

              <View className="bg-gray-800 p-4 rounded-lg items-center flex-1">
                <FontAwesome name="fire" size={30} color="#ff6347" />
                <Text className="font-bold text-lg mt-3 text-white">
                  Calories
                </Text>
                <Text className="font-bold text-xl mt-2 text-white">
                  {((stepCount || 0) * 0.0063)?.toFixed()}
                </Text>
                <ProgressBar
                  progress={((stepCount || 0) * 0.0063)?.toFixed()}
                  color="#ff6347"
                  className="w-full h-2 mt-2"
                />
              </View>

              <View className="bg-gray-800 p-4 rounded-lg items-center flex-1">
                <FontAwesome name="tint" size={30} color="#38B2AC" />
                <Text className="font-bold text-lg mt-3 text-white">Water</Text>
                <Text className="font-bold text-xl mt-2 text-white">
                  {dailyWaterIntake} ml
                </Text>
                <ProgressBar
                  progress={Math.min(
                    1,
                    Math.max(0, (dailyWaterIntake / waterGoal).toFixed(2))
                  )}
                  color="#3b9e9f"
                  className="w-full h-2 mt-2"
                />
              </View>
            </View>

            <View className="bg-teal-100 p-4 rounded-lg items-center">
              <Text className="text-lg font-bold text-teal-900">
                🏅 Milestone: 10,000 Steps Achieved! 🏅
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default HomeDashboard;
