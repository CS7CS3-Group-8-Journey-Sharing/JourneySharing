import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { OverlayComponent } from "react-native-maps";
import ListItems from "./components/ListItems";

export default function HomeScreen({ navigation }) {
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
