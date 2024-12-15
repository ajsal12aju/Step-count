import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ReminderPage = () => {
  const [isTracking, setIsTracking] = useState(false); 
  const [isMorning, setIsMorning] = useState(false);
  const [isNight, setIsNight] = useState(false);

  const toggleSwitch = () => setIsTracking(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reminders</Text>

     <View style={styles.cardfirst}>
       <View style={styles.cardLeft}>
          <FontAwesome name="bell" size={24} color="#76c7c0" />
          <Text style={{...styles.cardTitle, marginTop:15, marginLeft:10}}>Notification</Text>
        </View>
        <Switch
          value={isTracking}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#76c7c0" }}
          thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.cardfirst}>
       <View style={styles.cardLeft}>
          <FontAwesome name="volume-up" size={24} color="#76c7c0" />
          <Text style={{...styles.cardTitle, marginTop:15, marginLeft:10}}>Sound</Text>
        </View>
        <Switch
          value={isTracking}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#76c7c0" }}
          thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
        />
      </View>

      <View style={styles.row1}>
        <View style={styles.card1}>
          <Text style={styles.cardTitle}>Morning</Text>
          <FontAwesome name="clock-o" size={24} color="#76c7c0" />
          <Text style={styles.cardSubtitle}>Time: 6:00 AM</Text>
        </View>
        <View style={styles.card1}>
          <Text style={styles.cardTitle}>Night</Text>
          <FontAwesome name="bed" size={24} color="#76c7c0" />
          <Text style={styles.cardSubtitle}>Time: 10:00 PM</Text>
        </View>
      </View>

      <View style={styles.row}>
          <Text style={styles.header}>Add Reminder</Text>
          <TouchableOpacity style={styles.addButton}>
            <FontAwesome name="plus" size={20} color="white" />
          </TouchableOpacity>
      </View>
      <View style={styles.cardfirst}>
       <View style={styles.cardLeft}>
          <FontAwesome name="clock-o" size={24} color="#76c7c0" />
          <Text style={{...styles.cardTitle, marginTop:15, marginLeft:10}}>10:00 Am</Text>
        </View>
        <Switch
          value={isTracking}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#76c7c0" }}
          thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.cardfirst}>
       <View style={styles.cardLeft}>
       <FontAwesome name="clock-o" size={24} color="#76c7c0" />
       <Text style={{...styles.cardTitle, marginTop:15, marginLeft:10}}>11:00 Am</Text>
       </View>
        <Switch
          value={isTracking}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#76c7c0" }}
          thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
        />
      </View>
      <View style={styles.cardfirst}>
       <View style={styles.cardLeft}>
       <FontAwesome name="clock-o" size={24} color="#76c7c0" />
       <Text style={{...styles.cardTitle, marginTop:15, marginLeft:10}}>12:00 Am</Text>
       </View>
        <Switch
          value={isTracking}
          onValueChange={toggleSwitch}
          trackColor={{ false: "#767577", true: "#76c7c0" }}
          thumbColor={isTracking ? "#ffffff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  header:{
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold",
    marginTop:10
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  row: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  cardfirst: {
    backgroundColor: "#222",
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
    alignItems: "center"
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 40,
  },
  card1: {
    flex: 0.4,
    backgroundColor: "#222",
    borderRadius: 20,
    padding: 20,
    width: "40%", 
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    width: "48%", 
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    color: "#aaa",
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "#76c7c0",
    marginTop: 5,
    width:40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLeft: {
    position: "absolute",
    left: 10,
  },
  iconRight: {
    position: "absolute",
    right: 10,
  },
});

export default ReminderPage;
