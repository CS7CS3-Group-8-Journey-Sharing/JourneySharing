import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreenItems from "./HomeScreenItem";
import { getJourneysOfUser } from "../../utils/APIcalls";

export default function HomeScreen({ navigation }) {
  const list = getJourneysOfUser();

  if (list.length > 0)
    return (
      <View style={styles.container}>
        <ScrollView>
          <HomeScreenItems navigation={navigation} list={list} />
        </ScrollView>
      </View>
    );
  else
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={{ marginBottom: 10 }}>
            You have no Journeys. Create one?
          </Text>
          <Button
            type="outline"
            title="Create Journey"
            onPress={() => navigation.navigate("CreateJourney")}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
