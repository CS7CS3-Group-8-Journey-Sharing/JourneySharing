import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  ListItem,
  Badge,
  Icon,
  withBadge,
  Avatar,
  Button,
} from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { mapperModeOfTransport } from "../../utils/utilFunctions";

import JourneyItemView from "../../components/JourneyItemView";

import { GOOGLE_MAPS_APIKEY } from "@env";
import CustomButton from "../../components/CustomButton";

export default function ViewTripScreen({ route, navigation }) {
  const { currentJourney } = route.params;
  navigation.setOptions({ headerTitle: currentJourney.name });

  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00582,
    longitudeDelta: 0.00271,
  });
  const [showPopup, setShowPopup] = useState(false);
  const [fromEnd, setFromEnd] = useState(false);
  const [popupText, setPopupText] = useState("");

  const mapView = useRef(null);

  currentJourney.modeOfTransport = mapperModeOfTransport(
    currentJourney.modeOfTransport
  );

  console.log(currentJourney.journeyId);
  return (
    <View style={styles.container}>
      <Modal
        visible={showPopup}
        transparent={true}
        onTouchOutside={() => {
          setShowPopup(!showPopup);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{popupText}</Text>
            <CustomButton
              title="Ok"
              style={{ paddingTop: 10 }}
              onPress={() => {
                setShowPopup(!showPopup);
                if (fromEnd) {
                  navigation.navigate("Rating");
                  navigation.navigate("Rating", {
                    participantEmails: currentJourney.participantEmails,
                  });
                } else {
                  navigation.navigate("Home");
                }
              }}
            />
          </View>
        </View>
      </Modal>

      <MapView
        initialRegion={region}
        onRegionChange={(newRegion) => setRegion(newRegion)}
        style={styles.map}
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          mapView.current.fitToSuppliedMarkers(["mk1", "mk2"], {
            edgePadding: {
              top: 100,
              right: 50,
              bottom: 50,
              left: 50,
            },
          });
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: currentJourney.startLocation.lat,
            longitude: currentJourney.startLocation.lng,
          }}
          title="origin"
          identifier={"mk1"}
        />
        <MapView.Marker
          coordinate={{
            latitude: currentJourney.endLocation.lat,
            longitude: currentJourney.endLocation.lng,
          }}
          title="destination"
          identifier={"mk2"}
        />
        <MapViewDirections
          origin={{
            latitude: currentJourney.startLocation.lat,
            longitude: currentJourney.startLocation.lng,
          }}
          destination={{
            latitude: currentJourney.endLocation.lat,
            longitude: currentJourney.endLocation.lng,
          }}
          mode={currentJourney.modeOfTransport}
          apikey={"AIzaSyDng0CwnEOFcCNp3vLzQ0Q_W7GA_WKs6B0"}
          strokeWidth={3}
          strokeColor="darkgreen"
          optimizeWaypoints={true}
        />
      </MapView>
      <ScrollView>
        <JourneyItemView
          navigation={navigation}
          item={currentJourney}
          setPopupText={setPopupText}
          setShowPopup={setShowPopup}
          setFromEnd={setFromEnd}
        />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
