import React, { useState, useEffect } from "react";
import { Text, Input, CheckBox, Icon } from "react-native-elements";
import CustomButton from "../../components/CustomButton";
import {
  Platform,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import CustomDatePicker2 from "../../components/CustomDatePicker2";
import DropDownPicker from "react-native-dropdown-picker";
import MapViewDirections from "react-native-maps-directions";
import AuthContext from "../../context/AuthContext";
import { sendCreateJourney, getJourneysOfUser } from "../../utils/APIcalls"
import InputSpinner from "react-native-input-spinner";
import { GOOGLE_MAPS_APIKEY } from '@env';

export default function CreateJourneyScreen({ navigation }) {
  // get and use current location data
  const [region, setRegion] = useState({
    latitude: 53.3436581,
    longitude: -6.2563436,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421,
  });

  const { userToken, user } = React.useContext(AuthContext);

  const [journeyName, setJourneyName] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dateTimeMode, setDateTimeMode] = useState("date");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [recurring, setRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState([
    false, false, false, false, false, false, false,
  ]);
  const [womenOnly, setWomenOnly] = useState(false);
  const [transportMode, setTransportMode] = useState("walk");
  const [maxParticipants, setMaxParticipants] = useState(10)
  const [price, setPrice] = useState(0.00);

  const [startName, setStartName] = useState("Origin");
  const [endName, setEndName] = useState("Destination");
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

  const [popupText, setPopupText] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const isWoman = true;

  const DayCheckbox = (props) => {
    return (
      <CheckBox
        style={styles.dayCheckbox}
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

  const getPlacenames = (marker, setName) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + marker.coordinate.latitude + ',' + marker.coordinate.longitude + '&key=' + GOOGLE_MAPS_APIKEY)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
            //var number = responseJson.results[0].address_components[0].long_name;
            var street = responseJson.results[0].address_components[1].long_name;
            //console.log(number);
            //console.log(street);

            setName(street);
    })
  }

  function createJourney() {
    console.log("Send it");

    console.log("User Token: " + userToken);
    console.log("User email: " + user.email);
    console.log("ISO String?: " + startDate.toISOString());
    console.log(startName + " to " + endName);

    //TODO: validate data
    var journey = {
      name: journeyName,
      maxParticipants: maxParticipants,
      modeOfTransport: transportMode.toUpperCase(),

      ownerEmail: user.email,

      recurring: recurring,
      recurringDays: recurringDays,

      price: price,

      womenOnly: womenOnly,

      startTime: startDate.toISOString(),

      startLocation: {
        lat: startMarker.coordinate.latitude,
        lng: startMarker.coordinate.longitude,
        name: startName
      },
      endLocation: {
        lat: endMarker.coordinate.latitude,
        lng: endMarker.coordinate.longitude,
        name: endName
      },
    };

    //let response = sendCreateJourney(userToken, journey, setPopupText);
    sendCreateJourney(userToken, journey, setPopupText)
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("ViewTrip", {currentJourney: response.data});
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //ViewTripScreen
          //navigation.navigate(ViewTrip, {item: response.data});
          setPopupText("Oh no :(\n" + error.response.status + "\n" + error.message);
          setShowPopup(true);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          setPopupText("Oh no :(\nRequest was made but no response was received.\n" + error.request);
          setShowPopup(true);
        } else {
          // Something happened in setting up the request that triggered an Error
          setPopupText("Oh no, error with creating request. :(\n" + error.status);
          setShowPopup(true);
        }
        //console.log(error.config);
        //console.log(error.toJSON());
      });
  }

  function setMarkersButton() {
    if (!startMarker.set) {
      return (
        <CustomButton
          title="Set Start"
          disabled={!startMarker.visible}
          onPress={() => {
            setStartMarker({ ...startMarker, set: true })
            getPlacenames(startMarker, setStartName);
          }}
        />
      );
    } else if (!endMarker.set) {
      return (
        <CustomButton
          title="Set End"
          disabled={!endMarker.visible}
          onPress={() => {
            setEndMarker({ ...endMarker, set: true });
            getPlacenames(endMarker, setEndName);
            }
          }
        />
      );
    }
  }

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
            <Text style={styles.modalText}>{popupText}</Text>
            <CustomButton
              title="Ok"
              onPress={() => setShowPopup(!showPopup)}
            />
          </View>
        </View>
      </Modal>

      <View style={styles.mapContainer}>
        <MapView
          initialRegion={region}
          onRegionChange={setRegion}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
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
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            <TouchableOpacity
              style={{flexGrow: 1 }}
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
              style={{flexGrow: 1 }}
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
          </View>
          :
          <View style={{margin: 10, display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <CustomDatePicker2 style={{flex: 1}} date={startDate} setDate={setStartDate} mode={"date"} setShow={setShowDatePicker} />
            </View>
            <View style={{flex: 1}}>
              <CustomDatePicker2 style={{flex: 1}} date={startDate} setDate={setStartDate} mode={"time"} setShow={setShowDatePicker} />
            </View>
          </View>
        }

        {showDatePicker && Platform.OS === "android" && (
          <CustomDatePicker2 date={startDate} setDate={setStartDate} mode={dateTimeMode} setShow={setShowDatePicker} />
        )
        }

        <View style={{ flexDirection: "row", justifyContent: "space-between",}}>
          <View style={{flex: 1, flexGrow: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
            <Icon style={{paddingEnd: 10, paddingStart: 10}} color={COLORS.black} type="font-awesome" name="users" size={20}
            />
            <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize: 20 }}>
              Max Participants
            </Text>
          </View>

          <InputSpinner
            style={{flex: 1, flexGrow: 1}}
            //skin={"square"}
            shadow={false}
            max={20}
            min={1}
            step={1}
            rounded={false}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={maxParticipants}
            onChange={setMaxParticipants}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly",}}>
          <View style={{flex: 1, flexGrow: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
            <Icon style={{paddingEnd: 10, paddingStart: 10}} color={COLORS.black} type="font-awesome" name="euro" size={20} />
            <Text style={{ textAlign: "center", textAlignVertical: "center", fontSize: 20 }}>
              Price
            </Text>
          </View>

          <InputSpinner
            style={{flex: 1, flexGrow: 1}}
            //skin={"square"}
            shadow={false}
            max={1000}
            min={0}
            type={"real"}
            step={0.01}
            precision={2}
            rounded={false}
            colorMax={"#f04048"}
            colorMin={"#40c5f4"}
            value={price}
            onChange={setPrice}
          />
        </View>

        <CheckBox
          //center
          iconRight
          title="Recurring journey"
          type="outline"
          checked={recurring}
          onPress={() => setRecurring(!recurring)}
        />

        {recurring && (
          <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <DayCheckbox name="Mon" dayIndex={0} />
            <DayCheckbox name="Tue" dayIndex={1} />
            <DayCheckbox name="Wed" dayIndex={2} />
            <DayCheckbox name="Thu" dayIndex={3} />
            <DayCheckbox name="Fri" dayIndex={4} />
            <DayCheckbox name="Sat" dayIndex={5} />
            <DayCheckbox name="Sun" dayIndex={6} />
          </View>
        )}

        {isWoman && (
          <CheckBox
            //center
            iconRight
            title="Women only"
            type="outline"
            checked={womenOnly}
            onPress={() => setWomenOnly(!womenOnly)}
          />
        )}

        <CustomButton
          type="outline"
          style={{marginHorizontal: 10, marginBottom: 10}}
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
  },

  journeyMenu: {
    flex: 1,
    display: "flex",
    marginHorizontal: 5
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

  dayCheckbox: {
    flex: 1,
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
