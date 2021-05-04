import React, { useState, useEffect, useDebugValue } from "react";
import {
  Image,
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  Avatar,
  ListItem,
  Rating,
  AirbnbRating,
  Icon,
} from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import AuthContext from "../../context/AuthContext";
import { getUserDetails } from "../../utils/APIcalls";
import COLORS from "../../common/colors";
import CustomButton from "../../components/CustomButton";

export default function RatingScreen({ route, navigation }) {
  const { userToken, user } = React.useContext(AuthContext);
  const { participantEmails } = route.params;

  const [usersToRate, setUsersToRate] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [retrieved, setRetrieved] = useState(false);

  useEffect(() => {
    participantEmails.forEach((email) => {
      getUserDetails(email, userToken)
        .then((res) => {
          if (!retrieved)
            setUsersToRate((usersToRate) => [...usersToRate, res]);
          setRetrieved(true);
        })
        .catch((error) => console.lof(error));
    });
  }, []);

  const handleFinishRating = (email, value) => {
    console.log(email, value);
  };

  const handleSubmitRatings = () => {
    navigation.navigate("Home");
  };

  const ProfileView = (usersToRate) => {
    if (usersToRate)
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 10 }} />
          <View style={styles.headerContainer}>
            {usersToRate.usersToRate.map((item, i) => {
              return (
                <View>
                  <ListItem
                    style={{ marginHorizontal: 10, marginTop: 10 }}
                    containerStyle={styles.containerJourneys}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95} //.abs
                  >
                    <View style={{ marginRight: 180 }} />
                    <Avatar
                      rounded
                      source={require("../../assets/default-profile.png")}
                      size={80}
                      onPress={() => console.log("Avatar clicked!")}
                      activeOpacity={0.7}
                      avatarStyle={styles.avatar}
                      containerStyle={{
                        flex: -1,
                        marginLeft: -200,
                        marginTop: -5,
                      }}
                    />
                    <ListItem.Content>
                      <View style={styles.containerJourneys_row}>
                        <View style={styles.containerJourneys_text_container}>
                          <Text style={styles.containerJourneys_text}>
                            <Text style={styles.headerText}>
                              {item.firstName + " " + item.lastName}
                            </Text>
                            {"\n"}
                            <Text style={styles.phoneText}>{item.email}</Text>
                          </Text>
                        </View>
                        <View style={styles.containerJourneys_rate_container}>
                          <AirbnbRating
                            count={5}
                            reviews={[
                              "Terrible",
                              "Bad",
                              "Okay",
                              "Good",
                              "Great",
                            ]}
                            defaultRating={5}
                            size={20}
                            onFinishRating={(value) =>
                              handleFinishRating(item.email, value)
                            }
                          />
                        </View>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                </View>
              );
            })}
          </View>
          <View style={{ marginBottom: 10 }} />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Submit Ratings"
              onPress={() => handleSubmitRatings()}
            />
            <Button
              style={styles.buttonContent}
              title="Back To Home"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      );
    else return <></>;
  };

  if (participantEmails != null && usersToRate.length > 0) {
    return (
      <ScrollView>
        <ProfileView usersToRate={usersToRate} />
      </ScrollView>
    );
  } else if (usersToRate.length == 0) {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={{ marginBottom: 10 }}>
            No other participants to rate, you've arrived at your destination.
          </Text>
          <Button
            type="outline"
            title="Back to Home"
            color={COLORS.mainColor}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 10 }}>Loading...</Text>
      </View>
    );
  }
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
  headerContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  headerContent: {
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    padding: 5,
    fontSize: 18,
    color: COLORS.mainColor,
    fontWeight: "600",
    flex: 1,
    marginLeft: -310,
    marginTop: -8,
  },
  phoneText: {
    padding: 5,
    fontSize: 12,
    color: COLORS.mainColor,
    fontWeight: "600",
    flex: 1,
    marginLeft: -310,
    marginTop: -8,
  },
  avatar: {},
  detailsContainer: {
    justifyContent: "space-around",
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#d3d3d3",
  },
  detailsContent: {
    padding: 5,
    alignItems: "center",
  },
  detailsTitle: {
    color: "#00bfff",
  },
  detailsText: {
    color: "#000000",
  },
  buttonContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    color: "#00bfff",
  },
  containerJourneys_row: {
    flexDirection: "row",
    paddingVertical: 3,
  },
  containerJourneys_text_container: {
    flexDirection: "row",
    //paddingRight: 0,
    flex: 0.4,
  },
  containerJourneys_rate_container: {
    flexDirection: "row",
    marginTop: -10,
    //paddingRight: 0,
    flex: 0.4,
  },
  containerJourneys_text: {
    flexDirection: "row",
    color: COLORS.mainColor,
    marginTop: 10,
  },
  title: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
});
