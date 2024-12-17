import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import { doc, collection, getDocs, getDoc, addDoc } from "firebase/firestore";

const WaterUpdatePage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [waterGoal, setWaterGoal] = useState(3500);
  const [waterRecords, setWaterRecords] = useState([]);
  const [newWaterAmount, setNewWaterAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dailyWaterIntake, setDailyWaterIntake] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [averagePercentage, setAveragePercentage] = useState(0);

  const fetchUserData = async () => {
    try {
      if (user?.uid) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const goal = docSnap.data().waterGoal || 3500;
          setWaterGoal(goal);

          const waterIntakesCollection = collection(
            db,
            "users",
            user.uid,
            "waterIntakes"
          );
          const querySnapshot = await getDocs(waterIntakesCollection);
          const records = querySnapshot.docs.map((doc) => doc.data());
          setWaterRecords(records);

          const todayDate = new Date().toLocaleDateString();
          const todayIntake = records
            .filter((record) => record.date === todayDate)
            .reduce((total, record) => total + parseInt(record.amount, 10), 0);

          setDailyWaterIntake(todayIntake);

          const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
          const weeklyStats = daysOfWeek.map((day, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (date.getDay() - index));
            const formattedDate = date.toLocaleDateString();

            const dayIntake = records
              .filter((record) => record.date === formattedDate)
              .reduce(
                (total, record) => total + parseInt(record.amount, 10),
                0
              );

            const percentage = (dayIntake / goal) * 100;
            return {
              day: day,
              intake: dayIntake,
              percentage: percentage || 0,
            };
          });

          setWeeklyData(weeklyStats);

          const totalPercentage = weeklyStats.reduce(
            (total, stat) => total + stat.percentage,
            0
          );
          setAveragePercentage(totalPercentage / weeklyStats.length);
        }
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleAddWater = async () => {
    try {
      if (user?.uid && newWaterAmount) {
        const newWaterRecord = {
          time: new Date().toLocaleTimeString(),
          amount: newWaterAmount,
          date: new Date().toLocaleDateString(),
        };

        const waterIntakesCollection = collection(
          db,
          "users",
          user.uid,
          "waterIntakes"
        );
        await addDoc(waterIntakesCollection, newWaterRecord);

        setDailyWaterIntake((prev) => prev + parseInt(newWaterAmount));

        fetchUserData();
      }
    } catch (error) {
      console.error("Error adding water record: ", error);
    }
    setIsModalVisible(false);
  };

  const backToHome = () => {
    router.replace("goal");
  };

  const progress = dailyWaterIntake / waterGoal;

  return (
    <View style={{ flex: 1, height:100 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Daily Stats */}
          <View style={styles.intakeCard}>
            <View style={styles.intakeDetails}>
              <View style={styles.leftSection}>
                <Text style={styles.cardTitle}>Today's Water Intake</Text>
                <Text style={styles.waterAmount}>
                  {dailyWaterIntake}ml / {waterGoal}ml
                </Text>
                <TouchableOpacity
                  style={styles.addWaterButton}
                  onPress={backToHome}
                >
                  <Text style={styles.addWaterButtonText}>
                    Update Daily Goal
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightSection}>
                <Progress.Circle
                  size={120}
                  progress={progress}
                  showsText={true}
                  formatText={() => `${(progress * 100).toFixed(0)}%`}
                  color="#38B2AC"
                  unfilledColor="#d3d3d3"
                  borderWidth={0}
                  thickness={14}
                  textStyle={styles.progressText}
                />
              </View>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.header}>Add Water</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsModalVisible(true)}
            >
              <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Daily Records List */}
          <View style={styles.recordsCard}>
            <Text style={styles.recordsTitle}>Daily Records</Text>
            <FlatList
              data={waterRecords.filter(
                (record) => record.date === new Date().toLocaleDateString()
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.recordItem}>
                  <View style={{ flexDirection: "row" }}>
                    <FontAwesome name="tint" size={25} color="#38B2AC" />

                    <Text style={styles.recordTime}>{item.time}</Text>
                  </View>

                  <Text style={styles.recordAmount}>{item.amount} ml</Text>
                </View>
              )}
            />
          </View>

          {/* Weekly Stats */}
          <View style={styles.weeklyStatsCard}>
            <Text style={styles.weeklyStatsTitle}>Weekly Status</Text>
            <View style={styles.weeklyCirclesContainer}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.weeklyCircleWrapper}>
                  <Progress.Circle
                    size={35}
                    progress={data.percentage / 100}
                    showsText={true}
                    formatText={() => data.day}
                    color="#38B2AC"
                    unfilledColor="#d3d3d3"
                    borderWidth={0}
                    thickness={6}
                    textStyle={styles.dayInitialText}
                  />
                  <Text style={styles.weeklyPercentage}>
                    {data.percentage.toFixed(0)}%
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.totalWeeklyProgressWrapper}>
              <Text style={styles.totalProgressText}>
                Total Weekly Progress
              </Text>
              <Progress.Bar
                progress={averagePercentage / 100}
                color={"#38B2AC"}
                unfilledColor={"#d3d3d3"}
                borderWidth={0}
                width={null}
                height={12}
                style={styles.horizontalProgressBar}
              />
              <Text style={styles.averagePercentage}>
                {averagePercentage.toFixed(0)}%
              </Text>
            </View>
          </View>

          {isModalVisible && (
            <View style={styles.modal}>
              <TextInput
                style={styles.input}
                placeholder="Enter water amount"
                keyboardType="numeric"
                value={newWaterAmount}
                onChangeText={setNewWaterAmount}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleAddWater}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#38B2AC",
    marginTop: 5,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  intakeCard: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  intakeDetails: {
    flexDirection: "row",
    padding: 20,
  },
  leftSection: {
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  waterAmount: {
    color: "#aaa",
    fontSize: 16,
    marginVertical: 10,
  },
  addWaterButton: {
    backgroundColor: "#38B2AC",
    padding: 8,
    width: 160,
    top: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  addWaterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rightSection: {
    alignItems: "center",
  },
  progressText: {
    color: "#aaa",
    fontSize: 17,
    textAlign: "center",
  },
  recordsCard: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  recordsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  recordTime: {
    color: "#fff",
    fontSize: 16,
    marginTop: 1,
    marginLeft: 12,
  },
  recordAmount: {
    color: "#aaa",
    fontSize: 16,
  },
  weeklyStatsCard: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  weeklyStatsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weeklyCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  weeklyCircleWrapper: {
    alignItems: "center",
  },
  dayInitialText: {
    color: "#fff",
    fontSize: 12,
  },
  weeklyPercentage: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
  totalWeeklyProgressWrapper: {
    marginTop: 10,
  },
  totalProgressText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  horizontalProgressBar: {
    marginBottom: 10,
  },
  averagePercentage: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  changeGoalButton: {
    backgroundColor: "#38B2AC",
    width: "100%",
    flexDirection: "row",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  changeGoalButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#38B2AC",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#38B2AC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "47%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default WaterUpdatePage;
