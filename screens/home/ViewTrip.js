import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { ListItem, Badge,Icon,withBadge , Avatar, Button } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

import {
  getJourneysWithinRadius,
  getJourneysDetails,
} from "../../utils/APIcalls";
import HomeScreenItems from "../home/HomeScreenItem";

export default function ViewTripScreen({ route,navigation }) {
  const {num} = route.params;
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  const [journeys, setJourneys] = useState(getJourneysDetails(num));
  const [currentJourney, setCurrentJourney] = useState(journeys[0]);

  const GOOGLE_MAPS_APIKEY = "#####";

  if (journeys.length > 0)
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          onRegionChange={(newRegion) => setRegion(newRegion)}
          style={styles.map}
          //provider={PROVIDER_GOOGLE}
        >
          <MapView.Marker
            coordinate={currentJourney.coords.origin}
            title="origin"
          />
          <MapView.Marker
            coordinate={currentJourney.coords.destination}
            title="destination"
          />
          {/* 
          <MapViewDirections
            origin={currentJourney.coords.origin}
            destination={currentJourney.coords.destination}
            mode="WALKING"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="darkgreen"
            optimizeWaypoints={true}
          />
          */}
        </MapView>
        <ScrollView>
        <View>
      {journeys.map((item, i) => (
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
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.containerJourneys_text_title}>
                {item.title}
              </Text>
              
            </View>
            <View style={styles.containerJourneys_row}>
              <View style={[styles.containerJourneys_icon,{ marginTop:5}]}>
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
                <View style={[styles.containerJourneys_icon,{ marginTop:5}]}>
                  <Icon
                    color="white"
                    type="font-awesome"
                    name="clock-o"
                    size={20}
                  />
                </View>
                <Text style={styles.containerJourneys_text}>{item.time}</Text>
              </View>
            </View>
          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_text_container}>
                <View style={[styles.containerJourneys_icon,{ marginTop:5}]}>
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
                  style={[styles.containerJourneys_icon, { marginRight: 20 ,marginTop:5}]}
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
              
            </View>
          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_text_container}>
                <View
                  style={[styles.containerJourneys_icon, { marginRight: 20 ,marginTop:5}]}
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
                    styles.containerJourneys_icon, {  marginLeft: 3 ,marginRight: 25 ,marginTop:5}
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
            </View>
          <View style={styles.containerJourneys_row}>
            <View style={styles.containerJourneys_text_container}>
                <View
                  style={[
                    styles.containerJourneys_icon, { marginLeft: 3 ,marginRight: 25 ,marginTop:5}
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
      <View style={{ marginBottom: 20 }} />
    </View>
        </ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    alignItems: "stretch",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.3,
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerJourneys: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  containerJourneys_text_title: {
    flex: 1,
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
  },
  containerJourneys_icon: {
    marginRight: 20,
  },
  containerJourneys_text: {
    color: "#dedede",
    lineHeight: 30,
    fontSize: 15,
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
