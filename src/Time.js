// Time.js
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  return (
    <View>
      <TouchableOpacity style={styles.squaredButton} disabled>
        <Text style={styles.timerText}>
          <FontAwesomeIcon icon={faClock} color="#fff" size={12} /> {formattedTime}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: "#fff",
    fontSize: 12,

  },
  squaredButton: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Time;
