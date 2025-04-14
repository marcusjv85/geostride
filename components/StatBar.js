import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function StatBar({ distance, duration, altitude, speed }) {
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Ionicons name="walk" size={20} />
        <Text style={styles.value}>{(distance / 1609.34).toFixed(2)}</Text>
        <Text style={styles.label}>mi</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="time-outline" size={20} />
        <Text style={styles.value}>{formatTime(duration)}</Text>
        <Text style={styles.label}>Time</Text>
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons name="terrain" size={20} />
        <Text style={styles.value}>{altitude.toFixed(1)}</Text>
        <Text style={styles.label}>m</Text>
      </View>
      <View style={styles.item}>
        <Ionicons name="speedometer-outline" size={20} />
        <Text style={styles.value}>{(speed * 0.621371).toFixed(1)}</Text>
        <Text style={styles.label}>mph</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 2,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
});
