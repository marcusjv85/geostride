import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatsPanel({ distance, duration, altitude, location }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.panel}>
      <Text style={styles.text}>
        Distance: {(distance / 1000).toFixed(2)} km
      </Text>
      <Text style={styles.text}>Time: {formatTime(duration)}</Text>
      <Text style={styles.text}>Altitude: {altitude.toFixed(1)} m</Text>

      {location && (
        <>
          <Text style={styles.subText}>
            Lat: {location.latitude.toFixed(6)}
          </Text>
          <Text style={styles.subText}>
            Long: {location.longitude.toFixed(6)}
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#666",
  },
});
