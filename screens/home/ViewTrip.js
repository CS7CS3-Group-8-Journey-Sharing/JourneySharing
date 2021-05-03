import React, { useState, useEffect, useRef } from "react";
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

import { GOOGLE_MAPS_APIKEY } from '@env';

export default function ViewTripScreen({ route,navigation }) {
  const {currentJourney} = route.params;
  navigation.setOptions({ headerTitle: currentJourney.name });

  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });

  const mapView = useRef(null);

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          onRegionChange={(newRegion) => setRegion(newRegion)}
          style={styles.map}
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          onMapReady={() => {
            mapView.current.fitToSuppliedMarkers(
              ['mk1', 'mk2'],
              { edgePadding: 
                {
                  top: 100,
                  right: 50,
                  bottom: 50,
                  left: 50
                }
              }
            )
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: currentJourney.startLocation.lat,
              longitude: currentJourney.startLocation.lng,
            }}
            title="origin"
            identifier={'mk1'}
          />
          <MapView.Marker
            coordinate={{
              latitude: currentJourney.endLocation.lat,
              longitude: currentJourney.endLocation.lng,
            }}
            title="destination"
            identifier={'mk2'}
          />
          <MapViewDirections
            origin={'mk1'}
            destination={'mk2'}
            mode="WALKING"
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="darkgreen"
            optimizeWaypoints={true}
          />
        </MapView>
        <ScrollView>
        <JourneyItemView navigation={navigation} item={currentJourney} />
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
