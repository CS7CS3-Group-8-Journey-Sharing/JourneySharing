import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Modal } from "react-native";
import { ListItem, Icon, Avatar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import COLORS from "../common/colors";
import CustomButton from "./CustomButton"
import { parseISOString, isoFormatDMY, isoFormatHMS } from "../utils/utilFunctions"
import { createRequest, getJourney, joinJourney } from "../utils/APIcalls"

export default function RequestsListView({
  navigation,
  list,
  goToProfilePage
}) {
  const { user, userToken } = React.useContext(AuthContext);
  const [journey, setJourney] = useState(true);

  const handleAcceptPress = (item) => {
    joinJourney(item.requestId, userToken).then(() => {}).catch(error => console.log(error))
  };

  const handleDenyPress = (item) => {

  };

  const goToViewTrip = (request) => {
    getJourney(request.journeyId, userToken).then((res) => {
      navigation.navigate("ViewTrip", {currentJourney: res})
    }).catch(error => { 
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      {list.map((item, i) => {
        return (
        <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          containerStyle={styles.containerJourneys}
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //
          onPress={() => handleItemPress(item)}
          disabled={true}
          key={i}
        >
          <ListItem.Content>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.containerJourneys_text_title}>
                <Text onPress={() => goToProfilePage(item.requestedUser)} style={styles.nameRequesting}>{item.requestedUser.firstName + " " +item.requestedUser.lastName}</Text> 
                {" "}requested to join your journey {" "}
                <Text onPress={() => goToViewTrip(item)} style={styles.journeyName}>{item.journeyName}</Text>
              </Text>
            </View>
            <View style={styles.containerJourneys_row}>
              <View style={{flex: 1}}>
                <CustomButton style={{marginHorizontal: 10}} title="ACCEPT" onPress={() => handleAcceptPress(item)} />
              </View>
              <View style={{flex: 1}}>
                <CustomButton style={{marginHorizontal: 10}} deny title="DENY" onPress={() => handleDenyPress(item)} />
              </View>
            </View>
      
          </ListItem.Content>
        </ListItem>
      )})}
      <View style={{ marginBottom: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "stretch",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerJourneys: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  containerJourneys_text_title: {
    flex: 1,
    color: COLORS.black,
    fontSize: 20,
    paddingBottom: 5,
  },
  containerJourneys_icon: {
    marginRight: 10,
  },
  containerJourneys_text: {
    color: COLORS.grey,
  },
  containerJourneys_text_container: {
    flexDirection: "row",
    //paddingRight: 0,
    flex: 0.5,
  },
  containerJourneys_row: {
    flexDirection: "row",
    paddingVertical: 10,
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
  },
  nameRequesting: {
    color: COLORS.secondaryColor
  },
  journeyName: {
    color: COLORS.secondaryColor
  }
});
