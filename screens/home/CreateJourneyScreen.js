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
import CustomDatePicker2 from "../../components/CustomDatePicker2";
import DropDownPicker from "react-native-dropdown-picker";
import MapViewDirections from "react-native-maps-directions";
import AuthContext from "../../context/AuthContext";
import { Platform } from "react-native";
import axios from "axios";
import {sendCreateJourney, what} from "../../utils/APIcalls"

export default function CreateJourneyScreen({ navigation }) {
  // get and use current location data
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const GOOGLE_MAPS_APIKEY = null;

  const { userToken } = React.useContext(AuthContext);

  const [journeyName, setJourneyName] = useState("");
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

  const [recurringDays, setRecurringDays] = useState([
    false, false, false, false, false, false, false,
  ]);

  const DayCheckbox = (props) => {
    return(
      <CheckBox 
        title={props.name} 
        checked={recurringDays[props.dayIndex]}
        onPress={() => {
          let newDays = [...recurringDays];
          let oldBool = recurringDays[props.dayIndex];
          newDays[props.dayIndex] = !oldBool;
          setRecurringDays(newDays);
        }} />
    );
  }

  function placeMarker(e) {
    if (!startMarker.set) {
      setStartMarker({ coordinate: e.nativeEvent.coordinate, visible: true });
    } else if (!endMarker.set) {
      setEndMarker({ coordinate: e.nativeEvent.coordinate, visible: true });
    }
  }

  // Should probably tell people what they have to enter before creating
  const readyToCreate = () => {
    //TODO: Add more checks
    return startMarker.set && endMarker.set
  }

  function createJourney() {
    console.log("Send it");

    //TODO: validate data
    var journey = {
      name: journeyName,
      maxParticipants: 99999,
      modeOfTransport: transportMode.toUpperCase(),

      //ownerId: userToken,
      ownerId: "6065e0e6fdb39f04922f3d53",
      participantIds: ["6065e1e3388f3868f0487e30", "6065e1fb388f3868f0487e31"],
      //participantIds: [],

      recurring: recurring,
      recurringDays: recurringDays,
      startTime: startDate,
      //TODO: Set actual end time
      // endtime is required parameter, probably shouldn't be
      endTime: "3000-02-30T20:42:49.978Z",
      //endTime: null,

      startLocation: {
        lat: startMarker.coordinate.latitude,
        lng: startMarker.coordinate.longitude,
        name: null
      },
      endLocation: {
        lat: endMarker.coordinate.latitude,
        lng: endMarker.coordinate.longitude,
        name: null
      },
    };

    let what = sendCreateJourney(journey);
    console.log(what);
    //  .then(function (response) {
    //    console.log(response);
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });
      console.log("plz sens");

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

      <ScrollView style={styles.journeyMenu}>
        <Input
          placeholder={"Enter journey name"}
          value={journeyName}
          onChangeText={setJourneyName}
        />
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

        {Platform.OS === 'android' ?
          <>
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
          </>
          :
          <>
            <CustomDatePicker2 date={startDate} setDate={setStartDate} mode={"date"} setShow={setShowDatePicker}/>
            <CustomDatePicker2 date={startDate} setDate={setStartDate} mode={"time"} setShow={setShowDatePicker}/>
          </>
        }

        {showDatePicker && Platform.OS === "android" && (
          <CustomDatePicker2 date={startDate} setDate={setStartDate} mode={dateTimeMode} setShow={setShowDatePicker}/>
        )
        }

        <CheckBox
          //center
          iconRight
          title="Recurring? Repeat?"
          type="outline"
          checked={recurring}
          onPress={() => setRecurring(!recurring)}
        />

        {recurring && (
          <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <DayCheckbox name="Mon" dayIndex={0} />
            <DayCheckbox name="Tue" dayIndex={1} />
            <DayCheckbox name="Wed" dayIndex={2} />
            <DayCheckbox name="Thu" dayIndex={3} />
            <DayCheckbox name="Fri" dayIndex={4} />
            <DayCheckbox name="Sat" dayIndex={5} />
            <DayCheckbox name="Sun" dayIndex={6} />
          </View>
        )}

        <Button
          type="outline"
          disabled={!readyToCreate()}
          title="Create Journey"
          onPress={() => createJourney()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    //justifyContent: "center",
    //justifyContent: "space-between",
    //justifyContent: "flex-start",
    //alignItems: "center",
  },

  journeyMenu: {
    flex: 1,
    display: "flex",
    //justifyContent: "center",
    //alignItems: "center",
  },

  dayCheckbox: {
    flex: 1,
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
