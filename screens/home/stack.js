import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateJourneyScreen from "./CreateJourneyScreen";
import { Icon } from 'react-native-elements'
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeStack = createStackNavigator();

export default function HomeStackScreen({navigation}) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
          headerRight: () => (
            <Icon
              size = {40}
              type = "ionicon"
              name = "ios-add"
              color="#2196F3"
              onPress={() => navigation.navigate('CreateJourney')}
              containerStyle={{ marginRight: 20 }}
            />
          ),
        }}/>
        <HomeStack.Screen name="CreateJourney" component={CreateJourneyScreen} />
      </HomeStack.Navigator>
    );
}