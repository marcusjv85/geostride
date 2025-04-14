import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import TrackWalkScreen from "./screens/TrackWalkScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TrackWalkScreen />
    </SafeAreaView>
  );
}
