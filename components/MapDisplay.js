import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function MapDisplay({ location, routeCoords, markers }) {
  const mapRef = useRef(null);

  const handleReset = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        ...location,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation
        onPanDrag={() => {}}
      >
        <Polyline
          coordinates={routeCoords}
          strokeWidth={4}
          strokeColor="blue"
        />
        {markers.map((m, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: m.lat, longitude: m.long }}
            title={`Marker ${i + 1}`}
            description={`Altitude: ${m.alt.toFixed(1)}m`}
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons name="locate" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: "40%", width: "100%" },
  map: { flex: 1 },
  resetButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});
