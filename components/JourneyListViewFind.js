import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import COLORS from "../common/colors";
import CustomButton from "./CustomButton"
import { parseISOString, isoFormatDMY, isoFormatHMS } from "../utils/utilFunctions"

export default function JourneyListView({
  navigation,
  list,
  currentJourney,
  setCurrentJourney,
  fromFindJourney,
  isHappening
}) {
  const handleItemPress = (item) => {
    if (fromFindJourney) {
      setCurrentJourney(item);
    } else {
      navigation.navigate("ViewTrip", {currentJourney: item});
    }
  };

  const joinJourney = (item) => {

  }
  return (
    <View>
      {list.map((item, i) => {

        const datetimeStart = parseISOString(item.startTime);

        return (
        <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          containerStyle={styles(isHappening, currentJourney, item).containerJourneys}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          onPress={() => handleItemPress(item)}
          key={i}
        >
          <ListItem.Content>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles().containerJourneys_text_title}>
                {item.name}
              </Text>
              {fromFindJourney && (
                <CustomButton
                  onPress={() => joinJourney(item)}
                  title="JOIN"
                />
              )}
            </View>
            <View style={styles().containerJourneys_row}>
              <View style={styles().containerJourneys_icon}>
                <Icon
                  color={COLORS.black}
                  type="material-icons"
                  name="group"
                  size={20}
                />
              </View>
              <Text style={styles().containerJourneys_text}>
                <Text style={{ color: COLORS.mainColor }}>{item.ownerEmail}</Text>,{" "}
                {item.participantsEmails}
              </Text>
            </View>

            <View style={styles().containerJourneys_row}>
              <View style={styles().containerJourneys_text_container}>
                <View style={styles().containerJourneys_icon}>
                  <Icon
                    color={COLORS.black}
                    type="font-awesome"
                    name="clock-o"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>{isoFormatHMS(datetimeStart)}</Text>
              </View>
              <View style={styles().containerJourneys_text_container}>
                <View style={styles().containerJourneys_icon}>
                  <Icon
                    color={COLORS.black}
                    type="font-awesome"
                    name="calendar"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>{isoFormatDMY(datetimeStart)}</Text>
              </View>
            </View>

            <View style={styles().containerJourneys_row}>
              <View style={styles().containerJourneys_text_container}>
                <View
                  style={[styles().containerJourneys_icon, { marginRight: 8 }]}
                >
                  <Icon
                    color={COLORS.black}
                    type="material-community"
                    name="home-map-marker"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>{item.startLocation.name ? item.startLocation.name : item.startLocation.lat.toFixed(4) + ","+item.startLocation.lng.toFixed(3)}</Text>
              </View>
              <View style={styles().containerJourneys_text_container}>
                <View
                  style={[styles().containerJourneys_icon, { marginRight: 8 }]}
                >
                  <Icon
                    color={COLORS.black}
                    type="material-community"
                    name="map-marker"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>{item.endLocation.name ? item.endLocation.name : item.endLocation.lat.toFixed(4) + ","+item.endLocation.lng.toFixed(3)}</Text>
              </View>
            </View>

            <View style={styles().containerJourneys_row}>
              <View style={styles().containerJourneys_text_container}>
                <View
                  style={[
                    styles().containerJourneys_icon,
                    { marginLeft: 4, marginRight: 12 },
                  ]}
                >
                  <Icon
                    color={COLORS.black}
                    type="font-awesome"
                    name="euro"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>{item.price}</Text>
              </View>
              <View style={styles().containerJourneys_text_container}>
                <View
                  style={[
                    styles().containerJourneys_icon,
                    { marginLeft: 4, marginRight: 12 },
                  ]}
                >
                  <Icon
                    color={COLORS.black}
                    type="font-awesome-5"
                    name="walking"
                    size={20}
                  />
                </View>
                <Text style={styles().containerJourneys_text}>
                  {item.modeOfTransport}
                </Text>
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      )})}
      <View style={{ marginBottom: 10 }} />
    </View>
  );
}

const styles = (isHappening, currentJourney, item) => StyleSheet.create({
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
    borderColor: (isHappening || currentJourney == item) ? COLORS.mainColor : "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  containerJourneys_text_title: {
    flex: 1,
    color: COLORS.black,
    fontSize: 20,
    paddingBottom: 5,
  },
  containerJourneys_icon: {
    marginRight: 10,
  },
  containerJourneys_text: {
    color: COLORS.grey,
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
