import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function ControlPanel({ isTracking, onStart, onStop, onDropMarker }) {
  return (
    <View style={styles.container}>
      {!isTracking ? (
        <TouchableOpacity style={styles.startButton} onPress={onStart}>
          <Text style={styles.startText}>Start Walk</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity style={styles.stopButton} onPress={onStop}>
            <Text style={styles.stopText}>Stop Walk</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropButton} onPress={onDropMarker}>
            <Text style={styles.dropText}>Drop Marker</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    alignItems: "center",
    gap: 12,
  },
  startButton: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  stopButton: {
    backgroundColor: "#ff3b30",
    padding: 14,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  dropButton: {
    borderColor: "#007aff",
    borderWidth: 2,
    padding: 12,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  startText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  stopText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dropText: { color: "#007aff", fontWeight: "bold", fontSize: 16 },
});
