import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function MarkerList({ markers }) {
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const getDistance = (a, b) => {
    const R = 3958.8 * 1609.34; // Earth's radius in meters for miles
    const dLat = (b.lat - a.lat) * (Math.PI / 180);
    const dLon = (b.long - a.long) * (Math.PI / 180);
    const lat1 = a.lat * (Math.PI / 180);
    const lat2 = b.lat * (Math.PI / 180);

    const hav =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return R * c; // meters
  };

  return (
    <View style={styles.listContainer}>
      <Text style={styles.header}>Dropped Markers</Text>
      <ScrollView style={styles.scrollArea}>
        {markers.map((m, i) => {
          const prev = i > 0 ? markers[i - 1] : null;
          const timeDiff = prev ? formatTime(m.time - prev.time) : null;
          const distDiff = prev ? (getDistance(prev, m) / 1609.34).toFixed(2) : null;

          return (
            <View key={i} style={styles.card}>
              <Text style={styles.coords}>
                A{i + 1} {m.lat.toFixed(5)}, {m.long.toFixed(5)}
              </Text>
              <Text style={styles.sub}>Altitude: {m.alt.toFixed(1)} m</Text>
              <Text style={styles.time}>
                {formatTime(m.time)}
                {prev && ` • +${timeDiff} • ${distDiff} mi`}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#fff",
    padding: 12,
    paddingBottom: 20,
    maxHeight: 220,
  },
  scrollArea: {
    maxHeight: 200,
  },
  header: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  coords: { fontWeight: "600" },
  sub: { fontSize: 12, color: "#555" },
  time: { fontSize: 12, textAlign: "right", marginTop: 4 },
});
