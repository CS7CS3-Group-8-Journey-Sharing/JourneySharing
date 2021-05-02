import React, { useState, useEffect } from 'react';
import { Image, Button, Text, View, StyleSheet,ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AuthContext from '../../context/AuthContext';
import { getOwnersJourneys } from "../../utils/APIcalls";
import JourneyListView from "../../components/JourneyListViewFind";
import COLORS from "../../common/colors"

export default function ProfileScreen({ navigation }) {
  const { userToken, user } = React.useContext(AuthContext);

  const [recurrentJourneys, setRecurrentJourneys] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOwnersJourneys(user.email, userToken).then(res => {
        setRecurrentJourneys(res.filter(item => item.recurring));
      }).catch((error) => {
        console.log(error)
      })
    });

    return unsubscribe;
  }, [navigation])

  return (
    <ScrollView>
      <ProfileView />
      {}
      <View style={styles.container}>
        <Text style={styles.title}>Recurrent Journeys</Text>
        <JourneyListView navigation={navigation} list={recurrentJourneys} />
      </View>
    </ScrollView>
  );
}

function ProfileView(){
  const { authFunctions, user } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Avatar rounded source={ require('../../assets/default-profile.png') } size='xlarge' onPress={() => console.log('Avatar clicked!')} activeOpacity={0.7} avatarStyle={styles.avatar} />
          <Text style={styles.headerText}>{user.email}</Text>
          <Text style={styles.headerText}>+123456789</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>Reputation</Text>
          <Text style={styles.detailsText}>4.5/5</Text>
        </View>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>Ratings</Text>
          <Text style={styles.detailsText}>56</Text>
        </View>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>Journeys</Text>
          <Text style={styles.detailsText}>123</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>Age</Text>
          <Text style={styles.detailsText}>24</Text>
        </View>
        <View style={styles.detailsContent}>
          <Text style={styles.detailsTitle}>Gender</Text>
          <Text style={styles.detailsText}>Female</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.buttonContent} title='Sign out' onPress={authFunctions.signOut} />
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
    fontSize:22,
    color: COLORS.mainColor,
    fontWeight:'600',
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
  title: {
    marginHorizontal: 10, 
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold"
  }
});
