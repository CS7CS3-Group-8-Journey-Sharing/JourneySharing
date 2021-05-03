import * as React from 'react';
import { Image, Button, Text, View, StyleSheet,ScrollView } from 'react-native';
import { Avatar ,ListItem,Rating, AirbnbRating,Icon} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AuthContext from '../../context/AuthContext';
import { getJourneysOfUser } from "../../utils/APIcalls";
import JourneyListView from "../../components/JourneyListView";
import COLORS from "../../common/colors"
import { getUserRate } from "../../utils/APIcalls";

export default function RatingScreen({ navigation })  {
    const list = getJourneysOfUser();
    const rate = getUserRate();

    return (
      <ScrollView>
        <ProfileView navigation={navigation}/>
        <View style={styles.container}>
          <Text style={styles.title}>Recurrent Journeys</Text>
          <JourneyListView navigation={navigation} list={list} />
        </View>
      </ScrollView>
    );
  }
  
  function ProfileView({ navigation }){
    const { authFunctions, user } = React.useContext(AuthContext);
  
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 10 }} />
        <View style={styles.headerContainer}>
          <View >
          <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          containerStyle={styles.containerJourneys}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //.abs
        >
        <View style={{ marginRight: 180 }} />
        <Avatar rounded source={ require('../../assets/default-profile.png') }  size={80} onPress={() => console.log('Avatar clicked!')} activeOpacity={0.7} avatarStyle={styles.avatar} containerStyle={{flex: -1, marginLeft: -200, marginTop: -5}}/>
        <ListItem.Content>
            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_text_container}>
                <Text style={styles.containerJourneys_text}>
                <Text style={styles.headerText}>{"Bob\n"}</Text>
                <Text style={styles.phoneText}>{"\n+123456789"}</Text>
                </Text>
              </View>
              <View style={styles.containerJourneys_rate_container}>
                <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                defaultRating={rate}
                size={20}
            />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
        </View>
        </View>
        <View style={{ marginBottom: 10 }} />
        <View style={styles.headerContainer}>
          <View >
          <ListItem
          style={{ marginHorizontal: 10, marginTop: 10 }}
          containerStyle={styles.containerJourneys}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95} //.abs
        >
        <View style={{ marginRight: 180 }} />
        <Avatar rounded source={ require('../../assets/default-profile.png') }  size={80} onPress={() => console.log('Avatar clicked!')} activeOpacity={0.7} avatarStyle={styles.avatar} containerStyle={{flex: -1, marginLeft: -200, marginTop: -5}}/>
        <ListItem.Content>
            <View style={styles.containerJourneys_row}>
              <View style={styles.containerJourneys_text_container}>
                <Text style={styles.containerJourneys_text}>
                <Text style={styles.headerText}>{"Joe\n"}</Text>
                <Text style={styles.phoneText}>{"\n+123456789"}</Text>
                </Text>
              </View>
              <View style={styles.containerJourneys_rate_container}>
                <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
                defaultRating={5}
                size={20}
            />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
        </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonContent} title='Back To Home' onPress={() => navigation.navigate("Home")} />
        </View>
      </View>
  )}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      alignItems: 'stretch',
    },
    headerContainer: {
      justifyContent: 'flex-start',
      backgroundColor: '#ffffff'
    },
    headerContent: {
      padding: 15,
      alignItems: 'center'
    },
    headerText:{
      padding: 5,
      fontSize:18,
      color:COLORS.mainColor,
      fontWeight:'600',
      flex: 2, marginLeft: -310, marginTop: -8
    },
    phoneText:{
        padding: 5,
        fontSize:12,
        color:COLORS.mainColor,
        fontWeight:'600',
        flex: 2, marginLeft: -310, marginTop: -8
      },
    avatar: {
  
    },
    detailsContainer: {
      justifyContent: 'space-around',
      alignSelf: 'stretch',
      flexDirection: 'row',
      backgroundColor: '#d3d3d3'
    },
    detailsContent: {
      padding: 5,
      alignItems: 'center'
    },
    detailsTitle: {
      color: '#00bfff'
    },
    detailsText: {
      color: '#000000'
    },
    buttonContainer: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonContent: {
      color: '#00bfff'
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
        color: COLORS.grey,
        marginTop: 10,
    },
    title: {
      marginHorizontal: 10, 
      marginTop: 10,
      fontSize: 25,
      fontWeight: "bold"
    }
  });
  