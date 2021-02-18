import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { OverlayComponent } from "react-native-maps";
import ListItems from "./components/ListItems";

export default function HomeScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerJourneys}>
        <ListItems navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerJourneys: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
  },
});
