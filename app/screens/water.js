import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ProgressBar } from 'react-native-paper';

const WaterGoalComponent = () => {
  const [inputGoal, setInputGoal] = useState(goal);

  const [goal, setGoal] = useState(3); 
  const [addedWater, setAddedWater] = useState(0); 
  const [inputWater, setInputWater] = useState(''); 
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(goal);

  const remainingWater = goal - addedWater;
  const progress = addedWater / goal;

  const handleAddWater = () => {
    const waterToAdd = parseFloat(inputWater);
    if (waterToAdd && waterToAdd > 0) {
      setAddedWater(addedWater + waterToAdd);
      setInputWater('');
    }
  };

  const handleGoalSubmit = () => {
    setGoal(newGoal); 
    setIsEditing(false); 
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="tint" size={30} color="#3b9e9f" />
        <Text style={styles.headerText}>Water Intake</Text>
      </View>

      <View style={styles.goalSection}>
        {isEditing ? (
          <View style={styles.editGoal}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputGoal.toString()}
              onChangeText={(text) => setInputGoal(parseFloat(text))}
            />
            <TouchableOpacity onPress={handleGoalSubmit}>
              <FontAwesome name="check" size={20} color="#3b9e9f" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.goalTextContainer}>
            <Text style={styles.goalText}>
              Goal: {goal} L - {addedWater} L added
            </Text>
            <ProgressBar progress={progress} color="#3b9e9f" style={styles.progressBar} />
            <Text style={styles.remainingText}>Remaining: {remainingWater} L</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <FontAwesome name="edit" size={20} color="#3b9e9f" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Add water (ml)"
          keyboardType="numeric"
          value={inputWater}
          onChangeText={(text) => setInputWater(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddWater}>
          <FontAwesome name="plus-circle" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={() => setAddedWater(0)}>
        <FontAwesome name="redo" size={25} color="#fff" />
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 20,
    elevation: 5,
  },

  goalSection: {
    marginBottom: 20,
  },
  goalTextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  remainingText: {
    fontSize: 16,
    color: '#333',
  },
  editGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },

  goalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  remainingText: {
    fontSize: 16,
    color: '#333',
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3b9e9f',
    padding: 10,
    borderRadius: 50,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  resetText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 10,
  },
});

export default WaterGoalComponent;
