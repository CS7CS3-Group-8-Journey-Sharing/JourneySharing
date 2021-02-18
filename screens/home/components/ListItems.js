import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { OverlayComponent } from "react-native-maps";
import { ListItem, Icon, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import TouchableScale from "react-native-touchable-scale";

export default function ListItems({ navigation }) {
  const list = [
    {
      key: "1",
      title: "Find a Journey",
      icon: "flight-takeoff",
      goTo: "FindJourney",
    },
    {
      key: "2",
      title: "Appointments",
      icon: "av-timer",
      goTo: "Details",
    },
  ];

  return (
    <View>
      {list.map((item, i) => (
        <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          onPress={() => navigation.navigate(item.goTo)}
          key={item.key}
        >
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {item.title}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="white" />
        </ListItem>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
});
