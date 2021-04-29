import * as React from "react";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateJourneyScreen from "./CreateJourneyScreen";
import ViewTrip from "./ViewTrip";
import Rating from "./Rating";
import { ListItem,Avatar,Badge,Icon,withBadge ,Button, Overlay } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet,View , Text} from "react-native";
import COLORS from "../../common/colors";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({navigation}) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
      setVisible(!visible);
  };
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => (
            <Icon
              size = {40}
              type = "ionicon"
              name = "ios-add"
              color={COLORS.mainColor}
              onPress={() => navigation.navigate('CreateJourney')}
              containerStyle={{ marginRight: 20 }}
            />
          ),
        }}/>
        <HomeStack.Screen name="CreateJourney" component={CreateJourneyScreen} />
        <HomeStack.Screen name="ViewTrip" component={ViewTrip} options={{
          headerRight: () => (
            <View> 
              <Icon
              size = {30}
              type = "ionicon"
              name = "notifications-outline"
              color="#2196F3"
              onPress={toggleOverlay}
              containerStyle={{ marginRight: 20 }}
            />
            <Badge 
            value="1"
            status="error" 
            containerStyle={{ position: 'absolute', top: -1, right: 14 }}/>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.container} >
            <View style={styles.container}>
        
          <Text style={{ marginBottom: 10 }}>
            Joe wants to join your trip.
          </Text>
          <Button
          icon={
            <Icon
              size = {30}
              type = "ionicon"
              name = "checkmark-circle"
              color="limegreen"
            />
          }
            type="outline"
            title="Accpet"
            onPress={() => navigation.navigate("ViewTrip")}
          />
         <Button
            icon={
              <Icon
                size = {30}
                type = "ionicon"
                name = "close-circle"
                color="tomato"
              />
            }
              type="outline"
              title="Refuse"
              onPress={() => navigation.navigate("ViewTrip")}
            />
          </View>
            </Overlay>
          </View>
          ),
        }}/>
      <HomeStack.Screen name="Rating" component={Rating} />
      </HomeStack.Navigator>
    );
    
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});