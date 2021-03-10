import React, { useState, useEffect } from "react";
import { Button, Text, Input, CheckBox } from "react-native-elements";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import CustomDatePicker from "./CustomDatePicker";
import DropDownPicker from "react-native-dropdown-picker";
import MapViewDirections from "react-native-maps-directions";
import AuthContext from "../../context/AuthContext";

export default function CreateJourneyScreen({ navigation }) {
  // get and use current location data
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const GOOGLE_MAPS_APIKEY = "AIzaSyBvpQxAF7Ix36SK5pdB1vyW6O3Ek5tUAYI";

  const { userToken } = React.useContext(AuthContext);

  // is date AND time
  const [startDate, setStartDate] = useState(new Date());
  const [dateTimeMode, setDateTimeMode] = useState("date");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [recurring, setRecurring] = useState(false);
  const [transportMode, setTransportMode] = useState("walk");
  const [startMarker, setStartMarker] = useState({
    coordinate: null,
    visible: false,
    set: false,
  });
  const [endMarker, setEndMarker] = useState({
    coordinate: null,
    visible: false,
    set: false,
  });

  function placeMarker(e) {
    if (!startMarker.set) {
      setStartMarker({ coordinate: e.nativeEvent.coordinate, visible: true });
    } else if (!endMarker.set) {
      setEndMarker({ coordinate: e.nativeEvent.coordinate, visible: true });
    }
  }

  function createJourney() {
    // Check if all data is valid and both markers set
    // or keep button disabled until everything is ready
    // send it
  }

  function setMarkersButton() {
    if (!startMarker.set) {
      return (
        <Button
          title="Set Start"
          disabled={!startMarker.visible}
          // Best way to set 1 property?
          // This might be bad due to some async thing
          onPress={() => setStartMarker({ ...startMarker, set: true })}
        />
      );
    } else if (!endMarker.set) {
      return (
        <Button
          title="Set End"
          disabled={!endMarker.visible}
          onPress={() => setEndMarker({ ...endMarker, set: true })}
        />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          onRegionChange={setRegion}
          style={styles.map}
          onPress={(e) => placeMarker(e)}
        >
          {startMarker.visible ? (
            <Marker coordinate={startMarker.coordinate} pinColor="#080" />
          ) : null}
          {endMarker.visible ? (
            <Marker coordinate={endMarker.coordinate} />
          ) : null}
          {endMarker.set && startMarker.set ? (
            <MapViewDirections
              origin={startMarker.coordinate}
              destination={endMarker.coordinate}
              mode="WALKING"
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="darkgreen"
              optimizeWaypoints={true}
            />
          ) : null}
        </MapView>

        {setMarkersButton()}
      </View>

      {
        // Journey details/options menu might need own screen
        // could use elements overlay for options
        // or react native bottom drawer
      }
      <ScrollView style={styles.journeyMenu}>
        <DropDownPicker
          items={[
            // Could add nice icons
            { label: "Walk", value: "walk" },
            { label: "Car", value: "car" },
            { label: "Bicycle", value: "bike" },
            { label: "Taxi", value: "taxi" },
          ]}
          defaultValue={transportMode}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={
            {
              //justifyContent: 'flex-start'
            }
          }
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setTransportMode(item.value)}
        />
        <CheckBox
          //center
          iconRight
          title="Recurring? Repeat?"
          type="outline"
          checked={recurring}
          onPress={() => setRecurring(!recurring)}
        />
        <TouchableOpacity
          onPress={() => {
            setDateTimeMode("time");
            setShowDatePicker(true);
          }}
        >
          <Input
            disabled={true}
            placeholder={"Start Time"}
            value={startDate.toLocaleTimeString()}
            leftIcon={{ type: "font-awesome", name: "clock-o" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDateTimeMode("date");
            setShowDatePicker(true);
          }}
        >
          <Input
            disabled={true}
            placeholder={"Start Date"}
            value={startDate.toLocaleDateString()}
            leftIcon={{ type: "font-awesome", name: "calendar" }}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <CustomDatePicker
            date={startDate}
            mode={dateTimeMode}
            onClose={(date) => {
              if (date && Platform.OS !== "iOS") {
                setShowDatePicker(false);
                //setStartDate(moment(date));
                setStartDate(date);
              } else {
                setShowDatePicker(false);
              }
            }}
            onChange={(d) => {
              // don't know about this
              setStartDate(moment(d));
            }}
          />
        )}

        <Button
          type="outline"
          disabled={true}
          title="Create Journey"
          onPress={() => createJourney}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    //justifyContent: "center",
    //justifyContent: "space-between",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  journeyMenu: {
    flex: 1,
    display: "flex",
    //justifyContent: "center",
    //alignItems: "center",
  },

  mapContainer: {
    height: Dimensions.get("window").height / 2 - 10,
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2 - 60,
    //height: inherit,
  },
});
