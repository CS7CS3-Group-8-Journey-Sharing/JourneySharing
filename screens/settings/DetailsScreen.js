import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import axios from "axios";

export default function DetailsScreen() {
  const [hello, setHello] = useState("hello?");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/journeysharing/journey/hi")
      .then((response) => {
        setHello(response.data);
      });
  });

  return (
    <View style={styles.container}>
      <Text>{hello}</Text>
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
});
