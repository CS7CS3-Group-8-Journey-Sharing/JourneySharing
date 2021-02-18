import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";

export default function FindJourney({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  return (
    <View style={styles.container}>
      <MapView region={region} onRegionChange={setRegion} style={styles.map} />
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
