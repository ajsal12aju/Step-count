import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useAuth } from "../../hooks/auth/auth";
import { useState } from "react";
import { ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";

// const BgImage = require("../../assets/images/backgroundImages/bg3.jpg");

const HomeDashboard = () => {
  const router = useRouter();
  const { logOut } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const openWater = () => {
    router.replace("water");
  };
  const openGoal = () => {
    router.replace("goal");
  };
  const openReminder = () => {
    router.replace("remider");
  };

  const handleEditGoal = () => {
    alert("Set your step goal");
  };

  const handleLogout = async () => {
    const response = await logOut();
    console.log("reached", response);
  };

  const progress = {
    steps: 0.85,
    calories: 0.7,
    water: 0.75,
  };

  const quotes = [
    "Keep Going, You're Doing Great!",
    "One Step at a Time!",
    "Push Yourself, No One Else Is Going to Do It for You!",
    "The Harder You Work, The Better You Get!",
    "Stay Strong, Stay Focused!",
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          // source={BgImage}
          style={styles.background}
          imageStyle={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Welcome Back, User!</Text>
            <View style={styles.motivation}>
              <Text style={styles.motivationText}>You're Doing Great!</Text>
            </View>
            <View style={styles.progressCard}>
              <View style={styles.progressCardHeader}>
                <Text style={styles.goalCount}>10,000 steps</Text>
                <TouchableOpacity onPress={handleEditGoal}>
                  <FontAwesome name="edit" size={20} color="#333333" />
                </TouchableOpacity>
              </View>

              <View style={styles.progressCircleContainer}>
                <Progress.Circle
                  size={120}
                  progress={0.45}
                  showsText={true}
                  formatText={() => `4,500`}
                  color="#76c7c0"
                  unfilledColor="#d3d3d3"
                  borderWidth={0}
                  thickness={14}
                  textStyle={styles.progressText}
                />
                <View style={styles.playSection}>
                  <View style={styles.progressCircleContainer1}>
                    <Text style={styles.cardTitle}>
                      Your journey starts now
                    </Text>
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => router.replace("stepTracker")}
                    >
                      <Text style={styles.settingsButtonTextHead}>
                        Lets start
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.daysContainer}>
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayCircle,
                    currentDay === index && styles.highlightedDay,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      currentDay === index && styles.highlightedText,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.cardsRow}>
              <View style={styles.card}>
                <FontAwesome name="bell" size={40} color="#76c7c0" />

                <Text style={styles.cardTitle}>Reminder</Text>
                <Text style={styles.cardValue}>8,450</Text>
                <ProgressBar
                  progress={progress.steps}
                  color="#76c7c0"
                  style={styles.progressBar}
                />
              </View>

              <View style={styles.card}>
                <FontAwesome name="fire" size={40} color="#ff6347" />

                <Text style={styles.cardTitle}>Calories</Text>
                <Text style={styles.cardValue}>350</Text>
                <ProgressBar
                  progress={progress.calories}
                  color="#ff6347"
                  style={styles.progressBar}
                />
              </View>

              <View style={styles.card}>
                <FontAwesome name="tint" size={40} color="#76c7c0" />

                <Text style={styles.cardTitle}>Water</Text>
                <Text style={styles.cardValue}>1.5 L</Text>
                <ProgressBar
                  progress={progress.water}
                  color="#3b9e9f"
                  style={styles.progressBar}
                />
              </View>
            </View>

            <View style={styles.achievementContainer}>
              <Text style={styles.achievementText}>
                🏅 Milestone: 10,000 Steps Achieved! 🏅
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    // padding: 20,
    marginBottom: 50,
  },
  backgroundImage: {
    // opacity: 0.9,
  },
  container: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.0)",
    backgroundColor: "black",

    justifyContent: "center",
    padding: 20,
    height: "80vh",
  },

  stickyMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  motivationalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4CAF50",
  },
  cardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  progressBar: {
    width: "100%",
    height: 10,
  },
  achievementContainer: {
    marginTop: 30,
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  achievementText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796b",
  },
  progressCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  progressCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  goalCount: {
    fontSize: 18,
    color: "#333333",
  },
  progressCircleContainer: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  progressCircleContainer1: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    flexDirection: "column",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playSection: {
    alignItems: "center",
    marginLeft: 20,
  },
  playText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#76c7c0",
    borderRadius: 50,
    padding: 10,
  },

  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  dayCircle: {
    backgroundColor: "#76c7c0",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  highlightedText: {
    color: "#666",
  },
  highlightedDay: {
    backgroundColor: "white",
  },

  settingsButton: {
    backgroundColor: "#76c7c0",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  settingsButtonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  settingsButton: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  settingsButtonTextHead: {
    color: "white",
    fontSize: 20,
    // marginBottom: 10,
    textAlign: "center",
  },

  stickyMenu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333333",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#444444",
  },
  menuButton: {
    alignItems: "center",
  },
  menuButtonText: {
    color: "white",
    fontSize: 12,
  },

  // menuButton: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   backgroundColor: '#f2f2f2',
  //   borderRadius: 5,
  // },
  // menuButtonText: {
  //   marginLeft: 8,
  //   color: '#76c7c0',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  settingsButtonText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#76c7c0",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HomeDashboard;
