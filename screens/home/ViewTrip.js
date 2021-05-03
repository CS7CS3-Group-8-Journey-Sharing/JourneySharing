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

import JourneyItemView from "../../components/JourneyItemView";

export default function ViewTripScreen({ route,navigation }) {
  const {item} = route.params;
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  
  const GOOGLE_MAPS_APIKEY = "#####";

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          onRegionChange={(newRegion) => setRegion(newRegion)}
          style={styles.map}
          //provider={PROVIDER_GOOGLE}
        >
          <MapView.Marker
            coordinate={item.coords.origin}
            title="origin"
          />
          <MapView.Marker
            coordinate={item.coords.destination}
            title="destination"
          />
          {/* 
          <MapViewDirections
            origin={item.coords.origin}
            destination={item.coords.destination}
            mode="WALKING"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="darkgreen"
            optimizeWaypoints={true}
          />
          */}
        </MapView>
        <ScrollView>
        <JourneyItemView navigation={navigation} item={item} />
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
});
