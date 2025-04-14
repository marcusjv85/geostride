import React, { useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function MapDisplay({
  location,
  routeCoords,
  markers,
  altitude,
  speed,
  heading,
}) {
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
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : undefined
        }
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
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Lat: {location?.latitude.toFixed(5)}
        </Text>
        <Text style={styles.overlayText}>
          Long: {location?.longitude.toFixed(5)}
        </Text>
        <Text style={styles.overlayText}>Alt: {altitude?.toFixed(1)} m</Text>
        <Text style={styles.overlayText}>
          Speed: {(speed * 0.621371).toFixed(1)} mph
        </Text>
        <Text style={styles.overlayText}>
          Heading: {heading !== null ? `${Math.round(heading)}°` : "..."}
        </Text>
      </View>

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
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
    borderRadius: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 12,
  },
});
