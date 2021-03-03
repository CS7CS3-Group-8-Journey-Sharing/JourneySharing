import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function FindJourneyScreen() {
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        onRegionChange={(newRegion) => setRegion(newRegion)}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
