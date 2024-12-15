import React, { useState, useEffect } from "react";
import { Text, Button, View } from "react-native";
import { Accelerometer } from "expo-sensors";

// Fine-tuned step counter for smaller movements
const StepCounterWithFineTune = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });

  // Adjusted threshold based on finer step movement
  const threshold = 1.2; // Fine-tune this threshold value based on testing

  // Declare subscription outside the useEffect so it can be accessed inside and outside
  let subscription = null;

  useEffect(() => {
    let stepDetected = false; // To prevent counting the same step multiple times

    // Start step tracking with accelerometer
    const startTracking = () => {
      subscription = Accelerometer.addListener((accelData) => {
        setAcceleration(accelData);

        // Calculate the magnitude of the acceleration vector (from x, y, z)
        const magnitude = Math.sqrt(
          accelData.x * accelData.x +
            accelData.y * accelData.y +
            accelData.z * accelData.z
        );

        // Check if magnitude exceeds threshold and a step has not already been counted
        if (magnitude > threshold && !stepDetected) {
          setStepCount((prev) => prev + 1); // Increment step count
          stepDetected = true; // Prevent multiple detections for the same step
        } else if (magnitude < threshold) {
          stepDetected = false; // Reset when the magnitude drops below the threshold
        }
      });

      // Set the accelerometer update interval to a smaller value (e.g., 100ms) for more responsiveness
      Accelerometer.setUpdateInterval(100);
    };

    if (isTracking) {
      startTracking();
    } else {
      // Remove listeners when tracking stops
      if (subscription) {
        subscription.remove();
      }
    }

    return () => {
      if (subscription) {
        subscription.remove(); // Clean up when the component is unmounted or tracking stops
      }
    };
  }, [isTracking]); // Only re-run the effect when `isTracking` changes

  return (
    <View style={{ padding: 20 }}>
      <Text>Step Count: {stepCount}</Text>
      <Button
        title={isTracking ? "Stop Tracking" : "Start Tracking"}
        onPress={() => setIsTracking((prev) => !prev)}
      />
    </View>
  );
};

export default StepCounterWithFineTune;
