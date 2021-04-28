import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SearchBar } from 'react-native-elements';
import {
  getJourneysWithinRadius,
  getJourneysOfUser,
} from "../../utils/APIcalls";
import HomeScreenItems from "../../components/JourneyListView";

export default function FindJourneyScreen({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  const [journeys, setJourneys] = useState(getJourneysWithinRadius(500));
  const [currentJourney, setCurrentJourney] = useState(journeys[0]);
  const [search, setSearch] = useState('');

  const GOOGLE_MAPS_APIKEY = "#####";

  if (journeys.length > 0)
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search a journey..."
          onChangeText={setSearch}
          lightTheme
          round
          value={search}
        />
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
          <HomeScreenItems
            navigation={navigation}
            list={journeys}
            setCurrentJourney={setCurrentJourney}
            currentJourney={currentJourney}
            fromFindJourney
          />
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
});
