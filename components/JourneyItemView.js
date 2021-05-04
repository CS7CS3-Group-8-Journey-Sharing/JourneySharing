import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import TouchableScale from "react-native-touchable-scale";
import COLORS from "../common/colors";
import CustomButton from "./CustomButton";
import {
  parseISOString,
  isoFormatDMY,
  isoFormatHMS,
} from "../utils/utilFunctions";
import { startJourney, endJourney, deleteJourney } from "../utils/APIcalls";
import AuthContext from "../context/AuthContext";

export default function JourneyItemView({
  item,
  navigation,
  setShowPopup,
  setPopupText,
  setFromEnd,
}) {
  const datetimeStart = parseISOString(item.startTime);

  const { user, userToken } = React.useContext(AuthContext);

  const [isOwner, setIsOwner] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsOwner(user.email == item.ownerEmail);
    setIsActive(item.active);
  }, []);

  const doDeleteJourney = (journeyId) => {
    deleteJourney(journeyId, userToken)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error deleting journey: " + error);
        navigation.navigate("Home");
      });
  };

  const handleStartPress = (journey) => {
    startJourney(user.email, journey.journeyId, userToken)
      .then(() => {
        setPopupText(
          "Journey " +
            journey.name +
            " started, it has switched to 'Started Journeys' on your home page."
        );
        setShowPopup(true);
      })
      .catch((error) => console.log(error));
  };

  const handleEndPress = (journey) => {
    endJourney(user.email, journey.journeyId, userToken)
      .then(() => {
        setFromEnd(true);
        setPopupText(
          "Journey " +
            journey.name +
            " ended. Please, rate your fellow travellers and proceed to payment."
        );
        setShowPopup(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <ListItem
        style={{ marginHorizontal: 10, marginTop: 10 }}
        containerStyle={styles.containerJourneys}
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //.abs
        onPress={() => handleItemPress(item)}
      >
        <ListItem.Content>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.containerJourneys_text_title}>{item.name}</Text>
          </View>
          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_icon}>
              <Icon
                color={COLORS.black}
                type="material-icons"
                name="group"
                size={20}
              />
            </View>
            <Text style={styles.containerJourneys_text}>
              <Text style={{ color: COLORS.mainColor }}>{item.ownerEmail}</Text>
              {item.participantEmails &&
                item.participantEmails.map((item, i) => (
                  <Text>{", " + item}</Text>
                ))}
            </Text>
          </View>

          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_text_container}>
              <View style={styles.containerJourneys_icon}>
                <Icon
                  color={COLORS.black}
                  type="font-awesome"
                  name="clock-o"
                  size={20}
                />
              </View>
              <Text style={styles.containerJourneys_text}>
                {isoFormatHMS(datetimeStart)}
              </Text>
            </View>
            <View style={styles.containerJourneys_text_container}>
              <View style={styles.containerJourneys_icon}>
                <Icon
                  color={COLORS.black}
                  type="font-awesome"
                  name="calendar"
                  size={20}
                />
              </View>
              <Text style={styles.containerJourneys_text}>
                {isoFormatDMY(datetimeStart)}
              </Text>
            </View>
          </View>

          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_text_container}>
              <View style={[styles.containerJourneys_icon, { marginRight: 8 }]}>
                <Icon
                  color={COLORS.black}
                  type="material-community"
                  name="home-map-marker"
                  size={20}
                />
              </View>
              <Text style={styles.containerJourneys_text}>
                {item.startLocation.name
                  ? item.startLocation.name
                  : item.startLocation.lat.toFixed(4) +
                    "," +
                    item.startLocation.lng.toFixed(3)}
              </Text>
            </View>
            <View style={styles.containerJourneys_text_container}>
              <View style={[styles.containerJourneys_icon, { marginRight: 8 }]}>
                <Icon
                  color={COLORS.black}
                  type="material-community"
                  name="map-marker"
                  size={20}
                />
              </View>
              <Text style={styles.containerJourneys_text}>
                {item.endLocation.name
                  ? item.endLocation.name
                  : item.endLocation.lat.toFixed(4) +
                    "," +
                    item.endLocation.lng.toFixed(3)}
              </Text>
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
                  color={COLORS.black}
                  type="font-awesome"
                  name="euro"
                  size={20}
                />
              </View>
              {/*<Text style={styles.containerJourneys_text}>{item.price}</Text>*/}
              <Text style={styles.containerJourneys_text}>"$$$$$$$"</Text>
            </View>
            <View style={styles.containerJourneys_text_container}>
              <View
                style={[
                  styles.containerJourneys_icon,
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
              <Text style={styles.containerJourneys_text}>
                {item.modeOfTransport}
              </Text>
            </View>
          </View>
        </ListItem.Content>
      </ListItem>
      {isOwner ? (
        <>
          <View style={{ marginBottom: 10 }} />
          {!isActive ? (
            <CustomButton
              style={{ marginHorizontal: 10 }}
              title="START"
              onPress={() => handleStartPress(item)}
            />
          ) : (
            <CustomButton
              style={{ marginHorizontal: 10 }}
              deny
              title="END"
              onPress={() => handleEndPress(item)}
            />
          )}
          <View style={{ marginBottom: 10 }} />
        </>
      ) : (
        <>
          <View
            style={{ marginVertical: 10, marginLeft: 10, textAlign: "center" }}
          >
            {isActive ? (
              <Text style={styles.comment_title}>The journey has started!</Text>
            ) : (
              <Text style={styles.comment_title}>
                Waiting for the owner to start the journey
              </Text>
            )}
          </View>
        </>
      )}
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
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  containerJourneys_text_title: {
    flex: 1,
    color: COLORS.black,
    fontSize: 20,
    paddingBottom: 5,
  },
  comment_title: {
    flex: 1,
    color: COLORS.black,
    fontSize: 20,
    paddingBottom: 5,
    textAlign: "center",
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
