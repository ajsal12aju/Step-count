import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { AuthContext } from "../../context/authContext";
import { db } from "../../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

const ReminderPage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [reminders, setReminders] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const userDocRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setReminders(docSnap.data().reminders || []);
        }
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);

  const toggleSwitch = (time) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.time === time
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const addReminderToFirebase = async (time) => {
    try {
      const userDocRef = doc(db, "users", user?.uid);
      await updateDoc(userDocRef, {
        reminders: arrayUnion({ time, enabled: true }),
      });
      setReminders((prev) => [...prev, { time, enabled: true }]);
    } catch (error) {
      console.error("Error adding reminder:", error);
    }
  };

  const handlePickerChange = (event, selectedDate) => {
    setPickerVisible(false);

    if (event.type === "set" && selectedDate) {
      const formattedTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      addReminderToFirebase(formattedTime);
    }
  };

  const resetReminders = async () => {
    try {
      const userDocRef = doc(db, "users", user?.uid);
      await updateDoc(userDocRef, {
        reminders: [],
      });
      setReminders([]);
      router.replace("home");
    } catch (error) {
      console.error("Error resetting reminders:", error);
    }
  };

  return (
    <View style={{ flex: 1, height: 100 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Reminders</Text>

          <View style={styles.cardfirst}>
            <View style={styles.cardLeft}>
              <FontAwesome name="bell" size={24} color="#38B2AC" />
              <Text
                style={{ ...styles.cardTitle, marginTop: 5, marginLeft: 10 }}
              >
                Notification
              </Text>
            </View>
            <Switch
              value={isTracking}
              onValueChange={() => setIsTracking((prev) => !prev)}
              trackColor={{ false: "#767577", true: "#38B2AC" }}
              thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.cardfirst}>
            <View style={styles.cardLeft}>
              <FontAwesome name="volume-up" size={24} color="#38B2AC" />
              <Text
                style={{ ...styles.cardTitle, marginTop: 5, marginLeft: 10 }}
              >
                Sound
              </Text>
            </View>
            <Switch
              value={isTracking}
              onValueChange={() => setIsTracking((prev) => !prev)}
              trackColor={{ false: "#767577", true: "#38B2AC" }}
              thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.header}>Add Reminder</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setPickerVisible(true)}
            >
              <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {reminders.length > 0 ? (
              reminders.map((item, index) => (
                <View key={index.toString()} style={styles.cardfirst}>
                  <View style={styles.cardLeft}>
                    <FontAwesome name="clock-o" size={24} color="#38B2AC" />
                    <Text
                      style={{
                        ...styles.cardTitle,
                        marginTop: 5,
                        marginLeft: 10,
                      }}
                    >
                      {item.time}
                    </Text>
                  </View>
                  <Switch
                    value={item.enabled}
                    onValueChange={() => toggleSwitch(item.time)}
                    trackColor={{ false: "#767577", true: "#38B2AC" }}
                    thumbColor={item.enabled ? "#ffffff" : "#f4f3f4"}
                  />
                </View>
              ))
            ) : (
              <Text style={styles.noReminders}>
                No reminders added yet. Tap "+" to add one.
              </Text>
            )}
          </ScrollView>

          {pickerVisible && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handlePickerChange}
            />
          )}

          <TouchableOpacity
            style={styles.changeGoalButton}
            onPress={resetReminders}
          >
            <Text style={styles.changeGoalButtonText}>Reset Reminders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0.9,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
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
  cardfirst: {
    backgroundColor: "#1F2937",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cardLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 40,
  },
  noReminders: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  changeGoalButton: {
    backgroundColor: "#38B2AC",
    width: "100%",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 30,
  },
  changeGoalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ReminderPage;
