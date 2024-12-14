import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { useAuth } from "../../hooks/auth/auth";

// const BgImage = require("../../assets/images/backgroundImages/bg3.jpg");

const HomeDashboard = () => {
  const { logOut } = useAuth();


  const handleEditGoal = () => {
        alert("Set your step goal");
      };
    
  const handleLogout = async () => {
    const response = await logOut();
    console.log("reached", response);
  };
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
      borderWidth={0}
      thickness={12}
      textStyle={styles.progressText}
    />
    <View style={styles.playSection}>
      <View style={styles.progressCircleContainer1}>
    <Text style={styles.cardTitle}>Your journey starts now</Text>
    <TouchableOpacity
        style={styles.playButton}
        onPress={() => alert("Start walking")}
      >
            <Text style={styles.settingsButtonTextHead}>Lets start</Text>
            </TouchableOpacity>
            </View>
    </View>
  </View>
            </View>

            {/* Days of the Week */}
            <View style={styles.daysContainer}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <View key={index} style={styles.dayCircle}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </View>
            <View style={styles.cardsRow}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Steps Taken</Text>
                <Text style={styles.cardValue}>8,450</Text>
                <Text style={styles.cardSubtitle}>of 10,000 steps goal</Text>
                <Progress.Bar
                  progress={0.85}
                  width={null}
                  height={10}
                  color="#76c7c0"
                  borderWidth={0}
                />
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Calories Burned</Text>
                <Text style={styles.cardValue}>350</Text>
                <Text style={styles.cardSubtitle}>of 500 kcal goal</Text>
                <Progress.Bar
                  progress={0.7}
                  width={null}
                  height={10}
                  color="#ff6347"
                  borderWidth={0}
                />
              </View>

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Water Intake</Text>
                <Text style={styles.cardValue}>1.5 L</Text>
                <Text style={styles.cardSubtitle}>of 2L watar goal</Text>
                <Progress.Bar
                  progress={0.75}
                  width={null}
                  height={10}
                  color="#3b9e9f"
                  borderWidth={0}
                />
              </View>
            </View>

         

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => alert("Navigate to Settings")}
            >
              <FontAwesome name="cogs" size={20} color="white" />
              <Text style={styles.settingsButtonText}>
                Manage Goals & Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.settingsButton}
            onPress={handleLogout}
          >
            <Text style={styles.settingsButtonText}>Logout</Text>
          </TouchableOpacity>
          </View>

        
        </ImageBackground>
      </ScrollView>

      <View style={styles.stickyMenu}>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="home" size={20} color="#76c7c0" />
          <Text style={styles.menuButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="bell" size={20} color="#76c7c0" />
          <Text style={styles.menuButtonText}>Reminder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="tint" size={20} color="#76c7c0" />
          <Text style={styles.menuButtonText}>Water Intake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <FontAwesome name="bullseye" size={20} color="#76c7c0" />
          <Text style={styles.menuButtonText}>Goal Setting</Text>
        </TouchableOpacity>
      </View>
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

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    width: "31%",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 10,
  },
  motivation: {
    alignItems: "center",
    marginTop: 10,
  },
  motivationText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
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
    borderRadius: 20,
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
});

export default HomeDashboard;