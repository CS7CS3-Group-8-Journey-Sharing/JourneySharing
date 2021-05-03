import * as React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import CreateJourneyScreen from "./CreateJourneyScreen";
import ViewTrip from "./ViewTrip";
import Rating from "./Rating";
import NotificationsScreen from "./NotificationsScreen";
import { ListItem,Avatar,Badge,Icon,withBadge ,Button, Overlay } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet,View , Text} from "react-native";
import { getRequests, getYourRequests, deleteRequest } from "../../utils/APIcalls";
import COLORS from "../../common/colors";
import OtherUserProfileScreen from "../home/OtherUserProfileScreen";
import { updateToSeen } from "../../utils/APIcalls";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({navigation}) {
  const { userToken, user, authFunctions } = React.useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);


  const createNotification = (title, body) => {
    const schedulingOptions = {
      content: {
        title: title,
        body: body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        color: COLORS.mainColor
      },
      trigger: null
    };
    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleNotificationAsync(
      schedulingOptions,
    );
  };

  const askNotification = async () => {
    // We need to ask for Notification permissions for ios devices
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && status === 'granted')
      console.log('Notification permissions granted.');
  };

  const handleNotification = () => {
    navigation.navigate("Notifications");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRequests(user.email, userToken).then(res => {
        setNotifications(res);
        authFunctions.addNotifications(res);

        res.forEach(item => {
          if(item.viewStatus == "unseen"){
            createNotification("Journey Sharing", "A user requested to join you");
          }
        })
      }).catch((error) => {
        console.log(error)
      })
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    askNotification();
    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    const listener = Notifications.addNotificationReceivedListener(handleNotification);
    return () => listener.remove();
  }, []);


  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        headerRight: () => (
          badgeNotifications(notifications.length)
        ),
        headerLeft: () => (
          <Icon
            size = {40}
            type = "ionicon"
            name = "ios-add"
            color={COLORS.mainColor}
            onPress={() => navigation.navigate('CreateJourney')}
            containerStyle={{ marginLeft: 20 }}
          />
        ),
      }}/>
      <HomeStack.Screen name="CreateJourney" component={CreateJourneyScreen} options={{ title: 'Create a Journey' }} />
      <HomeStack.Screen name="ViewTrip" component={ViewTrip} options={{
        headerRight: () => (
          badgeNotifications(notifications.length)
        ),
      }}/>
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="Rating" component={Rating} />
      <HomeStack.Screen name="OtherUserProfileScreen" component={OtherUserProfileScreen} options={{ title: 'Profile' }} />
    </HomeStack.Navigator>
  );
    

  function badgeNotifications(number) {
    return (
      <View> 
        <Icon
        size = {30}
        type = "ionicon"
        name = "notifications-outline"
        color= {COLORS.mainColor}
        onPress={() => navigation.navigate("Notifications")}
        containerStyle={{ marginRight: 20 }}
        />
        {(number > 0) &&
          <Badge 
            value={number}
            status="success" 
            containerStyle={{ position: 'absolute', top: -1, right: 14 }}
          />
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});