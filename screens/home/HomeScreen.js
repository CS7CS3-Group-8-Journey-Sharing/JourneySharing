import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button type="outline" title="Create Journey" onPress={() => navigation.navigate('CreateJourney')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
