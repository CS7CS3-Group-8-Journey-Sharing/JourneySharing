import React, { useState, useEffect, useFocusEffect } from "react";
import { Text, ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import JourneyListView from "../../components/JourneyListViewFind";
import COLORS from "../../common/colors"
import { getOwnersJourneys, getParticipatingJourneys } from "../../utils/APIcalls";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const { userToken, user } = React.useContext(AuthContext);
  const isFocused = useIsFocused();

  const [loading, setLoading] = useState(true);
  const [ownerJourneys, setOwnerJourneys] = useState([]);
  const [participatingJourneys, setParticipatingJourneys] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOwnersJourneys(user.email, userToken).then(res => {
        setOwnerJourneys(res);
        getParticipatingJourneys(user.email, userToken).then(res => { 
          setParticipatingJourneys(res);
          setLoading(false);
        }).catch((error) => {
          console.log(error)
          setLoading(false);
        })
      }).catch((error) => {
        console.log(error)
        setLoading(false);
      })
    });

    return unsubscribe;
  }, [navigation])

  if ((ownerJourneys.length > 0 || participatingJourneys > 0) && !loading) {
    return (
      <ScrollView>
        { ownerJourneys.length> 0 && 
          <View style={styles.container}>
            {/* Journeys that you are the owner of */}
            <Text style={styles.title}>Your Journeys</Text> 
            <JourneyListView isHappening navigation={navigation} list={ownerJourneys} />
          </View>
        }
        { participatingJourneys.length> 0 && 
          <View style={styles.container}>
            {/* Journeys that you are NOT the owner of, but are participating in */}
            <Text style={styles.title}>Participating In</Text> 
            <JourneyListView navigation={navigation} list={participatingJourneys} />
          </View>
        }
      </ScrollView>
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
            color={COLORS.mainColor}
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
            Loading journeys...
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
    alignItems: "stretch",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginHorizontal: 10, 
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold"
  }
});