import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function TrackingControls({
  isTracking,
  onStart,
  onStop,
  onDropMarker,
}) {
  return (
    <View style={styles.controls}>
      {isTracking ? (
        <>
          <Button title="Stop Walk" onPress={onStop} color="red" />
          <View style={{ marginTop: 10 }}>
            <Button
              title="Drop Marker"
              onPress={onDropMarker}
              color="#007AFF"
            />
          </View>
        </>
      ) : (
        <Button title="Start Walk" onPress={onStart} color="green" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
