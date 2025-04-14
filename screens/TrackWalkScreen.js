import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import MapDisplay from "../components/MapDisplay";
import StatBar from "../components/StatBar";
import ControlPanel from "../components/ControlPanel";
import MarkerList from "../components/MarkerList";
import SummaryModal from "../components/SummaryModal"; // <-- Include modal

export default function TrackWalkScreen() {
  const [location, setLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [altitude, setAltitude] = useState(0);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [showSummary, setShowSummary] = useState(false); // <-- Modal state
  const [heading, setHeading] = useState(null);

  const watchRef = useRef(null);
  const intervalRef = useRef(null);
  const prevLocRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "GPS is required for walk tracking.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude, altitude } = loc.coords;
      setLocation({ latitude, longitude });
      setAltitude(altitude);
    })();

    return () => {
      if (watchRef.current) watchRef.current.remove();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startWalk = async () => {
    setIsTracking(true);
    startTimeRef.current = Date.now();
    setDistance(0);
    setDuration(0);
    setRouteCoords([]);
    setMarkers([]);
    Location.watchHeadingAsync((h) => {
      setHeading(h.trueHeading);
    });

    prevLocRef.current = null;

    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setDuration(elapsed);
    }, 1000);

    watchRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 1,
      },
      (loc) => {
        const { latitude, longitude, altitude, speed } = loc.coords;
        const newLoc = { latitude, longitude };
        setLocation(newLoc);
        setAltitude(altitude || 0);
        setSpeed((speed || 0) * 3.6); // m/s to km/h
        setRouteCoords((prev) => [...prev, newLoc]);

        if (prevLocRef.current) {
          const dist = getDistance(prevLocRef.current, newLoc);
          setDistance((prev) => prev + dist);
        }
        prevLocRef.current = newLoc;
      }
    );
  };

  const stopWalk = () => {
    if (watchRef.current) watchRef.current.remove();
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTracking(false);

    // Show modal summary
    setShowSummary(true);
  };

  const resetWalk = () => {
    setDistance(0);
    setDuration(0);
    setSpeed(0);
    setRouteCoords([]);
    setMarkers([]);
    setShowSummary(false);
    prevLocRef.current = null;
    startTimeRef.current = null;
  };

  const dropMarker = () => {
    if (!location) return;
    setMarkers((prev) => [
      ...prev,
      {
        lat: location.latitude,
        long: location.longitude,
        alt: altitude,
        time: duration,
      },
    ]);
  };

  const getDistance = (a, b) => {
    const R = 6371e3;
    const dLat = (b.latitude - a.latitude) * (Math.PI / 180);
    const dLon = (b.longitude - a.longitude) * (Math.PI / 180);
    const lat1 = a.latitude * (Math.PI / 180);
    const lat2 = b.latitude * (Math.PI / 180);
    const hav =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return R * c;
  };

  return (
    <View style={styles.container}>
      <MapDisplay
        location={location}
        routeCoords={routeCoords}
        markers={markers}
        altitude={altitude}
        speed={speed}
        heading={heading}
      />
      <StatBar
        distance={distance}
        duration={duration}
        altitude={altitude}
        speed={speed}
      />
      <ControlPanel
        isTracking={isTracking}
        onStart={startWalk}
        onStop={stopWalk}
        onDropMarker={dropMarker}
      />
      <MarkerList markers={markers} />

      <SummaryModal
        visible={showSummary}
        onClose={resetWalk}
        duration={duration}
        distance={distance}
        markers={markers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
