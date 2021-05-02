import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  Button,
  Switch,
  Modal
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SearchBar, Icon } from 'react-native-elements';
import {
  getJourneysWithinRadius,
  getWomenJourneys
} from "../../utils/APIcalls";
import JourneyListView from "../../components/JourneyListViewFind";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import COLORS from "../../common/colors";
import CustomButton from "../../components/CustomButton";

export default function FindJourneyScreen({ navigation }) {
  const { userToken } = React.useContext(AuthContext);

  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  const [journeys, setJourneys] = useState([]);
  const [filteredJourneys, setFilteredJourneys] = useState([]);
  const [currentJourney, setCurrentJourney] = useState({});
  const [search, setSearch] = useState('');
  const [userLocation, setUserLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [womenOnly, setWomenOnly] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(previousState => !previousState);
  const toggleSwitch = () => setWomenOnly(previousState => !previousState);
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


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the journeys
      // Update filteredJourneys
      const newData = journeys.filter(function (item) {
        const nameData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const originData = item.startLocation.name ? item.startLocation.name.toUpperCase() : ''.toUpperCase();
        const endData = item.endLocation.name ? item.endLocation.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return nameData.indexOf(textData) > -1 || originData.indexOf(textData) > -1 || endData.indexOf(textData) > -1;
      });
      setFilteredJourneys(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update filteredJourneys with journeys
      setFilteredJourneys(journeys);
      setSearch(text);
    }
  };

  const filterWomenOnly = () => {
    if(womenOnly) {
      
      setFilteredJourneys(journeys.filter(journey => journey.womenOnly));
    } else {
      setFilteredJourneys(journeys);
    }
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
        setFilteredJourneys(res);
        setLoading(false);
      }).catch((error) => console.log(error))
    })();
  }, [])

  useLayoutEffect(() => {
    if(mapView.current !== null && currentJourney !== null){
      animateMap();
    }
  }, [currentJourney])

  if (filteredJourneys.length > 0 && !loading) {
    return (
      <View style={styles.container}>

        <Modal
          visible={showPopup}
          transparent={true}
          onTouchOutside={() => {
            setShowPopup(!showPopup)
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{"Set women only"}</Text>
              <Switch
                trackColor={{ false: '#767577', true: COLORS.mainColor }}
                thumbColor={womenOnly ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={womenOnly}
              />
              <CustomButton
                title="Ok"
                style={{paddingTop: 10}}
                onPress={() => {
                  setShowPopup(!showPopup)
                  filterWomenOnly()
                }}
              />
            </View>
          </View>
        </Modal>

        <View style={{flexDirection: 'row'}}>
            <SearchBar
              placeholder="Search a journey..."
              onChangeText={setSearch}
              lightTheme
              round
              containerStyle={styles.searchBar}
              value={search}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={(text) => searchFilterFunction('')}
              placeholder="Search by name, origin or destination..."
            />
            <View style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center'}}>
              <Icon
                color={COLORS.greyMore}
                type="font-awesome"
                name="cog"
                size={30}
                onPress={() =>  togglePopup()}
              />
            </View>
        </View>
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
            list={filteredJourneys}
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
            No journeys found. Create one?
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
  searchBar: {
    flex: 6, 
    backgroundColor: COLORS.white, 
    borderColor: COLORS.white, 
    marginRight: 0, 
    paddingRight: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
