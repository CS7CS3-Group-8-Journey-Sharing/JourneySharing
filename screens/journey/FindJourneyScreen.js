import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  Button
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SearchBar } from 'react-native-elements';
import {
  getJourneysWithinRadius
} from "../../utils/APIcalls";
import JourneyListView from "../../components/JourneyListViewFind";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function FindJourneyScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);

  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  const [journeys, setJourneys] = useState([]);
  const [currentJourney, setCurrentJourney] = useState({});
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
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
        },
        animated: true
      },
    )
  }

  useEffect(() => {
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

      getJourneysWithinRadius(userLocation, 500, userToken).then(res => {
        setCurrentJourney(res[0]);
        setJourneys(res);
        setLoading(false);
      }).catch((error) => console.log(error))
    })();
  }, [])

  useLayoutEffect(() => {
    if(mapView.current !== null && currentJourney !== null){
      animateMap();
    }
  }, [currentJourney])

  if (journeys.length > 0 && !loading) {
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
            coordinate={userLocation}
            title="userLoc"
            opacity={0.0}
            identifier={'mk1'}
          />
          <MapView.Marker
            coordinate={{
              latitude: currentJourney.startLocation.lat,
              longitude: currentJourney.startLocation.lng,
            }}
            title="origin"
            identifier={'mk2'}
          />
          <MapView.Marker
            coordinate={{
              latitude: currentJourney.endLocation.lat,
              longitude: currentJourney.endLocation.lng,
            }}
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
          <JourneyListView
            navigation={navigation}
            list={journeys}
            setCurrentJourney={(journey) => {
              setCurrentJourney(journey);
            }}
            currentJourney={currentJourney}
            fromFindJourney
          />
        </ScrollView>
      </View>
    );
  } else if(!loading) {
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
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={{ marginBottom: 10 }}>
            Loading journeys withing 500m radius...
          </Text>
        </View>
      </View>
    );
  }
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
