import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";

export default function CreateJourneyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Create Journey</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});
