import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useRouter } from "expo-router";

const WaterUpdatePage = () => {
  const router = useRouter();

  const weeklyData = [70, 80, 50, 90, 100, 60, 75];
  const averagePercentage =
    weeklyData.reduce((a, b) => a + b, 0) / weeklyData.length;
  const backToHome = () => {
    router.replace("screens/home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Mohammed Ajsal</Text>

      <View style={styles.intakeCard}>
        <View style={styles.intakeDetails}>
          <View style={styles.leftSection}>
            <Text style={styles.cardTitle}>Today's Water Intake</Text>
            <Text style={styles.waterAmount}>200ml / 500ml</Text>
            <TouchableOpacity style={styles.addWaterButton}>
              <Text style={styles.addWaterButtonText}>Add Water</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightSection}>
            <Progress.Circle
              size={120}
              progress={0.4}
              showsText={true}
              formatText={() => `50%`}
              color="#76c7c0"
              unfilledColor="#d3d3d3"
              borderWidth={0}
              thickness={14}
              textStyle={styles.progressText}
            />
          </View>
        </View>
      </View>

      <View style={styles.recordCard}>
        <Text style={styles.recordCardTitle}>Today's Record</Text>
        <FlatList
          data={[
            { time: "10:00 AM", amount: "200ml" },
            { time: "1:00 PM", amount: "300ml" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recordRow}>
              {/* <Image
                source={require("../../assets/images/bottle.png")}
                style={styles.recordIcon}
              /> */}
                        <FontAwesome name="tint" size={25} color="#76c7c0" />

              <Text style={styles.recordTime}>{item.time}</Text>
              <Text style={styles.recordAmount}>{item.amount}</Text>
              <Text style={styles.recordOptions}>...</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.weeklyStatsCard}>
        <Text style={styles.weeklyStatsTitle}>Weekly Stats</Text>
        <View style={styles.weeklyCirclesContainer}>
          {weeklyData.map((percentage, index) => {
            const dayInitial = ["S", "M", "T", "W", "T", "F", "S"][index];
            return (
              <View key={index} style={styles.weeklyCircleWrapper}>
                <Progress.Circle
                  size={35}
                  progress={percentage / 100}
                  showsText={true}
                  formatText={() => dayInitial}
                  color="#76c7c0"
                  unfilledColor="#d3d3d3"
                  borderWidth={0}
                  thickness={6}
                  textStyle={styles.dayInitialText}
                />
                <Text style={styles.weeklyPercentage}>{percentage}%</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.totalWeeklyProgressWrapper}>
          <Text style={styles.totalProgressText}>Total Weekly Progress</Text>
          <Progress.Bar
            progress={averagePercentage / 100}
            color={"#76c7c0"}
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

      <TouchableOpacity style={styles.changeGoalButton} onPress={backToHome}>
        <Text style={styles.changeGoalButtonText}>Back To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  userName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  intakeCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardBg: {
    width: "100%",
    height: 100,
    position: "absolute",
    top: 100,
    // bottom: 0,
    // left: 0,
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
    backgroundColor: "#76c7c0",
    padding: 8,
    width: 100,
    top: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  addWaterButtonText: {
    color: "#000",
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
  percentage: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  recordCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  recordCardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recordIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  recordTime: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    marginLeft:12
  },
  recordAmount: {
    color: "#fff",
    fontSize: 14,
  },
  recordOptions: {
    color: "#aaa",
    fontSize: 20,
    marginLeft: 20,
    transform: [{ rotate: '90deg' }],
  },
  weeklyCirclesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  weeklyCircleWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
  },
  dayInitialText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  weeklyPercentage: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },

  weeklyStatsCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
  },
  weeklyStatsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  weeklyBarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  weeklyBarWrapper: {
    alignItems: "center",
  },
  weeklyBar: {
    width: 5,
    height: 50,
    backgroundColor: "#444",
  },

  totalWeeklyProgressWrapper: {
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  totalProgressText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalProgressBar: {
    width: "100%",
    borderRadius: 6,
    backgroundColor: "#444",
  },
  averagePercentage: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  changeGoalButton: {
    backgroundColor: "#76c7c0",
    width: "100%",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  changeGoalButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WaterUpdatePage;
