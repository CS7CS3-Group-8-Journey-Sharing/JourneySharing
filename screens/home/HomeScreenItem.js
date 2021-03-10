import React, { useState } from "react";
import { Button, Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { OverlayComponent } from "react-native-maps";
import { ListItem, Icon, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import TouchableScale from "react-native-touchable-scale";

export default function HomeScreenItems({
  navigation,
  list,
  setCurrentJourney,
  fromFindJourney,
}) {
  const handleItemPress = (item) => {
    if (fromFindJourney) {
      setCurrentJourney(item);
    } else {
      navigation.navigate(item.goTo);
    }
  };

  return (
    <View>
      {list.map((item, i) => (
        <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          containerStyle={styles.containerJourneys}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          onPress={() => handleItemPress(item)}
          key={i}
        >
          <ListItem.Content>
            <Text style={styles.containerJourneys_text_title}>
              {item.title}
            </Text>
            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_icon}>
                <Icon
                  color="white"
                  type="material-icons"
                  name="group"
                  size={20}
                />
              </View>
              <Text style={styles.containerJourneys_text}>
                <Text style={{ color: "#fccf03" }}>{item.owner}</Text>,{" "}
                {item.people}
              </Text>
            </View>

            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_text_container}>
                <View style={styles.containerJourneys_icon}>
                  <Icon
                    color="white"
                    type="font-awesome"
                    name="clock-o"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.time}</Text>
              </View>
              <View style={styles.containerJourneys_text_container}>
                <View style={styles.containerJourneys_icon}>
                  <Icon
                    color="white"
                    type="font-awesome"
                    name="calendar"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_text_container}>
                <View
                  style={[styles.containerJourneys_icon, { marginRight: 8 }]}
                >
                  <Icon
                    color="white"
                    type="material-community"
                    name="home-map-marker"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.from}</Text>
              </View>
              <View style={styles.containerJourneys_text_container}>
                <View
                  style={[styles.containerJourneys_icon, { marginRight: 8 }]}
                >
                  <Icon
                    color="white"
                    type="material-community"
                    name="map-marker"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.to}</Text>
              </View>
            </View>

            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_text_container}>
                <View
                  style={[
                    styles.containerJourneys_icon,
                    { marginLeft: 4, marginRight: 12 },
                  ]}
                >
                  <Icon
                    color="white"
                    type="font-awesome"
                    name="euro"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.price}</Text>
              </View>
              <View style={styles.containerJourneys_text_container}>
                <View
                  style={[
                    styles.containerJourneys_icon,
                    { marginLeft: 4, marginRight: 12 },
                  ]}
                >
                  <Icon
                    color="white"
                    type="font-awesome-5"
                    name="walking"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>
                  {item.transport}
                </Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      ))}
      <View style={{ marginBottom: 10 }} />
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerJourneys: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  containerJourneys_text_title: {
    flexDirection: "row",
    color: "white",
    fontSize: 20,
    paddingBottom: 5,
  },
  containerJourneys_icon: {
    marginRight: 10,
  },
  containerJourneys_text: {
    color: "#dedede",
  },
  containerJourneys_text_container: {
    flexDirection: "row",
    //paddingRight: 0,
    flex: 0.5,
  },
  containerJourneys_row: {
    flexDirection: "row",
    paddingVertical: 3,
  },
});
