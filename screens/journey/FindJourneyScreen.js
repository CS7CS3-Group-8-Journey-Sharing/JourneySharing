import React, { useState, useEffect, useRef } from "react";
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
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

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
  const [userLocation, setUserLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const mapView = useRef(null);

  const GOOGLE_MAPS_APIKEY = "#####";

  const animateMap = () => {
    mapView.current.fitToSuppliedMarkers(
      ['mk2', 'mk3', 'mk1'],
      { edgePadding: 
        {
          top: 100,
          right: 50,
          bottom: 50,
          left: 50
        }
      }
    )
  }

  useEffect(() => {
    if (mapView) {
      (async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
  
        setUserLocation(userLocation)
        /*mapView.current.animateToRegion({ // Takes a region object as parameter
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },1000);*/
      })();
    }
  }, [])

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
          ref={mapView}
          onRegionChange={(newRegion) => setRegion(newRegion)}
          style={styles.map}
          showsUserLocation
          followsUserLocation
          provider={PROVIDER_GOOGLE}
          onMapReady={() => {
            mapView.current.fitToSuppliedMarkers(
              ['mk2', 'mk3', 'mk1'],
              { edgePadding: 
                {
                  top: 50,
                  right: 50,
                  bottom: 50,
                  left: 50
                }
              }
            )
          }}
        >
          <MapView.Marker
            coordinate={userLocation}
            title="userLoc"
            opacity={0.0}
            identifier={'mk1'}
          />
          <MapView.Marker
            coordinate={currentJourney.coords.origin}
            title="origin"
            identifier={'mk2'}
          />
          <MapView.Marker
            coordinate={currentJourney.coords.destination}
            title="destination"
            identifier={'mk3'}
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
            setCurrentJourney={(journey) => {
              animateMap();
              setCurrentJourney(journey)}
            }
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
