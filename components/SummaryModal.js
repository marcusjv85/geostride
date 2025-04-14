import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

export default function SummaryModal({
  visible,
  onClose,
  duration,
  distance,
  markers,
}) {
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const miles = distance / 1609.34;
  const avgSpeed =
    duration > 0 ? (miles / (duration / 3600)).toFixed(2) : "0.00";

  const altitudes = markers.map((m) => m.alt);
  const minAlt = altitudes.length ? Math.min(...altitudes).toFixed(1) : "-";
  const maxAlt = altitudes.length ? Math.max(...altitudes).toFixed(1) : "-";

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.title}>Walk Summary</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Total Time:</Text>
            <Text style={styles.value}>{formatTime(duration)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Distance:</Text>
            <Text style={styles.value}>{miles.toFixed(2)} mi</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Avg Speed:</Text>
            <Text style={styles.value}>{avgSpeed} mph</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Waypoints:</Text>
            <Text style={styles.value}>{markers.length}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Altitude Range:</Text>
            <Text style={styles.value}>
              {minAlt} m – {maxAlt} m
            </Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={onClose}>
              <Text style={styles.saveText}>Save Walk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetBtn} onPress={onClose}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    width: "85%",
    borderRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  saveBtn: {
    backgroundColor: "#007aff",
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },
  resetBtn: {
    backgroundColor: "#ccc",
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetText: {
    color: "#333",
    fontWeight: "bold",
  },
});
