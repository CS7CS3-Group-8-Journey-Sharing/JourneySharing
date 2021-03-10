import React, { useState, useEffect } from "react";
import { Button, Text, Input, CheckBox } from "react-native-elements";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker"
import AuthContext from "../../context/AuthContext";

export default function CreateJourneyScreen({ navigation }) {
  // get and use current location data
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const {userToken} = React.useContext(AuthContext);

  // << pulled straight from datetimepicker
  const [startDate, setStartDate] = useState(new Date());
  //const [startTime, setStartTime] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  // >>

  const [recurring, setRecurring] = useState(false);
  const [transportMode, setTransportMode] = useState("walk");
  const [startMarker, setStartMarker] = useState({ coordinate: null, visible: false, set: false });
  const [endMarker, setEndMarker] = useState({ coordinate: null, visible: false, set: false });


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
          onPress={e => placeMarker(e)}
        >
          {startMarker.visible ? <Marker coordinate={startMarker.coordinate} pinColor='#080' /> : null}
          {endMarker.visible ? <Marker coordinate={endMarker.coordinate} /> : null}
        </MapView>

        {setMarkersButton()}

      </View>

      {
        // Journey details/options menu might need own screen
        // could use elements overlay for options
        // or react native bottom drawer
      }
      <View style={styles.journeyMenu}>
        {/*
          {startMarker.visible ? <Text>Start Marker Visible</Text> : <Text>Start Marker NOT Visible</Text>}
          {endMarker.visible ? <Text>End Marker Visible</Text> : <Text>End Marker NOT Visible</Text>}
          {startMarker.set ? <Text>Start Marker Set</Text> : <Text>Start Marker NOT Set</Text>}
          {endMarker.set ? <Text>End Marker Set</Text> : <Text>End Marker NOT Set</Text>}
        */}
        <DropDownPicker
          items={[
            // Could add nice icons
            { label: 'Walk', value: 'walk' },
            { label: 'Car', value: 'car' },
            { label: 'Bicycle', value: 'bike' },
            { label: 'Taxi', value: 'taxi' },
          ]}
          defaultValue={transportMode}
          containerStyle={{ height: 40}}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            //justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={item => setTransportMode(item.value)}
        />
        <CheckBox
          //center
          iconRight
          title="Recurring? Repeat?"
          type="outline"
          checked={recurring}
          onPress={() => setRecurring(!recurring)}
        />
        <TouchableOpacity onPress={() => console.log("Time thing")}>
          <Input
            disabled="True"
            leftIcon={{ type: 'font-awesome', name: 'clock-o' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Date thing")}>
          <Input
            disabled="True"
            leftIcon={{ type: 'font-awesome', name: 'calendar' }}
          />
        </TouchableOpacity>

        {show && (
          // Does it matter where this goes?
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Button
          type="outline"
          disabled={true}
          title="Create Journey"
          onPress={() => createJourney}
        />
      </View>
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
    height:(Dimensions.get("window").height / 2 - 10),
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2 - 60,
    //height: inherit,
  },
});
