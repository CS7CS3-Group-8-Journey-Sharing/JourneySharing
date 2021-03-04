import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function FindJourneyScreen() {
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const origin = { latitude: 53.347257, longitude: -6.2589555 };
  const destination = { latitude: 53.3446581, longitude: -6.2563436 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyAAR-RYyfCvnHlgiLa1reZe7DpioIX04tM";

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={region}
        onRegionChange={(newRegion) => setRegion(newRegion)}
        style={styles.map}
        //provider={PROVIDER_GOOGLE}
      >
        <MapView.Marker coordinate={origin} title="origin" />
        <MapView.Marker coordinate={destination} title="destination" />
        <MapViewDirections
          origin={origin}
          destination={destination}
          mode="WALKING"
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="darkgreen"
          optimizeWaypoints={true}
        />
      </MapView>
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
