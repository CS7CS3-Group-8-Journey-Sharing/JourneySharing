import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import JourneyListView from "../../components/JourneyListView";
import { getJourneysOfUser } from "../../utils/APIcalls";
import COLORS from "../../common/colors"
import { getOwnersJourneys } from "../../utils/utilFunctions";

export default function HomeScreen({ navigation }) {
  const { userToken, user } = React.useContext(AuthContext);

  const list = getJourneysOfUser(user.email, userToken);
  //getJourneysOfUser(user.email, userToken).then

  if (list.length > 0)
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* Journeys that are happening at the current time */}
          <Text style={styles.title}>Current Journey</Text> 
          <JourneyListView navigation={navigation} isHappening list={[list[0]]} />
        </View>
        <View style={styles.container}>
          {/* Journeys that you are the owner of */}
          <Text style={styles.title}>Your Journeys</Text> 
          <JourneyListView navigation={navigation} list={getOwnersJourneys(list, user.email)} />
        </View>
        <View style={styles.container}>
          {/* Journeys that you are NOT the owner of, but are participating in */}
          <Text style={styles.title}>Participating In</Text> 
          <JourneyListView navigation={navigation} list={list} />
        </View>
      </ScrollView>
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
            color={COLORS.mainColor}
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
  title: {
    marginHorizontal: 10, 
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold"
  }
});
